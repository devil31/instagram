import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Logout } from '../store/actions/Auth'

function LogOut() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  useEffect(() => {
    dispatch(Logout())
    localStorage.removeItem('userData')
    return navigate("/")
  })
  return <div>Logout</div>;
}

export default LogOut;
