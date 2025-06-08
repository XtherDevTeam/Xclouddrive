import mimetypes
import flask_cors
import flask
import hashlib
import io
import json
import os
import smb.base
import tools
import typing
import uuid
import time
import pathlib
import dataProvider
import sambaService
import logger

app: flask.Flask = flask.Flask(__name__, static_folder='./static')
cors = flask_cors.CORS(app)
sambaConnectionManager: typing.Optional[sambaService.SambaConnectionManager] = sambaService.SambaConnectionManager(
)
server_statstics = {
    'avg_response_time': 0,
    'last_response_time': 0,
    'requests_per_sec': 0,
    'last_refresh_time': 0,
    'last_commit_time': 0,
}
prior_mime_types = {
    "bmp": "image/bmp",
    "doc": "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "htm": "text/htm",
    "html": "text/html",
    "jpg": "image/jpg",
    "jpeg": "image/jpeg",
    "pdf": "application/pdf",
    "png": "image/png",
    "ppt": "application/vnd.ms-powerpoint",
    "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "xls": "application/vnd.ms-excel",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "hpp": "text/x-c++header",
    "py": "text/x-python",
}


def makeResult(status: str, data: typing.Any) -> dict[str, typing.Any]:
    return {'status': status, 'data': data}


def parseRequestRange(s, flen):
    s = s[s.find('=')+1:]
    c = s.split('-')
    if len(c) != 2:
        return None
    else:
        if c[0] == '' and c[1] == '':
            return [0, flen - 1]
        elif c[1] == '':
            return [int(c[0]), flen - 1]
        elif c[0] == '':
            return [flen - int(c[1]) - 1, flen - 1]
        else:
            return [int(i) for i in c]


def makeFileResponse(file: sambaService.SambaFile, filename: str, mime: typing.Optional[str]):
    if not mime:
        mime = 'application/octet-stream'
        
    isPreview = not mime.startswith('application')
    if flask.request.headers.get('Range') != None:
        fileLength = file.attrs.file_size
        reqRange = parseRequestRange(
            flask.request.headers.get('Range'), fileLength)

        # response_file = file[reqRange[0]:reqRange[1]
        #                      if reqRange[0] != reqRange[1] else reqRange[1] + 1]
        file.seek(reqRange[0])
        response_file = file.read(reqRange[1] - reqRange[0] + 1)

        response = flask.make_response(response_file)
        response.headers['Accept-Ranges'] = 'bytes'
        response.headers['Content-Range'] = 'bytes ' + \
            str(reqRange[0]) + '-' + \
            str(reqRange[1]) + '/' + str(fileLength)
        response.headers['Content-Type'] = mime
        if response.headers['Content-Type'].startswith('application'):
            response.headers['Content-Disposition'] = "attachment;"

        response.status_code = 206
        return response

    return flask.send_file(file, as_attachment=not isPreview, mimetype=mime, download_name=filename)



@app.before_request
def before_request():
    flask.request.start_time = time.time()
    # count request
    if time.time() - server_statstics['last_refresh_time'] > 1:
        server_statstics['avg_response_time'] = 0
        server_statstics['last_response_time'] = 0
        server_statstics['requests_per_sec'] = 0
        server_statstics['last_refresh_time'] = time.time()

    server_statstics['requests_per_sec'] += 1

    # check whether is initialized
    # if not, prevent access except for initialization, status
    if not dataProvider.DataProvider.checkIfInitialized():
        if flask.request.path not in ['/v1/initialize', '/v1/status']:
            return makeResult(False, 'Database not initialized')

    # if not authorized, prevent access except for authorization, initialization, and status
    if not flask.session.get('authorized', False):
        if flask.request.path not in ['/v1/auth/authorize', '/v1/initialize', '/v1/status']:
            return makeResult(False, 'Unauthorized access')


@app.after_request
def after_request(response):
    # calculate response time
    response_time = time.time() - flask.request.start_time
    server_statstics['avg_response_time'] = (
        server_statstics['avg_response_time'] * (server_statstics['requests_per_sec'] - 1) + response_time) / server_statstics['requests_per_sec']
    server_statstics['last_response_time'] = response_time

    # commit changes to database
    # if server statstics indicates the server load is high, delay commit to prevent decrease in performance
    if server_statstics['avg_response_time'] > 1 or server_statstics['requests_per_sec'] > 1000 or time.time() - server_statstics['last_commit_time'] < 1:
        # high load
        pass
    else:
        dataProvider.DataProvider.db.db.commit()
        server_statstics['last_commit_time'] = time.time()
    return response


