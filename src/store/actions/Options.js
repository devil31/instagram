import axios from "axios";
export const UPDATE_USERDATA = 'UPDATE_USERDATA';


export const updateUserData = (name, email, numb, selectedOption, myUserKey, loadImg) => {
    return async dispatch => {
        
        const result = await axios.patch(`https://inst-89c78-default-rtdb.firebaseio.com/users/${myUserKey}/.json`, {
            email: email,
            username: name,
            numb: numb,
            gender: selectedOption,
            profileImg: loadImg,
        })
        
        dispatch({
            type: UPDATE_USERDATA,
            updated: result,
        })
    }
}