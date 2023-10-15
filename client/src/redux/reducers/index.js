import { combineReducers } from 'redux'
import auth from './authReducer.js'
import alert from './alertReducer.js'
import conversation from './conversationReducer.js'
import message from './messageReducer.js'
import socket from './socketReducer.js'
import typing from './typeReducer.js'
import status from './statusReducer.js'
import call from './callReducer.js'
import peer from './peerReducer.js'

export default combineReducers({
  auth,
  alert,
  conversation,
  message,
  socket,
  typing,
  status,
  call,
  peer
})