import React from 'react';
import About from './About';
import * as Mui from '../Components'
import Api from '../Api';
import Message from '../components/Message';
import ContentEditDialog from '../components/ContentEditDialog';
import DirectoryView from '../components/DirectoryView';
import More from './More';
import fs from '../fs';
import { filesize } from 'filesize';

function Breadcrumb({ path, rootPlaceholder, onClick }) {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    let fragments = path.split('/')
    if (fragments[0] === '') {
      fragments[0] = rootPlaceholder;
    }
    setItems(fragments);
  }, [path, rootPlaceholder]);

  const handleClick = (item, index) => {
    // fish out the selected path
    let selectedPath = items.slice(1, index + 1).join('/');
    if (selectedPath.length && selectedPath[0] !== '/') {
      selectedPath = '/' + selectedPath;
    }
    onClick(selectedPath);
  }

  return <Mui.Breadcrumbs aria-label="breadcrumb">
    {items.map((item, index) => (
      <Mui.Chip key={index} label={item} onClick={() => handleClick(item, index)} />
    ))}
  </Mui.Breadcrumbs>
}

function NewFolderDialog({ open, onClose, onErr, sambaServiceId, path, onOk }) {
  const [name, setName] = React.useState('');
  React.useEffect(() => {
    setName('');
  }, [open]);
  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  const handleCreate = () => {
    if (!name) {
      onErr('Please enter a name for the new folder');
      return;
    }
    Api.sambaMakeDirectory(sambaServiceId, path + '/' + name).then(() => {
      onClose();
      onOk();
    }).catch(e => {
      console.log('error', e);
      onErr(e);
    });
  }
  return <Mui.Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <Mui.DialogTitle>Create new folder</Mui.DialogTitle>
    <Mui.DialogContent>
      <Mui.TextField label="Folder name" value={name} onChange={handleNameChange} fullWidth sx={{ width: '100%', marginTop: 10 }} />
    </Mui.DialogContent>
    <Mui.DialogActions>
      <Mui.Button onClick={onClose}>Cancel</Mui.Button>
      <Mui.Button onClick={handleCreate}>Create</Mui.Button>
    </Mui.DialogActions>
  </Mui.Dialog>
}

function UploadFileDialog({ open, onClose, onErr, sambaServiceId, path, onOk }) {
  const [files, setFiles] = React.useState([]);
  const [progress, setProgress] = React.useState([]);
  const progressRef = React.useRef([]);
  const [uploading, setUploading] = React.useState(false);
  const handleFileChange = (event) => {
    setFiles(event.target.files);
  }
  const handleProgressUpdate = (index, progress) => {
    progressRef.current[index] = progress;
    setProgress(progressRef.current);
  }

  return <Mui.Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <Mui.DialogTitle>Upload file</Mui.DialogTitle>
    <Mui.DialogContent>
      <Mui.Button variant="contained" fullWidth onClick={() => {
        fs.launchFilePickerAsync('*', true).then(files_new => {
          setFiles([...files, ...files_new])
          setProgress(new Array(files_new.length).fill(0))
        }).catch(e => {
          console.log('error', e);
          onErr(e);
        });
      }}>
        {/* <Mui.Icons.CloudUpload />
        Click to add file */}
        <Mui.IconText icon={<Mui.Icons.CloudUpload />}>
          Click to add file
        </Mui.IconText>
      </Mui.Button>
      <Mui.List sx={{ height: '50vh' }}>
        {files.map((file, index) => (
          <Mui.ListItem key={index} >
            <Mui.ListItemText primary={file.name} secondary={filesize(file.size)} />
            <Mui.ListItemSecondaryAction onClick={() => {
              setFiles(files.filter(f => f !== file))
            }}>
              <Mui.IconButton edge="end" aria-label="delete">
                <Mui.Icons.Delete />
              </Mui.IconButton>
            </Mui.ListItemSecondaryAction>
          </Mui.ListItem>)
        )}
      </Mui.List>
      <Mui.Backdrop open={uploading}>
        <Mui.Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
          <Mui.CircularProgress />
          Uploading...
          {progress.slice(0, progress.length > 10 ? 10 : progress.length).map((p, index) => (<Mui.Box sx={{width: '50%', }}>
            <Mui.Typography key={index} variant="body2" sx={{ marginTop: 10 }}>File {index + 1} - {p}%</Mui.Typography>
            <Mui.LinearProgress key={index} variant="determinate" value={p} sx={{ width: '100%' }} />
          </Mui.Box>
          ))}
        </Mui.Box>
      </Mui.Backdrop>
    </Mui.DialogContent>
    <Mui.DialogActions>
      <Mui.Button onClick={onClose}>Cancel</Mui.Button>
      <Mui.Button onClick={() => {
        setUploading(true);
        const promises = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          promises.push(Api.sambaUploadFile(sambaServiceId, path ? path : '/', file, (progressEvent) => {
            let current = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            handleProgressUpdate(i, current);
          }).then((resp) => {
            if (!resp.status) {
              console.log('error', resp.data);
              onErr(resp.data);
              throw new Error(resp.data);
            }
            console.log('success', resp.data);
            handleProgressUpdate(i, 100);
          }));
        }
        Promise.all(promises).then(() => {
          setProgress([]);
          setFiles([]);
          setUploading(false);
          onClose();
          onOk();
        }).catch(e => {
          console.log('error', e);
          onErr(e);
        });
      }} disabled={uploading}>
        Upload
      </Mui.Button>
    </Mui.DialogActions>
  </Mui.Dialog>
}

