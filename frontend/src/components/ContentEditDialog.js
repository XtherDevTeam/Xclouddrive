import React from 'react';

import * as Mui from '../Components';
import theme from '../theme';

function ContentEditDialog({ defaultValue, onOk, title, description, icon, secret, hideCurrentValue }) {
  const [value, setValue] = React.useState(defaultValue)
  const [state, setState] = React.useState(false)
  const [currentTheme, setCurrentTheme] = React.useState(theme.getCurrentThemeMode() == 'dark' ? theme.darkTheme : theme.lightTheme)

  theme.listenToThemeModeChange(mode => {
    setCurrentTheme(mode == 'dark' ? theme.darkTheme : theme.lightTheme)
  })

  React.useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return <>
    <Mui.Dialog open={state} onClose={() => setState(false)}>
      <Mui.DialogTitle>Edit</Mui.DialogTitle>
      <Mui.DialogContent sx={{ minWidth: '300px' }}>
        <Mui.Typography variant='body1'>
          {description}
        </Mui.Typography>
        <Mui.TextField type={secret ? 'password' : 'text'} sx={{ marginTop: '1em' }} label={title} value={value} multiline maxRows={6} onChange={(e) => setValue(e.target.value)} variant='outlined' fullWidth></Mui.TextField>
      </Mui.DialogContent>
      <Mui.DialogActions>
        <Mui.Button variant='text' onClick={() => setState(false)}>
          Cancel
        </Mui.Button>
        <Mui.Button variant='text' onClick={() => {
          onOk(value)
          setState(false)
        }}>
          Save
        </Mui.Button>
      </Mui.DialogActions>
    </Mui.Dialog>
    <Mui.ListItemButton onClick={() => setState(true)}>
      <Mui.ListItemIcon>
        {icon}
      </Mui.ListItemIcon>
      {!hideCurrentValue && <Mui.ListItemText primary={title} secondary={defaultValue ? (secret ? '************' : defaultValue) : 'Click to edit'} secondaryTypographyProps={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', maxHeight: '3em' }} />}
    </Mui.ListItemButton>
    {/* <Mui.ListItem sx={{ marginBottom: 10, backgroundColor: currentTheme.palette.surfaceContainerLowest.main }}>
      <Mui.Box sx={{ borderRadius: 10, paddingLeft: 20, paddingTop: 20, width: '100%' }}>
        <Mui.Grid container spacing={1} sx={{ width: '100%' }}>
          <Mui.Grid item xs={12}>
            <Mui.Grid container spacing={2} direction='row' sx={{ alignItems: 'center' }}>
              {icon}
              <Mui.Typography variant='h6' sx={{ flex: 1 }}>
                {title}
              </Mui.Typography>
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Grid container>
              <Mui.Typography variant='body1'>
                {description}
              </Mui.Typography>
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Collapse in={state} timeout='auto' unmountOnExit>
              <Mui.TextField type={secret ? 'password' : 'text'} sx={{ marginTop: '1em' }} label={title} value={value} multiline maxRows={6} onChange={(e) => setValue(e.target.value)} variant='outlined' fullWidth></Mui.TextField>
            </Mui.Collapse>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Grid container spacing={2} direction='row' justify='flex-end' sx={{width: '100%'}}>
              {state && <Mui.Grid item>
                <Mui.Button variant='text' onClick={() => setState(false)}>
                  Cancel
                </Mui.Button>
                <Mui.Button variant='contained' onClick={() => {
                  onOk(value)
                  setState(false)
                }}>
                  Save
                </Mui.Button>
              </Mui.Grid>}
              {!state && <Mui.Grid item>
                <Mui.Button variant='text' onClick={() => setState(true)}>
                  Edit
                </Mui.Button>
              </Mui.Grid>}
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Box>
    </Mui.ListItem> */}
    </>
}

export default ContentEditDialog