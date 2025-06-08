import React from 'react';
import * as Mui from '../Components'

function About({ onClose }) {
  return <Mui.Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', flexDirection: 'column' }}>
    <Mui.Box><Mui.Avatar style={{ width: 100, height: 100 }} src={require('../assets/new.png')}></Mui.Avatar></Mui.Box>
    <Mui.Typography variant="h5" style={{ marginTop: 20 }}>
      Xclouddrive
    </Mui.Typography>
    <Mui.Typography variant="body1" style={{ marginTop: 10, textAlign: 'center' }}>
      Version 1.0.0 (1)
    </Mui.Typography>
    <Mui.Typography variant="body1" style={{ marginTop: 10, textAlign: 'center' }}>
      All-in-one web file storage management system for multiple samba servers.
    </Mui.Typography>
    <Mui.Typography variant="body2" style={{ marginTop: 10, textAlign: 'center' }}>
      Made with love by Jerry Chou, and Naganohara Yoimiya
    </Mui.Typography>
    <Mui.Button variant="text" color="primary" style={{ marginTop: 20 }} onClick={onClose} startIcon={<Mui.Icons.ArrowBack />}>
      Back
    </Mui.Button>
  </Mui.Box>
}

export default About