@app.route('/v1/status', methods=['GET'])
def status():
    title = dataProvider.DataProvider.getConfig('title')
    description = dataProvider.DataProvider.getConfig('description')
    title = title if title else 'Xclouddrive'
    description = description if description else 'All-in-one web file storage management system for multiple samba servers.'

    return makeResult(True, {
        'is_initialized': dataProvider.DataProvider.checkIfInitialized(),
        'api_ver': 'v1',
        'api_name': 'frolickering_flames',
        'is_authorized': flask.session.get('authorized', False),
        'title': title,
        'description': description,
        'server_statstics': server_statstics,
    })


@app.route('/v1/initialize', methods=['POST'])
def initialize():
    title = flask.request.json.get('title', 'Xclouddrive')
    description = flask.request.json.get(
        'description', 'A simple multiple samba service management tool.')
    secret = flask.request.json.get('secret')
    if not secret:
        return makeResult(False, 'Secret is required')
    dataProvider.DataProvider.initialize(title, description, secret)


@app.route('/v1/auth/authorize', methods=['POST'])
def authorize():
    secret = flask.request.json.get('secret', '')

    if dataProvider.DataProvider.getConfig('secret') == secret:
        flask.session['authorized'] = True
        return makeResult(True, 'Successfully authorized')
    else:
        return makeResult(False, 'Invalid secret')


@app.route('/v1/auth/deauthorize', methods=['POST'])
def deauthorize():
    flask.session['authorized'] = False
    return makeResult(True, 'Successfully deauthorized')


@app.route('/v1/samba/routes/connect/<int:id>', methods=['POST'])
def sambaConnect(id: int):
    samba_service = dataProvider.DataProvider.getSambaService(id)
    if not samba_service:
        return makeResult(False, 'Samba service not found')

    if not sambaConnectionManager.connected(samba_service['service_name'], samba_service['share_name']):
        sambaConnectionManager.connect(
            samba_service['service_name'],
            samba_service['share_name'],
            samba_service['user_id'],
            samba_service['password'],
            samba_service['use_ntlm_v2'],
            samba_service['is_direct_tcp'],
        )

    return makeResult(True, 'Samba service connected')


@app.route('/v1/samba/routes/connect_all', methods=['POST'])
def sambaConnectAll():
    for samba_service in dataProvider.DataProvider.getSambaServices():
        if not sambaConnectionManager.connected(samba_service['service_name'], samba_service['share_name']):
            sambaConnectionManager.connect(
                samba_service['service_name'],
                samba_service['share_name'],
                samba_service['user_id'],
                samba_service['password'],
                samba_service['use_ntlm_v2'],
                samba_service['is_direct_tcp'],
            )

    return makeResult(True, 'All samba services connected')


@app.route('/v1/samba/routes', methods=['POST'])
def sambaRoutes():
    routes = dataProvider.DataProvider.getSambaServices()
    for i in routes:
        i['connected'] = sambaConnectionManager.connected(
            i['service_name'], i['share_name'])
    return makeResult(True, routes)


@app.route('/v1/samba/routes/create', methods=['POST'])
def sambaCreate():
    service_name = flask.request.json.get('service_name', '')
    share_name = flask.request.json.get('share_name', '')
    user_id = flask.request.json.get('user_id', '')
    password = flask.request.json.get('password', '')
    use_ntlm_v2 = flask.request.json.get('use_ntlm_v2', False)
    is_direct_tcp = flask.request.json.get('is_direct_tcp', False)
    name = flask.request.json.get(
        'name', f'\\\\{service_name}\\{share_name}' if service_name and share_name else '')
    description = flask.request.json.get('description', '')
    if not service_name or not share_name or not user_id or not password:
        return makeResult(False, 'All fields are required')

    dataProvider.DataProvider.createSambaService(
        name, description, service_name, share_name, user_id, password, use_ntlm_v2, is_direct_tcp)
    return makeResult(True, 'Samba service created')


@app.route('/v1/samba/routes/<int:id>', methods=['POST'])
def sambaRoute(id: int):
    return makeResult(True, dataProvider.DataProvider.getSambaService(id))


