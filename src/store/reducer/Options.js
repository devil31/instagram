import * as actionTypes from '../actions/Options'


const initialState = {
   updated:[]
}
const Options = (state= initialState,action)=>{
  switch (action.type) {
      case actionTypes.UPDATE_USERDATA:
          return{
              ...state,
              updated: action.updated
          }
         
  
      default:
         return state;
  }
}

export default Options