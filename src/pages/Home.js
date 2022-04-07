import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Post from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../store/actions/Post';
import { getUserData } from '../store/actions/Auth'


function Home() {
   const postData = useSelector(state=>state.Post.fetchData)
 

  const dispatch = useDispatch();
  useEffect(async() => {
   await dispatch(fetchPost())
    dispatch(getUserData())
  }, [])


 const render = postData.map(i=><Post postData={postData} text={i.text} loc={i.loc} key={i.key} username={i.username} loadImg={i.loadImg} postId={i.key} comments={i.comments} fullDate={i.date}/>)




  return (
    <div style={{ marginTop: '200px', display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
      <Header />      
     {render}
    </div>
  );

}

export default Home;
