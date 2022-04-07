import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsHeart, BsEmojiSmile } from 'react-icons/bs';
import { IoPaperPlaneOutline, IoBookmarkOutline, IoChatbubbleOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux';
import { postComment, removePost, savePost } from '../store/actions/Post';
import ModalComment from './ModalComment';
import ModalOptions from './ModalOptions';
import '../css/Post.css'
import { useSelector } from 'react-redux';
import { getUserData } from '../store/actions/Auth'

const Post = ({ username, loadImg, postId, fullDate, comments, text }) => {
  const [inputComment, setInputComment] = useState('')
  const [UserKey, setUserKey] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [modalShowOptions, setModalShowOptions] = useState(false);
  const [loading, setLoading] = useState(false)
  const [savedItem, setSavedItem] = useState([])
  const [colorSave, setColorSave] = useState(false)
  const [myUsername, setMyUserName] = useState([])
  const myId = JSON.parse(localStorage.getItem('userData')).userId
  const date = new Date().getTime();
  const dispatch = useDispatch()
  const userData = useSelector(state => state.Auth.userData)

  const filter = userData.find(e => e.userId == myId)


  useEffect(async () => {
    fetchSaved()
    dispatch(getUserData())
    setMyUserName(filter.username)
    setUserKey(filter.key)

  }, [userData])






  const fetchSaved = async () => {
    const result = await axios.get(`https://inst-89c78-default-rtdb.firebaseio.com/users/${UserKey}/saved.json`)
    const savedList = [];
    for (let key in result.data) {
      savedList.push({
        postId: result.data[key].postId,
        key
      })
    }

    setSavedItem(savedList)
  }





  const m = new Array(12)
  m[0] = 'DICEMBRE';
  m[1] = 'GENNAIO';
  m[2] = 'FEBBRAIO';
  m[3] = 'MARZO';
  m[4] = 'APRILE';
  m[5] = 'MAGGIO';
  m[6] = 'GIUGNO';
  m[7] = 'LUGLIO';
  m[8] = 'AGOSTO';
  m[9] = 'SETTEMBRE';
  m[10] = 'OTTOBRE';
  m[11] = 'NOVEMBRE';



  const listComments = [];
  for (let key in comments) {
    listComments.push({
      date: comments[key].date,
      inputComment: comments[key].inputComment,
      username: comments[key].username,
      key
    })
  }

  const renderComments = listComments.map((i) => {
    const time = (Math.floor((new Date().getTime() - i.date) / 60000))
    let Time = ''
    if (time < 60) {
      Time = `${(time).toFixed(0)} min`
    }
    if (time > 59) {
      Time = `${(time / 60).toFixed(0)} ${date > 89 ? 'ore' : 'ora'}`
    }
    if (time > 1440) {
      Time = `${(time / 1440).toFixed(0)} giorn`
    }
    if (time > 8640) {
      Time = `${(time / 8640).toFixed(0)} sett`
    }
    return (
      <div key={i.key} className='post_renderComments'>

        <p> <strong>{i.username}</strong> {i.inputComment}</p>


        <div className='renderComment_Time'>
          {Time}
        </div>
      </div>
    )
  })


  const sendComment = (e) => {
    e.preventDefault()
    setInputComment(e.target.value)
  }
  const comment = () => {
    dispatch(postComment(postId, myUsername, inputComment, date))
    console.log(postId)
    setInputComment('')
  }



  const save = async () => {
    const filterId = savedItem.filter(e => e.postId === postId)
    console.log('filter', filterId)
    const find = savedItem.find(e => e.postId)
    console.log('find', filterId)
    find ?
      await axios.delete(`https://inst-89c78-default-rtdb.firebaseio.com/users/${myId}/saved/${filterId[0].key}.json`)
      :
      await dispatch(savePost(UserKey, postId, username, loadImg, postId, fullDate, comments, text))

    return window.location.reload(false)
  }


  const optionPost = () => {
    username === myUsername ? setModalShowOptions(true) : console.log('no')
  }


  const deletePost = async () => {
    setLoading(true)
    await dispatch(removePost(postId, UserKey))
    setModalShowOptions(false)
    await window.location.reload(false);
    setLoading(false)

  }

  return (
    <div className='post_container'>
      <div className="postHeader">
        <div>
          {username}

        </div>
        <div>
          <p onClick={optionPost} style={{ cursor: 'pointer', fontSize: '25px' }} >...</p>
        </div>

      </div>

      <div className="postImage">
        <img width={'100%'} height={'200px'} src={`${loadImg}`} />
      </div>

      <div className='postIcon'>
        <div>
          <BsHeart size={'25px'} />
          <IoChatbubbleOutline size={'25px'} />
          <IoPaperPlaneOutline size={'25px'} />
        </div>
        <div className="postIconSave">
          <IoBookmarkOutline onClick={save} size={'25px'} color={savedItem.find(e => e.postId == postId) ? 'green' : 'black'} />
        </div>
      </div>

      <div className="post_like">
        like
      </div>
      <div className='post_text'>
        <strong>{username}</strong> {text}
      </div>
      <div className="post_listComments">
        <span onClick={() => setModalShow(true)}> Mostra tutti e {renderComments.length} i commenti</span>

      </div>
      <div className="post_date">
        {fullDate.day} {m[fullDate.Month]} {fullDate.Year}
      </div>
      <div className="addComments">
        <BsEmojiSmile size={25} style={{ cursor: 'pointer' }} />
        <input placeholder='Aggiungi un commento...' onChange={sendComment} value={inputComment} />
        <div>
          <button onClick={comment}>Pubblica</button>
        </div>

      </div>
      <ModalComment
        show={modalShow}
        onHide={() => setModalShow(false)}
        rendercomments={renderComments}
        loadimg={loadImg}
        username={username}
        myusername={myUsername}
        postid={postId}
        date={date}
        fulldate={fullDate}
        m={m}
        save={save}

      />

      <ModalOptions
        show={modalShowOptions}
        onHide={() => setModalShowOptions(false)}
        deletePost={deletePost}
        spinner={loading}
      />

    </div>
  )
}
export default Post;
