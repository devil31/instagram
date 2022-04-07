import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, Route, Routes, } from 'react-router-dom';
import Header from '../components/Header'
import { fetchPost } from '../store/actions/Post';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../store/actions/Auth';
import '../css/Saved.css'
import { Spinner } from 'react-bootstrap';



function Saved() {

  const [k, setK] = useState([])
  const [loading, setLoading] = useState(false)
  const userData = useSelector(state=>state.Auth.userData)
  const myUserKey = JSON.parse(localStorage.getItem('userData'))
  const dispatch = useDispatch()

  const filter = userData.find(e=>e.userId==myUserKey.userId)
  const mykey = filter.key;

  const RenderSaved = ({ postId, loadImg }) => {
    return (
      <Link to={`/post/${postId}`}>
        <div style={{ width: '200px', height: '250px', border: '1px solid black', backgroundImage: `url(${loadImg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPositionX: '50%, 50%', margin: '5px' }} >


        </div>
      </Link>

    )
  }
  useEffect(async () => {
    setLoading(true)
    dispatch(fetchPost())
    dispatch(getUserData())

    const responce = await axios.get(`https://inst-89c78-default-rtdb.firebaseio.com/users/${mykey}/saved.json`)
    const list = [];    
    for (let key in responce.data) {
      console.log(responce)
      list.push({
        postId: responce.data[key].postId,
        username: responce.data[key].username,
        fullDate: responce.data[key].fullDate,
        loadImg: responce.data[key].loadImg,

      })
    }
    const map = list.map(i => <RenderSaved key={i.postId} fullDate={i.fullDate} loadImg={i.loadImg} postId={i.postId} />)
    setK(map)
    setLoading(false)

  }, [])

  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
      <span style={{ borderTop: '1px solid black', marginTop: '-39px', width: '200px' }}></span>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
        {loading == true ? <Spinner animation='border' /> : k}

      </div>

    </div>
  )
}

export default Saved