import { GLOBAL_TYPES } from './../types/globalTypes.js'

const socketReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.SOCKET:
      return action.payload
    default:
      return state
  }
}

export default socketReducer