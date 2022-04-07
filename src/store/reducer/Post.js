import * as actionTypes from '../actions/Post'

const initialState = {
    data: [],
    fetchData: [],
    commentPost:[],
    SavedPost:[],
    
    removePost:[],
}

const Post = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_POST:
            return {
                ...state,
                data: action.data,
            }
            case actionTypes.FETCH_POST:
            return{
                ...state,
                fetchData:action.fetchData,
            }   
            case actionTypes.POST_COMMENT:
                return{
                    ...state,
                    commentPost:action.commentPost,
                } 
                 case actionTypes.SAVE_POST:
                     return{
                         ...state,
                         SavedPost:action.SavedPost,
                     }  
                    
                     case actionTypes.DELETE_POST:
                         return{
                             ...state,
                             removePost:action.removePost,
                         }


        default:
            return state
    }

}


export default Post;