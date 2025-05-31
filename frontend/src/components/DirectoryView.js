import Api from "../Api";
import React from "react";
import * as Mui from '../Components';
import dayjs from 'dayjs';
import { filesize } from 'filesize';
import ContentEditDialog from './ContentEditDialog';
import FilePreviewer from "./FilePreviewer";

class DirectoryUtils {
  constructor(path, sambaServiceId, onErr, onUpdateDir) {
    this.path = this.justifyPath(path);
    this.sambaServiceId = sambaServiceId;
    this.onErr = onErr;
    this.content = [];
    this.onUpdateDir = onUpdateDir;
    this.lsdir()
  }

  lsdir() {
    return Api.sambaListDirectory(this.sambaServiceId, this.path ? this.path : "/").then(data => {
      if (data.status) {
        this.path = data.data.dir === '/' ? '' : data.data.dir;
        this.content = data.data.content;
        this.onUpdateDir(data.data.dir === '/' ? '' : data.data.dir);
        return this.content;
      } else {
        this.onErr(data.data);
      }
    });
  }

  delete(indexInContent) {
    return Api.sambaDeleteFile(this.sambaServiceId, this.path + "/" + this.content[indexInContent].name).then(data => {
      if (data.status) {
        this.content.splice(indexInContent, 1);
        return true;
      } else {
        this.onErr(data.data);
      }
    });
  }

  rename(indexInContent, newName) {
    return Api.sambaRenameFile(this.sambaServiceId, this.path + "/" + this.content[indexInContent].name, this.path + "/" + newName).then(data => {
      if (data.status) {
        this.content[indexInContent].name = newName;
        return true;
      } else {
        this.onErr(data.data);
      }
    });
  }

  mkdir(newName) {
    return Api.sambaMakeDirectory(this.sambaServiceId, this.path + "/" + newName).then(data => {
      if (data.status) {
        this.content.push({
          name: newName,
          type: "dir"
        });
        return true;
      } else {
        this.onErr(data.data);
      }
    });
  }

  justifyPath(path) {
    if (path.endsWith("/")) {
      return path.slice(0, -1);
    } else {
      return path;
    }
  }

  pathify(indexInContent) {
    return this.path + "/" + this.content[indexInContent].name;
  }
}

function FileDetailDialog({ open, onClose, file, onErr, dirUtils, index }) {
  const [size, setSize] = React.useState(null);
  const [lastModified, setLastModified] = React.useState(null);
  const [lastAccessed, setLastAccessed] = React.useState(null);
  const [created, setCreated] = React.useState(null);
  const [allocatedSize, setAllocatedSize] = React.useState(null);
  const [type, setType] = React.useState(null);

  const [contentEditDialogOpen, setContentEditDialogOpen] = React.useState(false);
  const [contentEditDialogState, setContentEditDialogState] = React.useState({

  });

  const [filePreviewFileAttr, setFilePreviewFileAttr] = React.useState(null);
  const [filePreviewFilePath, setFilePreviewFilePath] = React.useState(null);
  const [filePreviewOpen, setFilePreviewOpen] = React.useState(false);

  React.useEffect(() => {
    if (file) {
      setSize(filesize(file.size));
      setLastModified(dayjs.unix(file.changed).format('YYYY-MM-DD HH:mm:ss'));
      setLastAccessed(dayjs.unix(file.accessed).format('YYYY-MM-DD HH:mm:ss'));
      setCreated(dayjs.unix(file.created).format('YYYY-MM-DD HH:mm:ss'));
      setAllocatedSize(filesize(file.allocated_size));
      setType(file?.is_dir ? "Directory" : "File");
    }
  }, [file]);

  return <Mui.Dialog open={open} onClose={onClose}>
    <FilePreviewer file_path={filePreviewFilePath} file_attrs={filePreviewFileAttr} open={filePreviewOpen} setOpen={setFilePreviewOpen} samba_service_id={dirUtils?.sambaServiceId} />
    <Mui.DialogTitle>
      {file?.name}
    </Mui.DialogTitle>
    <Mui.DialogContent>
      <Mui.Grid container>
        <Mui.Grid item xs={12} sm={6}>
          <Mui.Typography variant="body2">
            <Mui.Typography sx={{ fontWeight: "bold" }}>
              Type:
            </Mui.Typography>
            {type}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sm={6}>
          <Mui.Typography variant="body2">
            <Mui.Typography sx={{ fontWeight: "bold" }}>
              Size:
            </Mui.Typography>
            {size}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sm={6}>
          <Mui.Typography variant="body2">
            <Mui.Typography sx={{ fontWeight: "bold" }}>
              Allocated Size:
            </Mui.Typography>
            {allocatedSize}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sm={6}>
          <Mui.Typography variant="body2">
            <Mui.Typography sx={{ fontWeight: "bold" }}>
              Last Modified:
            </Mui.Typography>
            {lastModified}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sm={6}>
          <Mui.Typography variant="body2">
            <Mui.Typography sx={{ fontWeight: "bold" }}>
              Last Accessed:
            </Mui.Typography>
            {lastAccessed}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sm={6}>
          <Mui.Typography variant="body2">
            <Mui.Typography sx={{ fontWeight: "bold" }}>
              Created:
            </Mui.Typography>
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.List>
            <Mui.ListItemButton onClick={() => {
              onClose();
              dirUtils.delete(index);
            }}>
              <Mui.ListItemIcon>
                <Mui.Icons.Delete />
              </Mui.ListItemIcon>
              <Mui.ListItemText primary="Delete" />
            </Mui.ListItemButton>
            <ContentEditDialog
              defaultValue={file?.name}
              onOk={newName => {
                dirUtils.rename(index, newName).then(res => {
                  if (res.status) {
                    onClose();
                  } else {
                    onErr(res.data);
                  }
                });
              }}
              title="Rename"
              description={`Give a new name for ${file?.name}?`}
              icon={<Mui.Icons.Edit />}
              secret={false}
            />
            <Mui.ListItemButton onClick={() => {
              setFilePreviewFileAttr(file);
              setFilePreviewFilePath(dirUtils.pathify(index));
              setFilePreviewOpen(true);
            }}>
              <Mui.ListItemIcon>
                <Mui.Icons.Visibility />
              </Mui.ListItemIcon>
              <Mui.ListItemText primary="Preview" />
            </Mui.ListItemButton>
          </Mui.List>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.DialogContent>
  </Mui.Dialog>
}