@app.route('/v1/samba/files/dir', methods=['POST'])
def sambaDir():

    dir_path = flask.request.json.get('path', '')
    searchParam = flask.request.json.get('search', '*')
    logger.Logger.log(f"dir_path: {dir_path}, searchParam: {searchParam}")
    samba_service_id = flask.request.json.get('samba_service_id', 0)
    samba_service = dataProvider.DataProvider.getSambaService(samba_service_id)
    if not samba_service:
        return makeResult(False, 'Samba service not found')

    if not sambaConnectionManager.connected(samba_service['service_name'], samba_service['share_name']):
        sambaConnectionManager.connect(
            samba_service['service_name'],
            samba_service['share_name'],
            samba_service['user_id'],
            samba_service['password'],
            samba_service['use_ntlm_v2'],
            samba_service['is_direct_tcp'],
        )

    try:
        return makeResult(True, {
            'dir': str(pathlib.Path(dir_path).resolve()),
            'content': sambaConnectionManager.lsdir(
                samba_service['service_name'],
                samba_service['share_name'],
                pathlib.Path(dir_path),
                searchParam=searchParam
            )
        })
    except Exception as e:
        return makeResult(False, str(e))


@app.route('/v1/samba/files/delete', methods=['POST'])
def sambaDelete():

    file_path = flask.request.json.get('path', '')
    samba_service_id = flask.request.json.get('samba_service_id', 0)
    samba_service = dataProvider.DataProvider.getSambaService(samba_service_id)
    if not samba_service:
        return makeResult(False, 'Samba service not found')

    if not sambaConnectionManager.connected(samba_service['service_name'], samba_service['share_name']):
        sambaConnectionManager.connect(
            samba_service['service_name'],
            samba_service['share_name'],
            samba_service['user_id'],
            samba_service['password'],
            samba_service['use_ntlm_v2'],
            samba_service['is_direct_tcp'],
        )

    try:
        sambaConnectionManager.delete(
            samba_service['service_name'],
            samba_service['share_name'],
            pathlib.Path(file_path),
        )
        return makeResult(True, 'File deleted')
    except Exception as e:
        return makeResult(False, str(e))


@app.route('/v1/samba/files/rename', methods=['POST'])
def sambaRename():

    old_path = flask.request.json.get('old_path', '')
    new_path = flask.request.json.get('new_path', '')
    samba_service_id = flask.request.json.get('samba_service_id', 0)
    samba_service = dataProvider.DataProvider.getSambaService(samba_service_id)
    if not samba_service:
        return makeResult(False, 'Samba service not found')

    if not sambaConnectionManager.connected(samba_service['service_name'], samba_service['share_name']):
        sambaConnectionManager.connect(
            samba_service['service_name'],
            samba_service['share_name'],
            samba_service['user_id'],
            samba_service['password'],
            samba_service['use_ntlm_v2'],
            samba_service['is_direct_tcp'],
        )

    try:
        sambaConnectionManager.rename(
            samba_service['service_name'],
            samba_service['share_name'],
            pathlib.Path(old_path),
            pathlib.Path(new_path),
        )
        return makeResult(True, 'File renamed')
    except Exception as e:
        return makeResult(False, str(e))


@app.route('/v1/samba/files/attrs', methods=['POST'])
def sambaAttrs():

    file_path = flask.request.json.get('path', '')
    samba_service_id = flask.request.json.get('samba_service_id', 0)
    samba_service = dataProvider.DataProvider.getSambaService(samba_service_id)
    if not samba_service:
        return makeResult(False, 'Samba service not found')

    if not sambaConnectionManager.connected(samba_service['service_name'], samba_service['share_name']):
        sambaConnectionManager.connect(
            samba_service['service_name'],
            samba_service['share_name'],
            samba_service['user_id'],
            samba_service['password'],
            samba_service['use_ntlm_v2'],
            samba_service['is_direct_tcp'],
        )

    try:
        return sambaConnectionManager.attrs(
            samba_service['service_name'],
            samba_service['share_name'],
            pathlib.Path(file_path),
        )
    except Exception as e:
        return makeResult(False, str(e))


