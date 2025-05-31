import React from 'react';
import About from './About';
import * as Mui from '../Components'
import Api from '../Api';
import Message from '../components/Message';
import ContentEditDialog from '../components/ContentEditDialog';

function More() {
  const [messageTitle, setMessageTitle] = React.useState('')
  const [messageContent, setMessageContent] = React.useState('')
  const [messageType, setMessageType] = React.useState('success')
  const [messageOpen, setMessageOpen] = React.useState(false)
  const [showAboutPage, setShowAboutPage] = React.useState(false)

  const [secret, setSecret] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')


  function handleServiceInfoRefresh() {
    Api.getStatus().then(r => {
      console.log(r)
      if (r.status) {
        console.log('Service info refreshed successfully')
        Api.getConfig('title').then(r => {
          if (r.status) {
            setTitle(r.data)
          }
        })
        Api.getConfig('secret').then(r => {
          if (r.status) {
            setSecret(r.data)
          }
        })
        Api.getConfig('description').then(r => {
          if (r.status) {
            setDescription(r.data)
          }
        })
      } else {
        setMessageTitle('Error')
        setMessageContent(r.data.data)
        setMessageType('error')
        setMessageOpen(true)
      }
    })
  }


  React.useEffect(() => {
    handleServiceInfoRefresh()
  }, [])


  return <>{!showAboutPage && <Mui.Box sx={{ height: '100%', width: 'calc(100% - 30px)', marginLeft: 30, paddingRight: 30 }}>
    <Message title={messageTitle} message={messageContent} type={messageType} open={messageOpen} dismiss={() => setMessageOpen(false)} />
    <Mui.Box data-overlayscrollbars-initialize sx={{ height: '100%', overflowY: 'scroll' }}>
      <Mui.List style={{ marginTop: 30 }}>
        <ContentEditDialog title="Secret" description={'Edit secret to access the service'} defaultValue={secret} onOk={(value) => {
          setSecret(value)
        }} icon={<Mui.Icons.VpnKey />} secret={true} />
        <ContentEditDialog title="Title" description={'Title for your Xclouddrive instance'} defaultValue={title} onOk={(value) => {
          setTitle(value)
          Api.setConfig('title', value).then(r => {
            console.log(r)
            if (r.status) {
              setMessageContent(`Updated Title suceessfully`)
              setMessageType('success')
              setMessageOpen(true)
              setMessageTitle('Success')
            } else {
              setMessageTitle('Error')
              setMessageContent(r.data.data)
              setMessageType('error')
              setMessageOpen(true)
            }
          })
        }} icon={<Mui.Icons.Title />} />
        <ContentEditDialog title="Description" description={'Description for your Xclouddrive instance'} defaultValue={description} onOk={(value) => {
          setDescription(value)
          Api.setConfig('description', value).then(r => {
            console.log(r)
            if (r.status) {
              setMessageContent(`Updated Description suceessfully`)
              setMessageType('success')
              setMessageOpen(true)
              setMessageTitle('Success')
            } else {
              setMessageTitle('Error')
              setMessageContent(r.data.data)
              setMessageType('error')
              setMessageOpen(true)
            }
          })
        }} icon={<Mui.Icons.Search />}/>
        <Mui.ListItemButton onClick={() => {
          setShowAboutPage(true)
        }}>
          <Mui.ListItemIcon><Mui.Icons.Info /></Mui.ListItemIcon>
          <Mui.ListItemText primary="About" secondary="Xclouddrive 1.0.0(1)" />
        </Mui.ListItemButton>
      </Mui.List>
    </Mui.Box>
  </Mui.Box>}
    {showAboutPage && <Mui.Box sx={{ height: '100%', width: 'calc(100% - 30px)' }}>
      <About onClose={() => setShowAboutPage(false)} />

    </Mui.Box>}
  </>;
}

export default More;