import { GLOBAL_TYPES } from './../types/globalTypes.js'

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.AUTH:
      return action.payload
    default:
      return state
  }
}

export default authReducer