@app.route('/v1/samba/files/mkdir', methods=['POST'])
def sambaMkdir():

    dir_path = flask.request.json.get('path', '')
    samba_service_id = flask.request.json.get('samba_service_id', 0)
    samba_service = dataProvider.DataProvider.getSambaService(samba_service_id)
    if not samba_service:
        return makeResult(False, 'Samba service not found')

    if not sambaConnectionManager.connected(samba_service['service_name'], samba_service['share_name']):
        sambaConnectionManager.connect(
            samba_service['service_name'],
            samba_service['share_name'],
            samba_service['user_id'],
            samba_service['password'],
            samba_service['use_ntlm_v2'],
            samba_service['is_direct_tcp'],
        )

    try:
        sambaConnectionManager.mkdir(
            samba_service['service_name'],
            samba_service['share_name'],
            pathlib.Path(dir_path),
        )
        return makeResult(True, 'Directory created')
    except Exception as e:
        return makeResult(False, str(e))


@app.route('/v1/samba/files/touch', methods=['POST'])
def sambaTouch():
    file_path = flask.request.json.get('path', '')
    if not file_path:
        return makeResult(False, 'Path is required')
    samba_service_id = flask.request.json.get('samba_service_id', 0)
    samba_service = dataProvider.DataProvider.getSambaService(samba_service_id)
    if not samba_service:
        return makeResult(False, 'Samba service not found')
    
    if not sambaConnectionManager.connected(samba_service['service_name'], samba_service['share_name']):
        sambaConnectionManager.connect(
            samba_service['service_name'],
            samba_service['share_name'],            
            samba_service['user_id'],
            samba_service['password'],
            samba_service['use_ntlm_v2'],
            samba_service['is_direct_tcp'],
        )

    try:
        with sambaConnectionManager.open(samba_service['service_name'], samba_service['share_name'], pathlib.Path(file_path), 'wb') as remote_file:
            pass
        return makeResult(True, 'File created')
    except Exception as e:
        return makeResult(False, str(e))


@app.route('/v1/samba/files/update', methods=['POST'])
def sambaFileUpdate():
    file_path = flask.request.json.get('path')
    if not file_path:
        return makeResult(False, 'Path is required')
    content = flask.request.json.get('content')
    if not content:
        return makeResult(False, 'Content is required')
    samba_service_id = flask.request.json.get('samba_service_id')
    samba_service = dataProvider.DataProvider.getSambaService(samba_service_id)
    try:
        target_dir = pathlib.Path(file_path)
    except Exception as e:
        return makeResult(False, 'Invalid path')
    
    if not samba_service:
        return makeResult(False, 'Samba service not found')

    if not sambaConnectionManager.connected(samba_service['service_name'], samba_service['share_name']):
        sambaConnectionManager.connect(
            samba_service['service_name'],
            samba_service['share_name'],
            samba_service['user_id'],
            samba_service['password'],
            samba_service['use_ntlm_v2'],
            samba_service['is_direct_tcp'],
        )

    try:
        with sambaConnectionManager.open(samba_service['service_name'], samba_service['share_name'], target_dir, 'wb') as remote_file:
            remote_file.write(content.encode('utf-8'))
        return makeResult(True, 'File updated')
    except Exception as e:
        return makeResult(False, str(e))
        
    


@app.route('/v1/samba/files/upload', methods=['POST'])
def sambaUpload():
    samba_service_id = flask.request.args.get('samba_service_id', 0)
    samba_service = dataProvider.DataProvider.getSambaService(samba_service_id)
    if not samba_service:
        return makeResult(False, 'Samba service not found')

    path = flask.request.args.get('path')
    if not path:
        return makeResult(False, 'Path is required')
    try:
        target_dir = pathlib.Path(path)
    except Exception as e:
        return makeResult(False, 'Invalid path')

    for i in flask.request.files:
        file = flask.request.files[i]
        logger.Logger.log(f'Uploading file {file.filename} to {target_dir}')
        remote_path = target_dir / file.filename
        with sambaConnectionManager.open(samba_service['service_name'], samba_service['share_name'], remote_path, 'wb') as remote_file:
            while True:
                data = file.read(1048576)
                if not data:
                    break
                remote_file.write(data)
            logger.Logger.log(f'File {file.filename} uploaded to {target_dir}')

    return makeResult(True, 'File uploaded')


