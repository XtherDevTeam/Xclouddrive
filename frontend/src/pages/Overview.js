import Api from "../Api";
import React, { useState, useEffect } from "react";
import * as Mui from '../Components';

function AddDriveDialog({ open, setOpen, onErr, onUpdateDriveList }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [service_name, setServiceName] = useState("");
  const [share_name, setShareName] = useState("");
  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [use_ntlm_v2, setUseNtlmV2] = useState(true);
  const [is_direct_tcp, setIsDirectTcp] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return <Mui.Dialog open={open} onClose={() => setOpen(false)}>
    <Mui.DialogTitle>Add Drive</Mui.DialogTitle>
    <Mui.DialogContent>
      <Mui.Grid container spacing={2}>
        <Mui.Grid item xs={12}>
          Add a new samba drive to Xclouddrive instance.
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.TextField
            label="Service Name"
            value={service_name}
            onChange={e => setServiceName(e.target.value)}
            fullWidth
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.TextField
            label="Share Name"
            value={share_name}
            onChange={e => setShareName(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.TextField
            label="User ID"
            value={user_id}
            onChange={e => setUserId(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.TextField
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <Mui.InputAdornment position="end">
                  <Mui.IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <Mui.Icons.Visibility /> : <Mui.Icons.VisibilityOff />}
                  </Mui.IconButton>
                </Mui.InputAdornment>
              ),
            }}
            type={passwordVisible ? "text" : "password"}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.FormControlLabel
            control={
              <Mui.Checkbox
                checked={use_ntlm_v2}
                onChange={e => setUseNtlmV2(e.target.checked)}
              />
            }
            label="Use NTLMv2"
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.FormControlLabel
            control={
              <Mui.Checkbox
                checked={is_direct_tcp}
                onChange={e => setIsDirectTcp(e.target.checked)}
              />
            }
            label="Use Direct TCP"
          />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.DialogContent>
    <Mui.DialogActions>
      <Mui.Button onClick={() => setOpen(false)}>Cancel</Mui.Button>
      <Mui.Button onClick={() => {
        Api.createSambaRoute(name, description, service_name, share_name, user_id, password, use_ntlm_v2, is_direct_tcp).then(r => {
          if (r.status) {
            onUpdateDriveList();
            setOpen(false);
          } else {
            onErr(r.data);
          }
        }).catch(e => {
          onErr(e);
        });
      }} disabled={!name || !description || !service_name || !share_name}>
        Add
      </Mui.Button>
    </Mui.DialogActions>
  </Mui.Dialog>
}

function EditDriveDialog({ open, setOpen, drive, onErr, onUpdateDriveList }) {
  const [name, setName] = useState(drive?.name);
  const [description, setDescription] = useState(drive?.description);
  const [service_name, setServiceName] = useState(drive?.service_name);
  const [share_name, setShareName] = useState(drive?.share_name);
  const [user_id, setUserId] = useState(drive?.user_id);
  const [password, setPassword] = useState(drive?.password);
  const [use_ntlm_v2, setUseNtlmV2] = useState(drive?.use_ntlm_v2);
  const [is_direct_tcp, setIsDirectTcp] = useState(drive?.is_direct_tcp);
  const [passwordVisible, setPasswordVisible] = useState(false);

  React.useEffect(() => {
    if (drive) {
      setName(drive.name);
      setDescription(drive.description);
      setServiceName(drive.service_name);
      setShareName(drive.share_name);
      setUserId(drive.user_id);
      setPassword(drive.password);
      setUseNtlmV2(drive.use_ntlm_v2);
      setIsDirectTcp(drive.is_direct_tcp);
    }
  }, [drive]);

  return <Mui.Dialog open={open} onClose={() => setOpen(false)}>
    <Mui.DialogTitle>Edit Drive</Mui.DialogTitle>
    <Mui.DialogContent>
      <Mui.Grid container spacing={2}>
        <Mui.Grid item xs={12}>
          Edit a samba drive.
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.TextField
            label="Service Name"
            value={service_name}
            onChange={e => setServiceName(e.target.value)}
            fullWidth
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.TextField
            label="Share Name"
            value={share_name}
            onChange={e => setShareName(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.TextField
            label="User ID"
            value={user_id}
            onChange={e => setUserId(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.TextField
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <Mui.InputAdornment position="end">
                  <Mui.IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <Mui.Icons.Visibility /> : <Mui.Icons.VisibilityOff />}
                  </Mui.IconButton>
                </Mui.InputAdornment>
              ),
            }
            }
            type={passwordVisible ? "text" : "password"}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.FormControlLabel
            control={
              <Mui.Checkbox
                checked={use_ntlm_v2}
                onChange={e => setUseNtlmV2(e.target.checked)}
              />
            }
            label="Use NTLMv2"
          />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.FormControlLabel
            control={
              <Mui.Checkbox
                checked={is_direct_tcp}
                onChange={e => setIsDirectTcp(e.target.checked)}
              />
            }
            label="Use Direct TCP"
          />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.DialogContent>
    <Mui.DialogActions>
      <Mui.Button onClick={() => setOpen(false)}>Cancel</Mui.Button>
      <Mui.Button onClick={() => {
        Api.updateSambaRoute(drive.id, name, description, service_name, share_name, user_id, password, use_ntlm_v2, is_direct_tcp).then(r => {
          if (r.status) {
            onUpdateDriveList();
            setOpen(false);
          } else {
            onErr(r.data);
          }
        }).catch(e => {
          onErr(e);
        });
      }} disabled={!name || !description || !service_name || !share_name}>
        Save
      </Mui.Button>
    </Mui.DialogActions>
  </Mui.Dialog>
}

