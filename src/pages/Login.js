import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUserData, signIn,signUp } from '../store/actions/Auth';
import '../css/Auth.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const [isSignup, setIsSignup] = useState(false)
   

    const dispatch = useDispatch()


  



    const inputEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
    }
    const inputPassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const inputuserName = (e) => {
        e.preventDefault()
        setUserName(e.target.value)
    }

    const login = async (e) => {
        e.preventDefault();
        setEmail('');
        setPassword('');
        setUserName('');
        dispatch(getUserData())
        dispatch(signIn(email, password))

    }
    const createUser = () => {
        setEmail('');
        setPassword('')
        setUserName('');
        dispatch(signUp(email, password, username,))
    }
    const change = () => {
        setIsSignup(!isSignup)
    }
    return (
        <div className='Auth__container'>
            <div className='Auth__formContainer'>
                <div>
                    <p>Instagram</p>
                </div>
                <input className='input' value={email} type={'text'} placeholder='inserisci Email ' onChange={inputEmail}></input>
                <input className='input' value={password} type={'password'} placeholder='Password' onChange={inputPassword}></input>
                {isSignup ? <input className='input' value={username} placeholder='User Name' onChange={inputuserName}></input> : ''}
                {<button className='btn' onClick={isSignup ? createUser : login} >{isSignup ? `Sign Up` : `Login`}</button>}
            </div>
            <div className='parag'>
                {isSignup ? <p>hai gia un account? effettua il <a href='#' onClick={change}>Login</a></p> : <p>non sei ancora registrato? effettua il <a href='#' onClick={change}>SignUp</a></p>}
            </div>
        </div>
    );
}

export default Login;
