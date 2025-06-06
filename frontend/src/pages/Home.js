
import React from "react";
import Api from "../Api";
import { useNavigate } from "react-router-dom";
import * as Mui from "../Components";
import theme from "../theme";
import Message from "../components/Message";
import More from './More';
import Overview from "./Overview";
import DriveView from "./DriveView";

function ResearchAction({ research, onOk, onClose, onErr, open }) {
  return <Mui.Dialog onClose={onClose} open={open}>
    <Mui.DialogTitle>
      {research?.name}
    </Mui.DialogTitle>
    {research && <Mui.List>
      <Mui.ListItemButton onClick={() => {
        Api.deleteResearchHistory(research.id).then(r => {
          if (r.status) {
            onOk('Successfully deleted')
            onClose()
          }
        }).catch(e => {
          onErr('Network error')
          onClose()
        })
      }} >
        <Mui.ListItemIcon>
          <Mui.Icons.Delete />
        </Mui.ListItemIcon>
        <Mui.ListItemText primary="Delete" />
      </Mui.ListItemButton>
      <Mui.ListItemButton onClick={() => {
        onClose()
      }} >
        <Mui.ListItemIcon>
          <Mui.Icons.Close />
        </Mui.ListItemIcon>
        <Mui.ListItemText primary="Cancel" />
      </Mui.ListItemButton>
    </Mui.List>}
  </Mui.Dialog>
}

