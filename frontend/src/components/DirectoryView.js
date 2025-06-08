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
    this.onUpdateDir = onUpdateDir; // This callback will receive (newPath, newContent)
    this.lsdir();
  }

  lsdir(search = '*') {
    return Api.sambaListDirectory(this.sambaServiceId, this.path ? this.path : "/", search ? search : "*").then(data => {
      if (data.status) {
        this.path = data.data.dir === '/' ? '' : data.data.dir;
        this.content = data.data.content || []; // Ensure content is an array
        // Pass the actual content to the callback
        this.onUpdateDir(this.path, [...this.content]); // Pass a copy
        return [...this.content]; // Return a copy
      } else {
        this.onErr(data.data);
      }
    }).catch(err => {
      this.onErr(err.message || 'Failed to list directory');
    });
  }

  delete(name) {
    return Api.sambaDeleteFile(this.sambaServiceId, this.path + "/" + name).then(data => {
      if (data.status) {
        this.content.splice(this.content.findIndex(item => item.name === name), 1);
        // Notify of update, passing a copy of the modified content
        this.onUpdateDir(this.path, [...this.content]);
        return true;
      } else {
        this.onErr(data.data);
        return false; // Explicitly return false
      }
    }).catch(err => {
      this.onErr(err.message || 'Failed to delete file');
      return false;
    });
  }

  rename(oldName, newName) {
    return Api.sambaRenameFile(this.sambaServiceId, this.path + "/" + oldName, this.path + "/" + newName).then(data => {
      if (data.status) {
        this.content.forEach(item => {
          if (item.name === oldName) {
            item.name = newName;
          }
        });
        this.onUpdateDir(this.path, [...this.content]);
        return { status: true }; // Return an object similar to API response for consistency
      } else {
        this.onErr(data.data);
        return { status: false, data: data.data };
      }
    }).catch(err => {
      this.onErr(err.message || 'Failed to rename file');
      return { status: false, data: err.message || 'Failed to rename file' };
    });
  }

  mkdir(newName) {
    return Api.sambaMakeDirectory(this.sambaServiceId, this.path + "/" + newName).then(data => {
      if (data.status) {
        // API should ideally return the new directory entry, or we refetch
        // For now, optimistic update:
        this.content.push({
          name: newName,
          type: "dir", // Assuming type, ideally API confirms or we infer
          is_dir: true, // Add this for consistency with other items
          size: 0, // Default values
          changed: dayjs().unix(), // Default values
          // created, accessed might also be needed if your UI uses them immediately
        });
        // Notify of update
        this.onUpdateDir(this.path, [...this.content]);
        return true;
      } else {
        this.onErr(data.data);
        return false;
      }
    }).catch(err => {
      this.onErr(err.message || 'Failed to create directory');
      return false;
    });
  }

  justifyPath(path) {
    if (path && path.endsWith("/")) {
      return path.slice(0, -1);
    } else if (path && !path.startsWith("/")) {
      return "/" + path;
    } else {
      return path;
    }
  }

  pathify_index(indexInContent) {
    const item = this.content[indexInContent];
    return item ? this.path + "/" + item.name : this.path + "/"; // Handle undefined item
  }

  pathify(fileName) {
    return this.path + "/" + (fileName || ''); // Handle undefined fileName
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
              dirUtils.delete(file?.name);
            }}>
              <Mui.ListItemIcon>
                <Mui.Icons.Delete />
              </Mui.ListItemIcon>
              <Mui.ListItemText primary="Delete" />
            </Mui.ListItemButton>
            <ContentEditDialog
              defaultValue={file?.name}
              onOk={newName => {
                dirUtils.rename(file?.name, newName).then(res => {
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
              hideCurrentValue={true}
            />
            <Mui.ListItemButton onClick={() => {
              setFilePreviewFileAttr(file);
              setFilePreviewFilePath(dirUtils.pathify(file?.name));
              setFilePreviewOpen(true);
            }}>
              <Mui.ListItemIcon>
                <Mui.Icons.Visibility />
              </Mui.ListItemIcon>
              <Mui.ListItemText primary="Preview" />
            </Mui.ListItemButton>
            <Mui.ListItemButton onClick={() => {
              window.open(Api.sambaGetFileUrl(dirUtils.sambaServiceId, dirUtils.pathify(file?.name)))
              onClose();
            }}>
              <Mui.ListItemIcon>
                <Mui.Icons.OpenInNew />
              </Mui.ListItemIcon>
              <Mui.ListItemText primary="Download" />
            </Mui.ListItemButton>
          </Mui.List>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.DialogContent>
  </Mui.Dialog>
}

function FolderDetailDialog({ open, onClose, dir, onErr, dirUtils }) {
  const [size, setSize] = React.useState(null);
  const [lastModified, setLastModified] = React.useState(null);
  const [lastAccessed, setLastAccessed] = React.useState(null);
  const [created, setCreated] = React.useState(null);
  const [allocatedSize, setAllocatedSize] = React.useState(null);
  const [type, setType] = React.useState(null);

  React.useEffect(() => {
    if (dir) {
      setSize(filesize(dir.size));
      setLastModified(dayjs.unix(dir.changed).format('YYYY-MM-DD HH:mm:ss'));
      setLastAccessed(dayjs.unix(dir.accessed).format('YYYY-MM-DD HH:mm:ss'));
      setCreated(dayjs.unix(dir.created).format('YYYY-MM-DD HH:mm:ss'));
      setAllocatedSize(filesize(dir.allocated_size));
      setType("Directory");
    }
  }, [dir]);

  return <Mui.Dialog open={open} onClose={onClose}>
    <Mui.DialogTitle>
      {dir?.name}
    </Mui.DialogTitle>
    <Mui.DialogContent>
      <Mui.Grid container>
        <Mui.Grid item xs={12} sm={6}>
          <Mui.Typography variant="body2">
            <Mui.Typography sx={{ fontWeight: "bold" }}>
              Type:
            </Mui.Typography>
            Directory
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sm={6}>
          <Mui.Typography variant="body2">
            <Mui.Typography sx={{ fontWeight: "bold" }}>
              Size:
            </Mui.Typography>
            N/A
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sm={6}>
          <Mui.Typography variant="body2">
            <Mui.Typography sx={{ fontWeight: "bold" }}>
              Allocated Size:
            </Mui.Typography>
            N/A
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
            {created}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.List>
            <Mui.ListItemButton onClick={() => {
              onClose();
              dirUtils.delete(dir?.name);
            }}>
              <Mui.ListItemIcon>
                <Mui.Icons.Delete />
              </Mui.ListItemIcon>
              <Mui.ListItemText primary="Delete" />
            </Mui.ListItemButton>
            <ContentEditDialog
              defaultValue={dir?.name}
              onOk={newName => {
                dirUtils.rename(dir?.name, newName).then(res => {
                  if (res.status) {
                    onClose();
                  } else {
                    onErr(res.data);
                  }
                });
              }}
              title="Rename"
              description={`Give a new name for ${dir?.name}?`}
              icon={<Mui.Icons.Edit />}
              secret={false}
              hideCurrentValue={true}
            />
          </Mui.List>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.DialogContent>
  </Mui.Dialog >
}

export default function DirectoryView({ path, setPath, sambaServiceId, style, onErr, refresher, setRefresher, searchParam }) {
  const [dirUtils, setDirUtils] = React.useState(null);
  const [fileDetailDialogOpen, setFileDetailDialogOpen] = React.useState(false);
  const [fileDetailDialogFile, setFileDetailDialogFile] = React.useState(null);
  const [fileDetailDialogIndex, setFileDetailDialogIndex] = React.useState(0);
  const [filePreviewFilePath, setFilePreviewFilePath] = React.useState(null);
  const [filePreviewFileAttr, setFilePreviewFileAttr] = React.useState(null);
  const [filePreviewOpen, setFilePreviewOpen] = React.useState(false);
  const [folderDetailDialogOpen, setFolderDetailDialogOpen] = React.useState(false);
  const [folderDetailDialogDir, setFolderDetailDialogDir] = React.useState(null);

  // dirContent will hold the raw, unsorted content from dirUtils
  const [rawDirContent, setRawDirContent] = React.useState([]);
  // sortedDirContent will be derived and used for rendering
  const [sortedDirContent, setSortedDirContent] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState('none'); // 'none' or actual initial sort

  // Pure sorting function, returns a new array
  function getSortedContent(content, order) {
    if (!content || content.length === 0) return [];
    const newArray = [...content];
    console.log("DirectoryView: sorting", order, "on", newArray.length, "items");

    // Ensure items have properties before sorting
    const isValidItem = (item, prop) => item && typeof item === 'object' && item[prop] !== undefined;

    switch (order) {
      case 'name_asc':
        return newArray.sort((a, b) => {
          if (!isValidItem(a, 'name') || !isValidItem(b, 'name')) return 0;
          return String(a.name).localeCompare(String(b.name));
        });
      case 'name_desc':
        return newArray.sort((a, b) => {
          if (!isValidItem(a, 'name') || !isValidItem(b, 'name')) return 0;
          return String(b.name).localeCompare(String(a.name)); // Corrected: b.name.localeCompare(a.name)
        });
      case 'last_modified_asc':
        return newArray.sort((a, b) => (isValidItem(a, 'changed') && isValidItem(b, 'changed')) ? a.changed - b.changed : 0);
      case 'last_modified_desc':
        return newArray.sort((a, b) => (isValidItem(a, 'changed') && isValidItem(b, 'changed')) ? b.changed - a.changed : 0);
      case 'size_asc':
        // Directories might not have size or size 0, handle type differences if needed
        return newArray.sort((a, b) => {
          const sizeA = a.is_dir ? -1 : (isValidItem(a, 'size') ? a.size : 0); // Treat dir size as very small for sorting purposes or handle separately
          const sizeB = b.is_dir ? -1 : (isValidItem(b, 'size') ? b.size : 0);
          return sizeA - sizeB;
        });
      case 'size_desc':
        return newArray.sort((a, b) => {
          const sizeA = a.is_dir ? -1 : (isValidItem(a, 'size') ? a.size : 0);
          const sizeB = b.is_dir ? -1 : (isValidItem(b, 'size') ? b.size : 0);
          return sizeB - sizeA;
        });
      case 'type_asc': // Dirs first
        return newArray.sort((a, b) => {
          const typeA = a.is_dir ? 0 : 1;
          const typeB = b.is_dir ? 0 : 1;
          if (typeA === typeB) return String(a.name).localeCompare(String(b.name)); // Secondary sort by name
          return typeA - typeB;
        });
      case 'type_desc': // Files first
        return newArray.sort((a, b) => {
          const typeA = a.is_dir ? 0 : 1;
          const typeB = b.is_dir ? 0 : 1;
          if (typeA === typeB) return String(a.name).localeCompare(String(b.name)); // Secondary sort by name
          return typeB - typeA;
        });
      default:
        return newArray; // Return copy even if no sort
    }
  }

  const internalOnUpdateDir = React.useCallback((newPath, newContent) => {
    console.log("DirectoryView: internalOnUpdateDir received path:", newPath, "content:", newContent);
    setRawDirContent(newContent || []);
    if (path !== newPath) {
      setPath(newPath);
    }
  }, [path, setPath]);

  // Effect to create/update DirectoryUtils instance when necessary
  React.useEffect(() => {
    if (sambaServiceId) {
      console.log("DirectoryView: Creating/Recreating DirectoryUtils for path:", path);
      const newDirUtils = new DirectoryUtils(path, sambaServiceId, err => {
        console.error("DirectoryUtils Error:", err);
        onErr(err);
      }, internalOnUpdateDir);
      setDirUtils(newDirUtils);
    } else {
      setDirUtils(null);
      setRawDirContent([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, refresher, internalOnUpdateDir]);

  React.useEffect(() => {
    if (dirUtils) {
      dirUtils.lsdir(searchParam)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  React.useEffect(() => {
    setPath('')
    setRefresher(Date.now())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sambaServiceId]);

  // Effect to sort when rawDirContent or orderBy changes
  React.useEffect(() => {
    console.log("DirectoryView: Sorting rawDirContent due to change in rawDirContent or orderBy. OrderBy:", orderBy);
    setSortedDirContent(getSortedContent(rawDirContent, orderBy));
  }, [rawDirContent, orderBy]);

  React.useEffect(() => {
    if (sambaServiceId) {
      console.log("DirectoryView: sambaServiceId changed, resetting path to root.");
      setPath('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sambaServiceId]);

  const handleClick = (event, item) => {
    event.preventDefault();
    if (!item.is_dir) {
      setFilePreviewFilePath(dirUtils.pathify(item.name));
      setFilePreviewFileAttr(item);
      setFilePreviewOpen(true);
    } else {
      const newPath = dirUtils.path + (dirUtils.path === '' ? '' : "/") + item.name;
      setPath(newPath);
    }
  };

  const handleSort = (sortKey) => {
    setOrderBy(prevOrderBy => {
      const SuffixAsc = '_asc';
      const SuffixDesc = '_desc';
      if (prevOrderBy === sortKey + SuffixAsc) {
        return sortKey + SuffixDesc;
      }
      return sortKey + SuffixAsc;
    });
  };

  const onRightClick = (e, item) => {
    e.preventDefault();
    if (item?.is_dir) {
      setFolderDetailDialogDir(item);
      setFolderDetailDialogOpen(true);
    } else {
      const itemIndexInSorted = sortedDirContent.findIndex(i => i.name === item.name && i.is_dir === item.is_dir);
      setFileDetailDialogOpen(true);
      setFileDetailDialogFile(item);
      const originalItemIndex = dirUtils?.content.findIndex(originalItem => originalItem.name === item.name && originalItem.is_dir === item.is_dir);
      setFileDetailDialogIndex(originalItemIndex !== -1 ? originalItemIndex : 0);
    }
  }


  return <Mui.TableContainer style={style}>
    <FileDetailDialog
      open={fileDetailDialogOpen}
      onClose={() => { setFileDetailDialogOpen(false); }}
      file={fileDetailDialogFile}
      onErr={onErr}
      dirUtils={dirUtils}
      index={fileDetailDialogIndex}
    />
    <FilePreviewer file_path={filePreviewFilePath} file_attrs={filePreviewFileAttr} open={filePreviewOpen} setOpen={setFilePreviewOpen} samba_service_id={dirUtils?.sambaServiceId} />
    <FolderDetailDialog
      open={folderDetailDialogOpen}
      onClose={() => { setFolderDetailDialogOpen(false); }}
      dir={folderDetailDialogDir}
      onErr={onErr}
      dirUtils={dirUtils}
    />
    <Mui.Table>
      <Mui.TableHead>
        <Mui.TableRow>
          <Mui.TableCell onClick={() => handleSort('name')}>
            <Mui.IconText>
              Name
              {orderBy === 'name_asc' ? <Mui.Icons.ArrowDropUp /> : orderBy === 'name_desc' ? <Mui.Icons.ArrowDropDown /> : null}
            </Mui.IconText>
          </Mui.TableCell>
          <Mui.TableCell onClick={() => handleSort('last_modified')}>
            <Mui.IconText>
              Last Modified
              {orderBy === 'last_modified_asc' ? <Mui.Icons.ArrowDropUp size={'small'} /> : orderBy === 'last_modified_desc' ? <Mui.Icons.ArrowDropDown size={'small'} /> : null}
            </Mui.IconText>
          </Mui.TableCell>
          <Mui.TableCell onClick={() => handleSort('type')}>
            <Mui.IconText>
              Type
              {orderBy === 'type_asc' ? <Mui.Icons.ArrowDropUp size={'small'} /> : orderBy === 'type_desc' ? <Mui.Icons.ArrowDropDown size={'small'} /> : null}
            </Mui.IconText>
          </Mui.TableCell>
          <Mui.TableCell onClick={() => handleSort('size')}>
            <Mui.IconText>
              Size
              {orderBy === 'size_asc' ? <Mui.Icons.ArrowDropUp size={'small'} /> : orderBy === 'size_desc' ? <Mui.Icons.ArrowDropDown size={'small'} /> : null}
            </Mui.IconText>
          </Mui.TableCell>
        </Mui.TableRow>
      </Mui.TableHead>
      <Mui.TableBody>
        {sortedDirContent.map((item, index) => (
          <Mui.TableRow key={`${item.name}-${index}`} onClick={(event) => handleClick(event, item)} onContextMenu={(e) => onRightClick(e, item)}>
            <Mui.TableCell>
              <div style={{ display: "flex", alignItems: "center" }}>
                {item?.is_dir ? <Mui.Icons.Folder /> : <Mui.Icons.InsertDriveFile />}
                <Mui.Typography sx={{ paddingLeft: '10px' }}>{item?.name}</Mui.Typography>
              </div>
            </Mui.TableCell>
            <Mui.TableCell>{item?.changed ? dayjs.unix(item.changed).format('YYYY-MM-DD HH:mm:ss') : 'N/A'}</Mui.TableCell>
            <Mui.TableCell>{item?.is_dir ? "Folder" : "File"}</Mui.TableCell>
            <Mui.TableCell>{item && !item.is_dir && item.size !== undefined ? filesize(item.size) : (item?.is_dir ? '—' : 'N/A')}</Mui.TableCell>
          </Mui.TableRow>
        ))}
      </Mui.TableBody>
    </Mui.Table>
  </Mui.TableContainer>
}