@app.route('/v1/config/set', methods=['POST'])
def configSet():
    key = flask.request.json.get('key')
    value = flask.request.json.get('value')
    if not key or not value:
        return makeResult(False, 'Key and value are required')
    dataProvider.DataProvider.setConfig(key, value)
    return makeResult(True, f'Config {key} set to {value}')


@app.route('/v1/config/get', methods=['POST'])
def configGet():
    key = flask.request.json.get('key')
    if not key:
        return makeResult(False, 'Key is required')
    value = dataProvider.DataProvider.getConfig(key)
    return makeResult(True, value)


@app.route('/v1/samba/routes/update/<int:id>', methods=['POST'])
def sambaUpdate(id: int):
    service_name = flask.request.json.get('service_name', '')
    share_name = flask.request.json.get('share_name', '')
    user_id = flask.request.json.get('user_id', '')
    password = flask.request.json.get('password', '')
    use_ntlm_v2 = flask.request.json.get('use_ntlm_v2', False)
    is_direct_tcp = flask.request.json.get('is_direct_tcp', False)
    name = flask.request.json.get(
        'name', f'\\\\{service_name}\\{share_name}' if service_name and share_name else '')
    description = flask.request.json.get('description', '')
    if not service_name or not share_name or not user_id or not password:
        return makeResult(False, 'All fields are required')

    dataProvider.DataProvider.updateSambaService(
        id, name, description, service_name, share_name, user_id, password, use_ntlm_v2, is_direct_tcp)
    # reload samba connection
    if sambaConnectionManager.connected(service_name, share_name):
        sambaConnectionManager.disconnect(service_name, share_name)
        sambaConnectionManager.connect(
            service_name,
            share_name,
            user_id,
            password,
            use_ntlm_v2,
            is_direct_tcp,
        )
    return makeResult(True, 'Samba service updated')


@app.route('/v1/samba/routes/delete/<int:id>', methods=['POST'])
def sambaDeleteRoute(id: int):
    dataProvider.DataProvider.deleteSambaService(id)
    # disconnect samba connection
    samba_service = dataProvider.DataProvider.getSambaService(id)
    if samba_service and sambaConnectionManager.connected(samba_service['service_name'], samba_service['share_name']):
        sambaConnectionManager.disconnect(
            samba_service['service_name'], samba_service['share_name'])

    return makeResult(True, 'Samba service deleted')


@app.route('/v1/samba/routes/disconnect/<int:id>', methods=['POST'])
def sambaDisconnect(id: int):
    samba_service = dataProvider.DataProvider.getSambaService(id)
    if not samba_service:
        return makeResult(False, 'Samba service not found')

    if sambaConnectionManager.connected(samba_service['service_name'], samba_service['share_name']):
        sambaConnectionManager.disconnect(
            samba_service['service_name'], samba_service['share_name'])

    return makeResult(True, 'Samba service disconnected')


@app.route('/v1/samba/files/get', methods=['GET'])
def sambaGet():
    file_path = flask.request.args.get('path')
    if not file_path:
        return makeResult(False, 'Path is required')
    samba_service_id = flask.request.args.get('samba_service_id')
    samba_service = dataProvider.DataProvider.getSambaService(samba_service_id)
    if not samba_service:
        return makeResult(False, 'Samba service not found')

    if not sambaConnectionManager.connected(samba_service['service_name'], samba_service['share_name']):
        sambaConnectionManager.connect(
            samba_service['service_name'],
            samba_service['share_name'],
            samba_service['user_id'],
            samba_service['password'],
            samba_service['use_ntlm_v2'],
            samba_service['is_direct_tcp'],
        )

    try:
        remote_file = sambaConnectionManager.open(samba_service['service_name'], samba_service['share_name'], pathlib.Path(file_path), 'rb')
        # ext
        file_name, file_ext = os.path.splitext(file_path)
        file_ext = file_ext[1:] if file_ext else ''
        prior_mime = prior_mime_types.get(file_ext, '')
        return makeFileResponse(remote_file, file_name, mimetypes.guess_type(file_path)[0] if not prior_mime else prior_mime)
    except Exception as e:
        return makeResult(False, str(e))
    


def run():
    app.run(debug=False, host='0.0.0.0', port=3621)


secret = dataProvider.DataProvider.getConfig('secret')
if not secret:
    secret = str(uuid.uuid4())
else:
    app.secret_key = hashlib.sha256(secret.encode('utf-8')).hexdigest()

if __name__ == '__main__':
    run()
