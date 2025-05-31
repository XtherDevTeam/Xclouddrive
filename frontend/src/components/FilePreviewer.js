import Api from "../Api";
import React from "react";
import * as Mui from '../Components';
import dayjs from 'dayjs';
import { filesize } from 'filesize';
import {
  PhotoProvider,
  PhotoView,
} from 'react-photo-view';
import mime from 'mime-types';
import MonacoEditor from 'react-monaco-editor';


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
    <PhotoProvider overlayRender={{
      onClose: (evt) => {
        setOpen(false);
      }
    }}>
      <PhotoView src={file_url}>
        <button sx={{ display: 'none' }} ref={dummyRef}></button>
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

export default function FilePreviewer({ file_path, file_attrs, samba_service_id, open, setOpen }) {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [fileMime, setFileMime] = React.useState(null);

  React.useEffect(() => {
    if (file_path) {
      setFileUrl(Api.sambaGetFileUrl(samba_service_id, file_path))
      let mime_query = mime.lookup(file_path)
      mime_query = mime_query ? mime_query : 'application/octet-stream'
      setFileMime(mime_query)
      console.log(mime_query)
    }
  }, [file_path, file_attrs]);

  return <>
    {fileMime?.startsWith('image') && <ImageFilePreviewer file_path={file_path} file_attrs={file_attrs} file_url={fileUrl} open={open} setOpen={setOpen} />}
    {fileMime?.startsWith('audio') && <MediaFilePreviewer file_path={file_path} file_attrs={file_attrs} file_url={fileUrl} open={open} setOpen={setOpen} />}
    {(fileMime?.startsWith('video') || fileMime?.startsWith('application/mp4')) && <MediaFilePreviewer file_path={file_path} file_attrs={file_attrs} file_url={fileUrl} open={open} setOpen={setOpen} />}
    {(fileMime?.startsWith('text') && file_attrs?.size < 1000000) && <TextFilePreviewer samba_service_id={samba_service_id} file_path={file_path} file_attrs={file_attrs} file_url={fileUrl} open={open} setOpen={setOpen} />}
  </>
}