
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Post from './pages/Post';
import Home from './pages/Home'
import Login from './pages/Login';
import LogOut from './pages/Logout';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import MyPost from './pages/MyPost';
import User from './pages/User';
import Edit from './pages/Edit';



function App() {
  const [token, setToken] = useState([])
  const data = useSelector(state => state.Auth)
  const localToken = JSON.parse(localStorage.getItem('userData'))


  useEffect(() => {
    setToken(data.token)
  }, [data])




  return (
    <div  >
      {
        token || localToken ?
          <Routes>
            <Route path='/' element={<Home />} />            
            <Route path='/profile' element={<Profile />} >
              <Route path='saved' element={<Saved />} />  
              <Route path='post' element={<MyPost/>}/>
                          
            </Route>
            <Route path='/logout' element={<LogOut />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='user/:username' element={<User/>}/>
            <Route path='accounts/edit' element={<Edit/>}/>
          </Routes>
          :
          <Routes>
            <Route path='/' element={<Login />} />
          </Routes>

      }
    </div>


  );
}

export default App;
