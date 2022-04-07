import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from '../components/Header'
import '../css/Saved.css'

function Profile() {
  return (
    <div className='Saved__Container'>
      <Header />
      <div className='Saved__Setup'>
        <div className="Saved__Avatar">
        </div>
        <div className="Saved__Profile">
          <p>devil311</p>
          <button>Modifica Profilo</button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }} >

        <div style={{ padding:'10px', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
          <Link style={{ textDecoration: 'none', fontSize: 12, color: 'grey' }} to={'post'}>POST</Link>
          <Link  style={{ textDecoration: 'none', fontSize: 12, color: 'grey' }} to={'saved'}>ELEMENTO SALVATO</Link>
          <Link style={{ textDecoration: 'none', fontSize: 12, color: 'grey' }} to={'saved'}>POST IN CUI TI HANNO TAGGATO</Link>



        </div>

        <Outlet />

      </div>
    </div>
  )
}

export default Profile