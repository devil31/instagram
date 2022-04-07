import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { fetchPost } from '../store/actions/Post'
import Post from '../components/Post'


function SinglePost() {

  const {id} = useParams()
  const postData = useSelector(state=>state.Post.fetchData)


  const dispatch = useDispatch()
  useEffect(()=>{
     dispatch(fetchPost())
     
  },[])


  const filter = postData.filter(function(e){
    return e.key === id
  })


  const renderPost = ()=>{
   return(
     filter.map((i)=>{
       return (
         <div style={{display:'flex',justifyContent:'center'}}>
         
                    <Post key={i.postId} username={i.username} fullDate={i.date} loadImg={i.loadImg}/>

         </div>
       )
     })
   )
  }
  
  
  return (
    <div>
    <Header/>
    <div style={{marginTop:'100px'}}>
           {renderPost()}
    </div>
 
    </div>
  )
}

export default SinglePost