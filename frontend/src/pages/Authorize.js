import * as React from 'react'
import * as Mui from '../Components'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import loginBackground from '../assets/loginBackground.jpg'
import { useNavigate, useHref } from "react-router-dom"
import theme from '../theme'
import Api from '../Api'

function Copyright(props) {
  return (
    <Mui.Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Mui.Link color="inherit" href="https://xiaokang00010.top/">
        Xclouddrive
      </Mui.Link>
      {' '}
      {" by Jerry Chou and Naganohara Yoimiya"}
    </Mui.Typography>
  );
}

export default function Authorize() {
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = React.useState(false)
  const [alertDetail, setAlertDetail] = React.useState({ "type": "error", "title": "", "message": "" })

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    Api.authorize(data.get('secret')).then((data) => {
      if (data.status) {
        setAlertDetail({ "type": "success", "message": "Authorization completed! Redirecting to the homepage.", "title": "Success" })
        setAlertOpen(true)
        setTimeout(() => {
          navigate("/")
        }, 1000)
      } else {
        setAlertDetail({ "type": "error", "message": data.data, "title": "Error" })
        setAlertOpen(true)
      }
    })
  };

  return (
    <Mui.Grid container component="main" sx={{ height: '100vh' }}>
      <Mui.CssBaseline />
      <Mui.Grid
        item
        xs={false}
        sm={6}
        md={9}
        sx={{
          backgroundImage: `url(` + loginBackground + `)`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Mui.Grid item xs={12} sm={6} md={3} component={Mui.Paper} elevation={6} square>
        <Mui.IconButton sx={{ float: 'right' }} onClick={() => {
          theme.rotateThemeMode()
        }}>
          <Mui.Icons.Brightness4 />
        </Mui.IconButton>

        <Mui.Box
          sx={{
            my: 8,
            mx: 4,
            height: 'calc(100vh - 40px)',
            width: '100%',
            paddingLeft: '5%',
            paddingRight: '5%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Mui.Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => { setAlertOpen(false) }}>
            <Mui.Alert severity={alertDetail.type} action={
              <Mui.IconButton aria-label="close" color="inherit" size="small" onClick={() => { setAlertOpen(false); }} >
                <Mui.Icons.Close fontSize="inherit" />
              </Mui.IconButton>
            }>
              <Mui.AlertTitle>{alertDetail.title}</Mui.AlertTitle>
              {alertDetail.message}
            </Mui.Alert>
          </Mui.Snackbar>
          <Mui.Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Mui.LockOutlinedIcon />
          </Mui.Avatar>
          <Mui.Typography component="h1" variant="h5">
            Sign in
          </Mui.Typography>
          <Mui.Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Mui.TextField
              margin="normal"
              required
              fullWidth
              variant='filled'
              name="secret"
              label="Secret"
              type="password"
              id="secret"
              autoComplete="current-password"
            />
            {/* no need to handle onClick here because this is a form */}
            <Mui.Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Authorize
            </Mui.Button>
            <Mui.Grid container>
              <Mui.Grid item xs>
                <Mui.Link href="https://www.xiaokang00010.top:4001/xiaokang00010/xclouddrive" variant="body2">
                  {"About"}
                </Mui.Link>
              </Mui.Grid>
            </Mui.Grid>
            <Copyright sx={{ mt: 5 }} />
          </Mui.Box>
        </Mui.Box>
      </Mui.Grid>
    </Mui.Grid>
  );
}