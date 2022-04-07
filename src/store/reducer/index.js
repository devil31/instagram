import { combineReducers } from "redux"
import Post from '../reducer/Post'
import Auth from '../reducer/Auth'
import Options from '../reducer/Options'

 const rootReducer = combineReducers({
  Post,
  Auth,
  Options,
})

export default rootReducer;