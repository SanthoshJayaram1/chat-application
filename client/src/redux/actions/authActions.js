import { GLOBAL_TYPES } from './../types/globalTypes.js'
import { patchDataAPI, postDataAPI } from './../../utils/fetchData.js'
import { checkTokenValidity } from './../../utils/checkTokenValidity.js'
import { uploadImage } from './../../utils/imageHelper.js'

export const register = userData => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/register', userData)
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const login = (userData, socket) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })
    console.log(userData)
    const res = await postDataAPI('auth/login', userData);
   
    localStorage.setItem('inspace_authenticated', true);
    console.log(res);

    // const skt=await new Promise((resolve, reject) => {
    //     socket.connect((error) => {
    //       if (error) {
    //         reject(error);
    //       } else {
    //         resolve();
    //       }
    //     });
    //   });
    //   console.log(skt);

    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
      }
    })

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })

    // socket.emit('joinUser', res.data.user)
     
    //  socket.connect("http://localhost:3001",{port:3000});
    // socket.connect("http://localhost:3001");
     console.log(socket);
    // const skt=await new Promise((resolve, reject) => {
    //   socket.connect((error) => {
    //     if (error) {
    //       reject(error);
    //     } else {
    //       resolve();
    //     }
    //   });
    // });
    // console.log(skt);

  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const refreshToken = () => async(dispatch) => {
  try {
    const isAuthenticated = localStorage.getItem('inspace_authenticated')
    if (isAuthenticated) {
      const res = await postDataAPI('auth/refresh_token')
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: {
          user: res.data.user,
          token: res.data.accessToken
        }
      })
    }
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const logout = (token, socket) => async(dispatch) => {
  const tokenValidityResult = await checkTokenValidity(token, dispatch)
  const accessToken = tokenValidityResult ? tokenValidityResult : token

  try {
    const res = await postDataAPI('auth/logout', {}, accessToken)
    localStorage.removeItem('inspace_authenticated')

    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {}
    })

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })

    socket.disconnect()
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const forgetPassword = (email) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/forget_password', {email})
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const resetPassword = (token, password) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })
    
    const res = await postDataAPI('auth/reset_password', {token, password})
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const googleLogin = (id_token, socket) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/google_login', {id_token})
    localStorage.setItem('inspace_authenticated', true)

    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
      }
    })

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })

    // socket.emit('joinUser', res.data.user)
    socket.connect()
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const facebookLogin = (accessToken, userID, socket) => async(dispatch) => {
  try {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/facebook_login', {accessToken, userID})
    localStorage.setItem('inspace_authenticated', true)

    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
      }
    })

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })

    // socket.emit('joinUser', res.data.user)
    socket.connect()
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const changePassword = (passwordData, token) => async(dispatch) => {
  const tokenValidityResult = await checkTokenValidity(token, dispatch)
  const accessToken = tokenValidityResult ? tokenValidityResult : token

  try {
    const res = await patchDataAPI('auth/change_password', passwordData, accessToken)
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const editProfile = (userData, avatar, auth) => async(dispatch) => {
  const tokenValidityResult = await checkTokenValidity(auth.token, dispatch)
  const accessToken = tokenValidityResult ? tokenValidityResult : auth.token

  try {
    let imgLink = ''
    if (avatar) {
      imgLink = await uploadImage([avatar], 'avatar')
    }
    
    const newData = {
      ...userData,
      avatar: avatar ? imgLink[0] : ''
    }

    const res = await patchDataAPI('auth/edit_profile', newData, accessToken)
    dispatch({
      type: GLOBAL_TYPES.AUTH,
      payload: {
        user: {
          ...auth.user,
          avatar: res.data.user.avatar,
          name: res.data.user.name,
          userId: res.data.user.userId
        },
        token: accessToken
      }
    })

    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}