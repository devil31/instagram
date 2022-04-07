import * as actionTypes from '../actions/Auth'


const initialState = {
    userData: [],
    token: null,
    username: null,
    userId: null,

}

const Auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USERDATA:
            return {
                ...state,
                userData: action.userData,
            }
        case actionTypes.SIGN_IN:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                username: action.username,
            }
        case actionTypes.SIGN_UP:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                username: action.username,
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null
            }


        default:
            return state;
    }
}
export default Auth