function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: "",
    level: 0
  });
  const [currentTab, setCurrentTab] = React.useState(0);
  const [currentTheme, setCurrentTheme] = React.useState(theme.theme());
  const [currentThemeMode, setCurrentThemeMode] = React.useState(theme.getCurrentThemeMode());
  const [selectedIndex, setSelectedIndex] = React.useState({
    type: 'Overview',
    title: 'Overview',
    data: null
  });
  const [secondBoxMarginLeft, setSecondBoxMarginLeft] = React.useState('20vw')
  const [drives, setDrives] = React.useState([])

  const [currentResearch, setCurrentResearch] = React.useState(null)
  const [currentResearchActionOpen, setCurrentResearchActionOpen] = React.useState(false)

  // message related
  const [messageTitle, setMessageTitle] = React.useState('')
  const [messageContent, setMessageContent] = React.useState('')
  const [messageType, setMessageType] = React.useState('')
  const [messageOpen, setMessageOpen] = React.useState(false)

  const drawerRef = React.useRef(null);

  function handleDriveListUpdate() {
    Api.getStatus().then(r => {
      if (r.status) {
        if (r.data?.is_initialized) {
          if (r.data?.is_authorized) {
            Api.getSambaRoutes().then(r => {
              if (r.status) {
                console.log(r.data)
                setDrives(r.data)
              } else {
                console.log(r.data)
                setMessageTitle('Error')
                setMessageContent(r.data)
                setMessageType('error')
                setMessageOpen(true)
              }
            })
          } else {
            setMessageContent('Please authorize the Xclouddrive first')
            setMessageType('error')
            setMessageOpen(true)
            setMessageTitle('Error')
            navigate('/authorize')
          }
        } else {
          setDrives([])
          setMessageContent('Please initialize the Xclouddrive first')
          setMessageType('error')
          setMessageOpen(true)
          setMessageTitle('Error')
          navigate('/initialize')
        }
      }
    })
  }

  React.useEffect(() => {
    handleDriveListUpdate()
    theme.listenToThemeModeChange(() => {
      setCurrentTheme(theme.theme());
      setCurrentThemeMode(theme.getCurrentThemeMode());
    })
  }, [])

  return <Mui.Box style={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw', backgroundColor: currentTheme.palette.surfaceContainer.main }}>
    <Message title={messageTitle} message={messageContent} type={messageType} open={messageOpen} dismiss={() => setMessageOpen(false)}></Message>
    <ResearchAction
      research={currentResearch}
      onOk={(message) => {
        setMessageTitle('Success')
        setMessageContent(message)
        setMessageType('success')
        setMessageOpen(true)
        setCurrentResearch(null)
        setCurrentResearchActionOpen(false)
        // re-render
        handleDriveListUpdate()
      }}
      onClose={() => {
        setCurrentResearch(null)
        setCurrentResearchActionOpen(false)
      }}
      onErr={(message) => {
        setMessageTitle('Error')
        setMessageContent(message)
        setMessageType('error')
        setMessageOpen(true)
      }}
      open={currentResearchActionOpen}
    />
    <Mui.Drawer ref={drawerRef} open={true} onLoad={() => { console.log(drawerRef) }} variant="permanent" style={{ position: 'absolute', top: 0, left: 0, height: '100vh' }} PaperProps={{ sx: { width: '20vw' } }}>
      <Mui.Toolbar>
        <Mui.Typography color="inherit" sx={{ fontWeight: 500, letterSpacing: 0.5, fontSize: 20 }}>
          Xclouddrive
        </Mui.Typography>
      </Mui.Toolbar>
      <Mui.List style={{ padding: 10 }}>
        <Mui.Box>
          <Mui.ListItemButton selected={selectedIndex.type === "Overview"} onClick={() => { setSelectedIndex({ type: "Overview", title: "Overview", data: null }); }}>
            <Mui.ListItemIcon>
              <Mui.Icons.Home />
            </Mui.ListItemIcon>
            <Mui.ListItemText primary="Overview" />
          </Mui.ListItemButton>
          <Mui.ListItem sx={{ py: 2, px: 3, padding: 10 }}>
            <Mui.ListItemText sx={{ fontWeight: 'bold' }}>
              <Mui.Typography color="inherit" sx={{ ml: 1, fontSize: 15, fontWeight: 500 }} >
                Drives
              </Mui.Typography>
            </Mui.ListItemText>
          </Mui.ListItem>
          {drives?.map((drive, index) => <Mui.ListItemButton key={index} selected={selectedIndex.type === "DriveView" && selectedIndex.data?.id === drive.id} onClick={() => { setSelectedIndex({ type: "DriveView", title: drive.name, data: drive }); }}>
            <Mui.ListItemIcon>
              <Mui.Icons.DriveFileMove />
            </Mui.ListItemIcon>
            <Mui.ListItemText primary={drive.name} />
          </Mui.ListItemButton>)}
        </Mui.Box>
        <Mui.Box>
          <Mui.ListItem sx={{ py: 2, px: 3, padding: 10 }}>
            <Mui.ListItemText sx={{ fontWeight: 'bold' }}>
              <Mui.Typography color="inherit" sx={{ ml: 1, fontSize: 15, fontWeight: 500 }} >
                Settings
              </Mui.Typography>
            </Mui.ListItemText>
          </Mui.ListItem>
          <Mui.ListItemButton selected={selectedIndex.type === "More"} onClick={() => { setSelectedIndex({ type: "More", title: "More", data: null }); }}>
            <Mui.ListItemIcon>
              <Mui.Icons.Apps />
            </Mui.ListItemIcon>
            <Mui.ListItemText primary="More" />
          </Mui.ListItemButton>
        </Mui.Box>
      </Mui.List>
    </Mui.Drawer>
    <Mui.Box style={{ display: 'block', marginLeft: secondBoxMarginLeft }}>
      <Mui.AppBar style={{ left: secondBoxMarginLeft, zIndex: 1200 }}>
        <Mui.Toolbar sx={{ width: `calc(100vw - ${secondBoxMarginLeft} - 20px)` }}>
          <Mui.Typography color="inherit" sx={{ fontWeight: 500, letterSpacing: 0.5, fontSize: 20, flexGrow: 1 }}>
            {selectedIndex.title}
          </Mui.Typography>
          <Mui.IconButton onClick={() => {
            theme.rotateThemeMode()
          }} sx={{ right: 20 }}>
            {currentThemeMode === 'light' ? <Mui.Icons.Brightness4 /> : <Mui.Icons.Brightness7 />}
          </Mui.IconButton>
        </Mui.Toolbar>
        <Mui.Paper style={{ padding: 0, borderTopLeftRadius: 30, height: `calc(100vh - 64px)`, width: `calc(100vw - ${secondBoxMarginLeft})` }}>
          {selectedIndex.type === "Overview" && <Overview onSwitchToClouddrive={drive_id => {
            // find the drive by id and navigate to it
            let drive = null
            for (let i = 0; i < drives.length; i++) {
              if (drives[i].id === drive_id) {
                drive = drives[i]
                break
              }
            }
            if (drive) {
              setSelectedIndex({ type: "DriveView", title: drive?.name, data: drive });
            }
          }} onUpdateDriveList={handleDriveListUpdate}></Overview>}
          {selectedIndex.type === "More" && <More></More>}
          {selectedIndex.type === "DriveView" && <DriveView drive={selectedIndex.data}></DriveView>}
        </Mui.Paper>
      </Mui.AppBar>
    </Mui.Box>
  </Mui.Box>
}

export default Home;
