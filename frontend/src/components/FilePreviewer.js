import Api from "../Api";
import React from "react";
import * as Mui from '../Components';
import dayjs from 'dayjs';
import { filesize } from 'filesize';
import {
  PhotoProvider,
  PhotoView,
} from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import mime from 'mime-types';
import MonacoEditor from 'react-monaco-editor';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";


function TextFilePreviewer({ file_path, file_attrs, file_url, samba_service_id, open, setOpen }) {
  const [content, setContent] = React.useState('');
  const [fileMime, setFileMime] = React.useState(null);

  React.useEffect(() => {
    if (file_path) {
      let mime_query = mime.lookup(file_path)
      mime_query = mime_query ? mime_query : 'application/octet-stream'
      setFileMime(mime_query)
      Api.sambaFetchFile(samba_service_id, file_path)
        .then(response => {
          console.log(response.data)
          setContent(response.data)
        })
        .catch(error => console.error(error));
    }
  }, [file_path, file_attrs]);

  return (
    <Mui.Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
      <Mui.DialogTitle>Editing {file_attrs?.name}</Mui.DialogTitle>
      <Mui.DialogContent>
        <MonacoEditor
          language={fileMime}
          value={content}
          onChange={setContent}
          height={'50vh'}
          width={'60vw'}
        />
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button onClick={() => setOpen(false)}>Close</Mui.Button>
        <Mui.Button onClick={() => {
          Api.sambaUpdateFile(samba_service_id, file_path, content)
           .then(response => {
              console.log(response)
            })
           .catch(error => console.error(error));
        }}>Save</Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  )
}

function ImageFilePreviewer({ file_path, file_attrs, file_url, open, setOpen }) {
  const [photoIndex, setPhotoIndex] = React.useState(0);
  const [photos, setPhotos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const dummyRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      dummyRef.current.click();
    }
  }, [open])

  return (
    <PhotoProvider onVisibleChange={(visible) => {
      if (!visible) {
        setOpen(false);
      }
    }} >
      <PhotoView src={file_url}>
        <img key={1} src={file_url} style={{ display: 'block', width: '0px', height: '0px' }} ref={dummyRef} alt=""></img>
      </PhotoView>
    </PhotoProvider>
  )
}

function MediaFilePreviewer({ file_path, file_attrs, file_url, open, setOpen }) {
  return (
    <Mui.Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
      <Mui.DialogTitle>Preview {file_attrs?.name}</Mui.DialogTitle>
      <Mui.DialogContent>
        <video controls src={file_url} style={{ maxWidth: '100%' }} />
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button onClick={() => setOpen(false)}>Close</Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  )
}

function DocumentFilePreviewer({ file_path, file_attrs, file_url, open, setOpen }) {
  return (
    <Mui.Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
      <Mui.DialogTitle>Preview {file_attrs?.name}</Mui.DialogTitle>
      <Mui.DialogContent>
        <DocViewer documents={[{ uri: file_url }]} style={{ width: '60vw', height: '50vh' }} pluginRenderers={DocViewerRenderers} />
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button onClick={() => setOpen(false)}>Close</Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
  )
}

export default function FilePreviewer({ file_path, file_attrs, samba_service_id, open, setOpen }) {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [fileMime, setFileMime] = React.useState(null);
  const [fileRendererType, setFileRendererType] = React.useState(null);

  React.useEffect(() => {
    if (file_path) {
      setFileUrl(Api.sambaGetFileUrl(samba_service_id, file_path))
      let mime_query = mime.lookup(file_path)
      mime_query = mime_query ? mime_query : 'application/octet-stream'
      setFileMime(mime_query)
      console.log(mime_query)

      // set file renderer type
      if (mime_query.startsWith('image')) {
        setFileRendererType('image')
      } else if (mime_query.startsWith('audio') || mime_query.startsWith('video') || mime_query.startsWith('application/mp4') || mime_query.startsWith('application/ogg') || mime_query.startsWith('application/x-msvideo') || mime_query.startsWith('application/x-flv')) {
        setFileRendererType('media')
      } else if (mime_query.startsWith('text')) {
        setFileRendererType('text')
      } else if (file_path.endsWith('.pdf') || file_path.endsWith('.doc') || file_path.endsWith('.docx') || file_path.endsWith('.xls') || file_path.endsWith('.xlsx') || file_path.endsWith('.ppt') || file_path.endsWith('.pptx')) {
        setFileRendererType('document')
      } else {
        setFileRendererType('unknown')
      }
    }
  }, [file_path, file_attrs]);

  return <>
    {fileRendererType === 'image' && <ImageFilePreviewer file_path={file_path} file_attrs={file_attrs} file_url={fileUrl} open={open} setOpen={setOpen} />}
    {fileRendererType === 'media' && <MediaFilePreviewer file_path={file_path} file_attrs={file_attrs} file_url={fileUrl} open={open} setOpen={setOpen} />}
    {fileRendererType === 'text' && <TextFilePreviewer samba_service_id={samba_service_id} file_path={file_path} file_attrs={file_attrs} file_url={fileUrl} open={open} setOpen={setOpen} />}
    {fileRendererType === 'document' && <DocumentFilePreviewer file_path={file_path} file_attrs={file_attrs} file_url={fileUrl} open={open} setOpen={setOpen} />}
    {fileRendererType === 'unknown' && <Mui.Snackbar open={open} onClose={() => setOpen(false)} severity="error" autoHideDuration={6000} message={`Unsupported file type: ${fileMime}`} />}
  </>
}