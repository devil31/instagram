

import axios from "axios";


export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const POST_COMMENT = 'POST_COMMENT';
export const POST_LIKE = "POST_LIKE";
export const SAVE_POST = 'SAVE_POST';
export const DELETE_POST = 'DELETE_POST';


export const createPost = (txtArea, loc, userId, username, loadImg, date, like) => {
    return async dispatch => {

        const result = await axios.post('https://inst-89c78-default-rtdb.firebaseio.com/post.json', {
            text: txtArea,
            loc,
            userId,
            username,
            loadImg,
            date,
            like: { users: '' },


        })
        console.log(result)
        dispatch({
            type: CREATE_POST,
            data: result

        })
    }

}

export const fetchPost = () => {
    return async dispatch => {

        try {

            const Data = await axios.get('https://inst-89c78-default-rtdb.firebaseio.com/post.json')
            const allData = Data.data;

            const DataList = []
            for (let key in allData) {
                DataList.push({
                    text: allData[key].text,
                    loc: allData[key].loc,
                    userId: allData[key].userId,
                    username: allData[key].username,
                    loadImg: allData[key].loadImg,
                    comments: allData[key].comments,
                    date: allData[key].date,
                    like: allData[key].like,
                    key,
                })
                dispatch({
                    type: FETCH_POST,
                    fetchData: DataList,
                })
            }



        } catch (error) {
            console.log(error)
        }


    }

}

export const postComment = (postId, username, inputComment, date) => {
    console.log(postId, username)
    return async dispatch => {
        try {
            const result = await axios.post(`https://inst-89c78-default-rtdb.firebaseio.com/post/${postId}/comments.json`, {
                username,
                inputComment,
                date,
            })
            dispatch({
                type: CREATE_POST,
                commentPost: result
            })
        } catch (error) {
            console.log(error)
        }

    }
}

export const savePost = (UserKey, postId, username, loadImg, comments, fullDate, text) => {
    console.log(UserKey)
    return async dispatch => {
        const responce = await axios.post(`https://inst-89c78-default-rtdb.firebaseio.com/users/${UserKey}/saved/.json`, {
            postId,
            username,
            loadImg,
            fullDate,
            comments,
            text
        })
        dispatch({
            type: SAVE_POST,
            SavedPost: responce
        })
    }
}

export const postLike = (postKey, username) => {
    return async dispatch => {
        try {
            const result = await axios.post(`https://inst-89c78-default-rtdb.firebaseio.com/post/${postKey}/like/users.json`, {
                username,

            })

            dispatch({
                type: POST_LIKE,
                postLike: result
            })
        } catch (error) {
            console.log(error)
        }

    }
}



export const removePost = (postId, userKey) => {
    return async dispatch => {
        console.log('cancellato', userKey)
        const result = await axios.delete(`https://inst-89c78-default-rtdb.firebaseio.com/post/${postId}.json`)
        const removeSaved = await axios.get(`https://inst-89c78-default-rtdb.firebaseio.com/users/${userKey}/.json`)
        const data = removeSaved.data

        const list = [];
        for (let key in data.saved) {
            list.push({
                comments: data.saved[key].comments,
                postId: data.saved[key].postId,
                key
            })
        }

        const find = list.filter(function (e) {
            return e.postId === postId
        })
     const a = find.map(i=>i.key)

        if(a){
            console.log(a[0])
             
                   await axios.delete(`https://inst-89c78-default-rtdb.firebaseio.com/users/${userKey}/saved/${a[0]}.json`)
  
        }
          
        
       await dispatch({
            type: DELETE_POST,
            removePost: result
        })
    }



}