import React from 'react';
import * as Mui from '../Components'
import Markdown from 'react-markdown'
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { darkTheme } from '@uiw/react-json-view/dark';
import theme from '../theme';

function MessageRendered({ message, index }) {
  const [currentTheme, setCurrentTheme] = React.useState(theme.getCurrentThemeMode())
  const [showIntent, setShowIntent] = React.useState(false)

  React.useEffect(() => {
    const handleThemeChange = () => {
      setCurrentTheme(theme.getCurrentThemeMode())
    }
    theme.listenToThemeModeChange(handleThemeChange)
  }, [])

  React.useEffect(() => {
    console.log('rendering message', message)
  }, [message])

  switch (message.role) {
    case 'info': {
      // centered message
      return <Mui.Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 50 }}>
        <Mui.Typography variant='body1' sx={{ color: 'text.secondary' }}>{message.content.response}</Mui.Typography>
      </Mui.Box>
    }
    case 'bot': {
      // left aligned
      return <Mui.Box key={index} sx={{ display: 'flex', justifyContent: 'flex-start', margin: 50 }}>
        {/* use primary color for bot message */}
        <Mui.Paper sx={{ p: 2, mb: 1, mr: 2, bgcolor: 'surfaceContainer.main', width: '80%', padding: 10 }}>
          {message.content_type === 'text' && <Mui.Typography variant='body1'><Markdown>{message.content}</Markdown></Mui.Typography>}
          {message.content_type === 'json' && <>
            <Mui.ListItemButton onClick={() => {
              setShowIntent(!showIntent)
            }}>
              <Mui.ListItemIcon>
                <Mui.Icons.Code />
              </Mui.ListItemIcon>
              <Mui.ListItemText primary={showIntent ? 'Hide intents' : 'Show intents'} />
            </Mui.ListItemButton>
            <Mui.Collapse in={showIntent} timeout="auto" unmountOnExit>
              <Mui.Box sx={{ margin: 10 }}>
                <JsonView value={message.content?.intents} theme={currentTheme === 'dark' ? darkTheme : lightTheme} collapsed={true} />
              </Mui.Box>
            </Mui.Collapse>
            <Mui.Typography variant='body1'><Markdown>{message.content.response}</Markdown></Mui.Typography>
          </>}
          {/* TODO: intents parsed here */}
        </Mui.Paper>
      </Mui.Box>
    }
    case 'user': {
      // right aligned
      return <Mui.Box key={index} sx={{ display: 'flex', justifyContent: 'flex-end', margin: 50 }}>
        <Mui.Paper sx={{ p: 2, mb: 1, ml: 2, bgcolor: 'surfaceContainer.main', width: '80%', padding: 10 }}>
          {message.content_type === 'text' && <Mui.Typography variant='body1'><Markdown>{message.content}</Markdown></Mui.Typography>}
        </Mui.Paper>
      </Mui.Box>
    }
    case 'system': {
      return <Mui.Box key={index} sx={{ display: 'flex', justifyContent: 'flex-end', margin: 50 }}>
        <Mui.Paper sx={{ p: 2, mb: 1, ml: 2, bgcolor: 'surfaceContainer.main', width: '80%', padding: 10 }}>
          {message.content_type === 'text' && <Mui.Typography variant='body1' sx={{width: '100%', overflowX: 'auto'}}><Markdown>{message.content}</Markdown></Mui.Typography>}
          {message.content_type === 'json' && <Mui.Typography variant='body1'>
            <JsonView value={message.content} theme={currentTheme === 'dark' ? darkTheme : lightTheme} collapsed={true} />
          </Mui.Typography>}
        </Mui.Paper>
      </Mui.Box>
    }
    default: {
      // unknown message role
      return <Mui.Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', margin: 50 }}>
        <Mui.Typography variant='body1' sx={{ color: 'text.secondary' }} >{message.content.response}</Mui.Typography>
        {message.content_type === 'json' && <Mui.Typography variant='body1' sx={{width: '100%', overflowX: 'auto'}}>{JSON.stringify(message.content)}</Mui.Typography>}
      </Mui.Box>
    }
  }
}

export default MessageRendered;