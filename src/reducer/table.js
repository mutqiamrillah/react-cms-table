import { GET_TABLE } from "../constants"
  const initialState = []
  
  function tableReducer(state = initialState, action) {
    switch (action.type) {
      case GET_TABLE:
        return action.payload.map((x) => ({
          ...x
        }))
    
      default:
        return state
    }
  }
  
  export default tableReducer
  