function CreateFileDialog({ open, onClose, onErr, sambaServiceId, path, onOk }) {
  const [name, setName] = React.useState('');
  return <Mui.Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <Mui.DialogTitle>Create new file</Mui.DialogTitle>
    <Mui.DialogContent>
      <Mui.Typography>
        Create a new file in {path ? path : '/'}
      </Mui.Typography>
      <Mui.TextField label="File name" value={name} onChange={(event) => {
        setName(event.target.value);
      }} fullWidth sx={{ width: '100%', marginTop: 10 }} />
    </Mui.DialogContent>
    <Mui.DialogActions>
      <Mui.Button onClick={onClose}>Cancel</Mui.Button>
      <Mui.Button onClick={() => {
        if (!name) {
          onErr('Please enter a name for the new file');
          return;
        }
        Api.sambaTouchFile(sambaServiceId, path + '/' + name).then(data => {
          if (data.status) {
            onClose();
            onOk();
          } else {
            onErr(data.data);
          }
        }).catch(e => {
          console.log('error', e);
          onErr(e);
        });
      }}>Create</Mui.Button>
    </Mui.DialogActions>
  </Mui.Dialog>
}

export default function DriveView({ drive }) {
  const [sambaServiceId, setSambaServiceId] = React.useState(null);
  const [path, setPath] = React.useState('');
  const [refresher, setRefresher] = React.useState(0);

  // message related
  const [messageTitle, setMessageTitle] = React.useState('')
  const [messageContent, setMessageContent] = React.useState('')
  const [messageType, setMessageType] = React.useState('')
  const [messageOpen, setMessageOpen] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  const [archorEl, setAnchorEl] = React.useState(null)
  const [newFolderDialogOpen, setNewFolderDialogOpen] = React.useState(false)
  const [uploadFileDialogOpen, setUploadFileDialogOpen] = React.useState(false)
  const [createFileDialogOpen, setCreateFileDialogOpen] = React.useState(false)

  function refreshDriveView() {
    setRefresher(Date.now());
  }

  React.useEffect(() => {
    console.log('drive', drive);
    if (drive?.id) {
      console.log('drive.id', drive.id);
      setSambaServiceId(drive.id);
    }
  }, [drive]);

  return <Mui.Box sx={{ height: '100%', width: 'calc(100% - 60px)', marginLeft: 30, paddingRight: 30, overflowY: 'auto' }}>
    <Mui.Box style={{ marginTop: 20, marginBottom: 20 }}>
      <Mui.Typography variant="body1">
        {drive?.description}
      </Mui.Typography>
    </Mui.Box>
    <Breadcrumb path={path} rootPlaceholder={drive?.name} onClick={setPath} />
    <DirectoryView refresher={refresher} path={path} setPath={setPath} sambaServiceId={sambaServiceId} style={{ width: '100%' }} onErr={(message) => {
      console.log('onErr', message);
      setMessageTitle('Error')
      setMessageContent(`${message}`)
      setMessageType('error')
      setMessageOpen(true)
    }} />
    <Message title={messageTitle} message={messageContent} type={messageType} open={messageOpen} dismiss={() => setMessageOpen(false)} />
    <NewFolderDialog open={newFolderDialogOpen} onClose={() => setNewFolderDialogOpen(false)} onErr={(message) => {
      console.log('onErr', message);
      setMessageTitle('Error')
      setMessageContent(message)
      setMessageType('error')
      setMessageOpen(true)
    }} sambaServiceId={sambaServiceId} path={path} onOk={() => {
      setMessageTitle('Success')
      setMessageContent('New folder created')
      setMessageType('success')
      setMessageOpen(true)
      refreshDriveView();
    }} />
    <UploadFileDialog open={uploadFileDialogOpen} onClose={() => setUploadFileDialogOpen(false)} onErr={(message) => {
      console.log('onErr', message);
      setMessageTitle('Error')
      setMessageContent(message)
      setMessageType('error')
      setMessageOpen(true)
    }} sambaServiceId={sambaServiceId} path={path} onOk={() => {
      setMessageTitle('Success')
      setMessageContent('File uploaded')
      setMessageType('success')
      setMessageOpen(true)
      refreshDriveView();
    }} />
    <CreateFileDialog open={createFileDialogOpen} onClose={() => setCreateFileDialogOpen(false)} onErr={(message) => {
      console.log('onErr', message);
      setMessageTitle('Error')
      setMessageContent(`${message}`)
      setMessageType('error')
      setMessageOpen(true)
    }} sambaServiceId={sambaServiceId} path={path} onOk={() => {
      setMessageTitle('Success')
      setMessageContent('New file created')
      setMessageType('success')
      setMessageOpen(true)
      refreshDriveView();
    }} />
    <Mui.Menu
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }} open={menuOpen} onClose={() => setMenuOpen(false)} id={'more-menu'} anchorEl={archorEl}>
      <Mui.MenuItem onClick={() => {
        setNewFolderDialogOpen(true);
      }}>
        Create folder
      </Mui.MenuItem>
      <Mui.MenuItem onClick={() => {
        setUploadFileDialogOpen(true);
      }}>
        Upload file
      </Mui.MenuItem>
      <Mui.MenuItem onClick={() => {
        refreshDriveView();
      }}>
        Refresh
      </Mui.MenuItem>
      <Mui.MenuItem onClick={() => {
        setCreateFileDialogOpen(true);
      }}>
        Create file
      </Mui.MenuItem>
    </Mui.Menu>
    <Mui.Fab aria-describedby="more-menu" onClick={(e) => {
      setMenuOpen(true);
      setAnchorEl(e.currentTarget);
    }} sx={{
      position: 'fixed',
      bottom: 20,
      right: 20,
    }}>
      <Mui.Icons.MoreVert />
    </Mui.Fab>
  </Mui.Box>
}