import { useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GLOBAL_TYPES } from '../../redux/types/globalTypes.js'
import { postDataAPI } from '../../utils/fetchData.js'
import HeadInfo from '../../utils/HeadInfo.js'

const ActivateAccount = () => {
  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const activateUserAccount = useCallback(async () => {
    try {
      const res = await postDataAPI('auth/activate', { token: id })
      await dispatch({ type: GLOBAL_TYPES.ALERT, payload: {success: res.data.msg} })
      navigate('/')
    } catch (err) {
      await dispatch({ type: GLOBAL_TYPES.ALERT, payload: {errors: err.response.data.msg} })
      navigate('/')
    }
  }, [id, dispatch, navigate])

  useEffect(() => {
    activateUserAccount()
  }, [activateUserAccount])

  return (
    <>
      <HeadInfo title='WeChat - Account Activation' />
      <div></div>
    </>
  )
}

export default ActivateAccount