export default function DirectoryView({ path, setPath, sambaServiceId, style, onErr }) {
  const [dirUtils, setDirUtils] = React.useState(null);
  const [fileDetailDialogOpen, setFileDetailDialogOpen] = React.useState(false);
  const [fileDetailDialogFile, setFileDetailDialogFile] = React.useState(null);
  const [fileDetailDialogIndex, setFileDetailDialogIndex] = React.useState(0);
  const [dirContent, setDirContent] = React.useState([]);

  function handleUpdateDir(pth) {
    if (sambaServiceId) {
      console.log("DirectoryView: mounting");
      setDirUtils(new DirectoryUtils(pth, sambaServiceId, err => {
        console.error(err);
        onErr(err);
      }, (pth) => {
        setDirContent(dirUtils?.content);
        setPath(pth);
      }));
    }
  }

  React.useEffect(() => {
    handleUpdateDir(path)
  }, [path]);

  React.useEffect(() => {
    setPath('')
    handleUpdateDir('')

  }, [sambaServiceId]);

  const handleClick = (event, index) => {
    event.preventDefault();
    if (dirUtils.content[index]?.is_dir) {
      setPath(dirUtils.justifyPath(dirUtils.path + "/" + dirUtils.content[index].name));
    } else {
      // toggle detail
      setFileDetailDialogOpen(true);
      setFileDetailDialogFile(dirUtils.content[index]);
      setFileDetailDialogIndex(index);
    }
  };

  return <Mui.TableContainer style={style}>
    <FileDetailDialog open={fileDetailDialogOpen} onClose={() => { setFileDetailDialogOpen(false) }} file={fileDetailDialogFile} onErr={onErr} dirUtils={dirUtils} index={fileDetailDialogIndex} />
    <Mui.Table>
      <Mui.TableHead>
        <Mui.TableRow>
          <Mui.TableCell>Name</Mui.TableCell>
          <Mui.TableCell>Last Modified</Mui.TableCell>
          <Mui.TableCell>Size</Mui.TableCell>
        </Mui.TableRow>
      </Mui.TableHead>
      <Mui.TableBody>
        {dirUtils && dirUtils.content.map((item, index) => <Mui.TableRow key={index} onClick={(event) => handleClick(event, index)}>
          <Mui.TableCell>
            <div style={{ display: "flex", alignItems: "center" }}>
              {item?.is_dir ? <Mui.Icons.Folder /> : <Mui.Icons.InsertDriveFile />}
              <Mui.Typography sx={{ paddingLeft: 10 }}>{item?.name}</Mui.Typography>
            </div>
          </Mui.TableCell>
          <Mui.TableCell>{dayjs.unix(item?.changed).format('YYYY-MM-DD HH:mm:ss')}</Mui.TableCell>
          <Mui.TableCell>{filesize(item?.size)}</Mui.TableCell>
        </Mui.TableRow>)}
      </Mui.TableBody>
    </Mui.Table>
  </Mui.TableContainer>
}