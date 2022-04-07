import axios from "axios";
export const GET_USERDATA = 'GET_USERDATA';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const LOGOUT = 'LOGOUT';


const key = 'AIzaSyBuwrOSNa52HVfetAip69mG5VcoYAQec6U'

export const signIn = (email, password,) => {
    return async dispatch => {

        try {
            const data = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`, {
                email,
                password,
                returnSecureToken: true,
            })

            const userData = await axios.get("https://inst-89c78-default-rtdb.firebaseio.com/users.json")
            const userDataList = [];
            for (let key in userData.data) {
                userDataList.push({
                    email: userData.data[key].email,
                    username: userData.data[key].username,
                    userId: userData.data[key].userId,
                    key
                })
            }
            const find = userDataList.filter(function (e) {
                return e.email === email;
            })

            const Name = find.find(e => e.username)
            const userKey = find.find(e => key)




            saveData(data.data.idToken, data.data.localId, Name.username, userKey.key)
            dispatch({
                type: SIGN_IN,
                token: data.data.idToken,
                userId: data.data.localId,
                username: Name.username

            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const signUp = (email, password, username, userKey) => {
    console.log(email)
    return async dispatch => {
        try {
            const data = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`, {
                email,
                password,
                returnSecureToken: true,
            })
            const personalData = await axios.post('https://inst-89c78-default-rtdb.firebaseio.com/users/.json', {
                username,
                email,
                userId: data.data.localId,
                password,
            })
            saveData(data.data.idToken, data.data.localId, username)
            dispatch({
                type: SIGN_UP,
                token: data.data.idToken,
                userId: data.data.localId,
                username
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getUserData = () => {
    return async dispatch => {
        const userData = await axios.get("https://inst-89c78-default-rtdb.firebaseio.com/users.json")
      
        const userDataList = [];
        
        for (let key in userData.data) {
            userDataList.push({
                email: userData.data[key].email,
                username: userData.data[key].username,
                userId: userData.data[key].userId,
                key
            })

        }
 
        dispatch({
            type: GET_USERDATA,
            userData: userDataList
        })
    }
}




export const Logout = () => {
    return {
        type: LOGOUT,
    }
}


const saveData = (token, userId, username, userKey) => {
    localStorage.setItem('userData', JSON.stringify({ token, userId, username, userKey }))
}