export default function Overview({ onSwitchToClouddrive, onUpdateDriveList }) {
  const [drives, setDrives] = useState([]);
  const [addDriveDialogOpen, setAddDriveDialogOpen] = useState(false);
  const [editDriveDialogOpen, setEditDriveDialogOpen] = useState(false);
  const [editDrive, setEditDrive] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertDetail, setAlertDetail] = useState({ type: "success", title: "Success", message: "" });

  function fetchDrives() {
    Api.getSambaRoutes().then(r => setDrives(r.data))
    onUpdateDriveList();
  }

  React.useEffect(() => {
    fetchDrives();
  }, []);

  return <Mui.Box sx={{ height: '100%', width: 'calc(100% - 60px)', marginLeft: 30, paddingRight: 30, overflowY: 'auto' }}>
    <AddDriveDialog open={addDriveDialogOpen} setOpen={setAddDriveDialogOpen} onErr={e => {
      setAlertDetail({ type: "error", title: "Error", message: e.message });
      setAlertOpen(true);
    }} onUpdateDriveList={() => {
      onUpdateDriveList();
      fetchDrives();
    }} />
    <EditDriveDialog open={editDriveDialogOpen} setOpen={setEditDriveDialogOpen} drive={editDrive} onErr={e => {
      setAlertDetail({ type: "error", title: "Error", message: e.message });
      setAlertOpen(true);
    }} onUpdateDriveList={() => {
      onUpdateDriveList();
      fetchDrives();
    }} />
    <Mui.Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => { setAlertOpen(false) }}>
      <Mui.Alert severity={alertDetail.type} action={
        <Mui.IconButton aria-label="close" color="inherit" size="small" onClick={() => { setAlertOpen(false) }} >
          <Mui.Icons.Close fontSize="inherit" />
        </Mui.IconButton>
      }>
        <Mui.AlertTitle>{alertDetail.title}</Mui.AlertTitle>
        {alertDetail.message}
      </Mui.Alert>
    </Mui.Snackbar>
    <Mui.Fab onClick={() => setAddDriveDialogOpen(true)} color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 20, right: 20 }} variant="extended">
      <Mui.Icons.Add />
      Add Drive
    </Mui.Fab>
    <Mui.Grid container spacing={3} sx={{ marginTop: 20 }}>
      <Mui.Grid item xs={12}>
        <Mui.Typography variant="h5">
          Drives
        </Mui.Typography>
        <Mui.Typography variant="body1">
          All samba drives are listed here. You can also add a new drive by clicking the "Add Drive" button.
        </Mui.Typography>
      </Mui.Grid>
      {drives.map(drive => <Mui.Grid item xs={12} sm={6} md={4} key={drive.id}>
        <Mui.Card sx={{ width: '100%' }}>
          <Mui.CardContent>
            <Mui.Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {drive?.name}
            </Mui.Typography>
            <Mui.Typography variant="body2">
              {drive?.description}
            </Mui.Typography>
            <Mui.Typography variant="body2" color="text.secondary">
              \\{drive?.user_id}@{drive?.service_name}\{drive?.share_name}
            </Mui.Typography>
            <Mui.Typography variant="body2" sx={{ fontWeight: 'bold' }} color="text.secondary">
              Status:
              <Mui.Typography variant="body2" color={drive?.connected ? "green" : "error"} sx={{ display: 'inline-block', marginLeft: 5 }}>
                {drive?.connected ? "Online" : "Offline"}
              </Mui.Typography>
            </Mui.Typography>
          </Mui.CardContent>
          <Mui.CardActions>
            {drive?.connected
              ? <Mui.Button onClick={() => {
                onSwitchToClouddrive(drive.id);
              }} variant="contained" color="primary">Navigate</Mui.Button>
              : <Mui.Button onClick={() => {
                Api.sambaConnect(drive.id).then(r => {
                  if (r.status) {
                    onUpdateDriveList();
                    fetchDrives();
                  } else {
                    setAlertDetail({ type: "error", title: "Error", message: r.data });
                    setAlertOpen(true);
                  }
                }).catch(e => {
                  console.error(e);
                });
              }} variant="contained" color="primary">Connect</Mui.Button>}
            <Mui.IconButton onClick={() => {
              Api.sambaDisconnect(drive.id).then(r => {
                if (r.status) {
                  onUpdateDriveList();
                  fetchDrives();
                } else {
                  setAlertDetail({ type: "error", title: "Error", message: r.data });
                  setAlertOpen(true);
                }
              }).catch(e => {
                console.error(e);
              });
            }} aria-label="disconnect">
              <Mui.Icons.PowerSettingsNew />
            </Mui.IconButton>
            <Mui.IconButton onClick={() => {
              setEditDrive(drive);
              setEditDriveDialogOpen(true);
            }} aria-label="edit">
              <Mui.Icons.Edit />
            </Mui.IconButton>
            <Mui.IconButton onClick={() => {
              Api.deleteSambaRoute(drive.id).then(r => {
                if (r.status) {
                  onUpdateDriveList();
                  fetchDrives();
                } else {
                  setAlertDetail({ type: "error", title: "Error", message: r.data });
                  setAlertOpen(true);
                }
              }).catch(e => {
                console.error(e);
              });
            }} aria-label="delete">
              <Mui.Icons.Delete />
            </Mui.IconButton>
          </Mui.CardActions>
        </Mui.Card>
      </Mui.Grid>)}
    </Mui.Grid>
  </Mui.Box>
}