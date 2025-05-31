import React from 'react';
import About from './About';
import * as Mui from '../Components'
import Api from '../Api';
import Message from '../components/Message';
import ContentEditDialog from '../components/ContentEditDialog';
import DirectoryView from '../components/DirectoryView';

function Breadcrumb({ path, rootPlaceholder, onClick }) {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    let fragments = path.split('/')
    if (fragments[0] === '') {
      fragments[0] = rootPlaceholder;
    }
    setItems(fragments);
  }, [path, rootPlaceholder]);

  const handleClick = (item, index) => {
    // fish out the selected path
    let selectedPath = items.slice(1, index + 1).join('/');
    if (selectedPath.length && selectedPath[0] !== '/') {
      selectedPath = '/' + selectedPath;
    }
    onClick(selectedPath);
  }

  return <Mui.Breadcrumbs aria-label="breadcrumb">
    {items.map((item, index) => (
      <Mui.Chip key={index} label={item} onClick={() => handleClick(item, index)} />
    ))}
  </Mui.Breadcrumbs>
}

export default function DriveView({ drive }) {
  const [sambaServiceId, setSambaServiceId] = React.useState(null);
  const [path, setPath] = React.useState('');

  // message related
  const [messageTitle, setMessageTitle] = React.useState('')
  const [messageContent, setMessageContent] = React.useState('')
  const [messageType, setMessageType] = React.useState('')
  const [messageOpen, setMessageOpen] = React.useState(false)

  React.useEffect(() => {
    console.log('drive', drive);
    if (drive?.id) {
      console.log('drive.id', drive.id);
      setSambaServiceId(drive.id);
    }
  }, [drive]);

  return <Mui.Box sx={{ height: '100%', width: 'calc(100% - 60px)', marginLeft: 30, paddingRight: 30, overflowY: 'auto' }}>
    <Mui.Box style={{ marginTop: 20, marginBottom: 20 }}>
      <Mui.Typography variant="body1">
        {drive?.description}
      </Mui.Typography>
    </Mui.Box>
    <Breadcrumb path={path} rootPlaceholder={drive?.name} onClick={setPath} />
    <DirectoryView path={path} setPath={setPath} sambaServiceId={sambaServiceId} style={{ width: '100%' }} onErr={(message) => {
      console.log('onErr', message);
      setMessageTitle('Error')
      setMessageContent(message)
      setMessageType('error')
      setMessageOpen(true)
    }} />
    <Message title={messageTitle} message={messageContent} type={messageType} open={messageOpen} dismiss={() => setMessageOpen(false)} />
  </Mui.Box>
}