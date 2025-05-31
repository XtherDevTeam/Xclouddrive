
import * as React from 'react'
import * as Mui from '../Components'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import theme from '../theme'

import { useNavigate, useHref } from "react-router-dom"
import Api from '../Api'


function Stage1({ onNext, onErr }) {
  return <>
    <Mui.CardContent>
      <Mui.Typography gutterBottom variant="h5" component="div">
        {"Xclouddrive Initialization"}
      </Mui.Typography>
      <Mui.Typography variant="body2" color="text.secondary">
        You are almost there, let's start with the initialization of your Xclouddrive server.
      </Mui.Typography>
    </Mui.CardContent>
    <Mui.CardActions>
      {/* <Mui.Button size="small" onClick={() => { navigate(-1) }}></Mui.Button> */}
      <Mui.Button size="small" onClick={() => onNext()}>Start</Mui.Button>
    </Mui.CardActions>
  </>
}

function Stage2({ onBack, onErr, onNext }) {
  const [secret, setSecret] = React.useState("")

  return <>
    <Mui.CardContent>
      <Mui.Typography gutterBottom variant="h5" component="div">
        {"Set-up authentication token"}
      </Mui.Typography>
      <Mui.Typography variant="body2" color="text.secondary">
        {"To access your Xclouddrive server, you need to create a secret which is a access token that will have full access to the server, and can manage samba routes, and other settings."}
      </Mui.Typography>
      <div style={{ height: 20 }}></div>
      <Mui.TextField
        fullWidth
        label="Secret"
        variant="outlined"
        margin="normal"
        required
        autoFocus
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
    </Mui.CardContent>
    <Mui.CardActions>
      <Mui.Button size="small" onClick={() => onBack()}>Back</Mui.Button>
      <Mui.Button size="small" onClick={() => onNext(secret)}>Next</Mui.Button>
    </Mui.CardActions>
  </>
}

function Stage3({ onBack, onErr, onNext }) {
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")

  return <>
    <Mui.CardContent>
      <Mui.Typography gutterBottom variant="h5" component="div">
        {"Set-up your personal server information"}
      </Mui.Typography>
      <Mui.Typography variant="body2" color="text.secondary">
        {"To personalize your Xclouddrive server, you may have the title and description of your server to display at sign-in page."}
      </Mui.Typography>
      <div style={{ height: 20 }}></div>
      <Mui.TextField
        fullWidth
        label="Title"
        variant="outlined"
        margin="normal"
        required
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Mui.TextField
        fullWidth
        label="Description"
        variant="outlined"
        margin="normal"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        maxRows={5}
      />
    </Mui.CardContent>
    <Mui.CardActions>
      <Mui.Button size="small" onClick={() => onBack()}>Back</Mui.Button>
      <Mui.Button size="small" onClick={() => onNext(title, description)}>Next</Mui.Button>
    </Mui.CardActions>
  </>
}


function Stage4({ onBack, onNext, onErr, currentFields }) {
  const [readyToRedirect, setReadyToRedirect] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      Api.initialize(currentFields.secret, currentFields.title, currentFields.description).then(() => {
        setReadyToRedirect(true)
      }).catch((e) => {
        onErr(e.response.data.message)
      })
    }, 500)
  }, [currentFields])

  return <>
    <Mui.CardContent>
      <Mui.Typography gutterBottom variant="h5" component="div">
        {"Getting ready for you..."}
      </Mui.Typography>
      <Mui.Typography variant="body2" color="text.secondary">
        {"Your Xclouddrive server is now ready to use. You can now experience Xclouddrive."}
      </Mui.Typography>
      {/* occupy the space of the card content */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Mui.CircularProgress />
      </div>
    </Mui.CardContent>
    <Mui.CardActions>
      <Mui.Button size="small" disabled>Back</Mui.Button>
      {readyToRedirect && <Mui.Button size="small" onClick={() => {
        onNext()
      }}>Finish</Mui.Button>}
    </Mui.CardActions>
  </>
}

export default function Initialize() {
  const navigate = useNavigate()
  let [currentTheme, setCurrentTheme] = React.useState(theme.theme())
  let [currentStage, setCurrentStage] = React.useState(1)
  let [currentFields, setCurrentFields] = React.useState({
    secret: "",
    title: "",
    description: ""
  })
  let [alertOpen, setAlertOpen] = React.useState(false)
  let [alertDetail, setAlertDetail] = React.useState({ type: "success", title: "", message: "" })

  theme.listenToThemeModeChange((v) => {
    setCurrentTheme(theme.theme())
  })

  React.useEffect(() => {
    console.log(theme.theme())
  }, [currentTheme])

  React.useEffect(() => {
    Api.getStatus().then(r => {
      if (r.status && r.data?.is_initialized) {
        setAlertDetail({ type: "success", title: "Success", message: "Your Xclouddrive server is already initialized. You can now experience Xclouddrive." })
        setAlertOpen(true)
        navigate("/")
      }
    })
  }, [])

  return (
    <>
      <theme.Background img={theme.imgBackground3} />
      <Mui.Card sx={{ maxWidth: 500, top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute" }}>
        {currentStage === 1 && <Stage1 onNext={() => setCurrentStage(2)} />}
        {currentStage === 2 && <Stage2 onBack={() => setCurrentStage(1)} onNext={(secret) => {
          setCurrentFields({ ...currentFields, secret })
          setCurrentStage(3)
        }} onErr={(msg) => {
          setAlertDetail({ type: "error", title: "Error", message: msg })
          setAlertOpen(true)
        }} />}
        {currentStage === 3 && <Stage3 onBack={() => setCurrentStage(2)} onNext={(title, description) => {
          setCurrentFields({ ...currentFields, title, description })
          setCurrentStage(4)
        }} onErr={(msg) => {
          setAlertDetail({ type: "error", title: "Error", message: msg })
        }} />}
        {currentStage === 4 && <Stage4 onNext={() => {
          navigate("/")
        }} currentFields={currentFields} onErr={(msg) => {
          setAlertDetail({ type: "error", title: "Error", message: msg })
        }} />}

        <div style={{ height: 20 }}></div>
        <Mui.LinearProgress style={{ padding: 0, margin: 0, width: "100%" }} variant="determinate" value={(currentStage / 6) * 100} />
        <div style={{ height: 20 }}></div>
      </Mui.Card>
      <Mui.Container style={{ height: '100vh', overflowY: 'hidden' }}>
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
      </Mui.Container>
    </>
  )
}
