import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBAL_TYPES } from './redux/types/globalTypes.js'
import { refreshToken } from './redux/actions/authActions.js'
import io from 'socket.io-client'
import Dashboard from './pages/dashboard.js'
import Login from './pages/login.js'
import PageRender from './utils/PageRender.js'
import ResetPassword from './pages/reset/resetLinkPage.js'
import ActivateAccount from './pages/activate/activeUserLink.js'
import Alert from './components/general/Alert.js'
import SocketClient from './SocketClient'
import CallModal from './components/modal/CallModal.js'
import Peer from 'peerjs'

const App = () => {
  const  auth  = useSelector(state => state.auth);
  const call  = useSelector(state => state.call);
  const dispatch = useDispatch();
  console.log(auth.token);
  useEffect(() => {
    if (!("Notification" in window)) {
      alert('This browser does not support desktop notification')
    }
    else if (Notification.permission === 'granted') {}
    else if (Notification.permission === 'denied') {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {}
      })
    }
  }, [])

  useEffect(() => {
    dispatch(refreshToken())
    const socket = io("https://chat-webapplication.onrender.com");
    dispatch({ type: GLOBAL_TYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch])

  useEffect(() => {
    const peer = new Peer(undefined, {
      path: '/', secure: true
    })
   console.log(peer);
    dispatch({ type: GLOBAL_TYPES.PEER, payload: peer })
  }, [dispatch])

  return (
    <Router>
      <Alert />
      { auth.token && <SocketClient /> }
      { call && <CallModal /> }
      <Routes>
        <Route path='/' element={auth.user ? <Dashboard /> : <Login />} />
        <Route path='/reset/:id' element={<ResetPassword />} />
        <Route path='/activate/:id' element={<ActivateAccount />} />
        <Route path='/:page' element={<PageRender />} />
        <Route path='/:page/:id' element={<PageRender />} />
      </Routes>
    </Router>
  )
}

export default App