import React, { useEffect } from 'react'
import '../css/Box.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector,  } from 'react-redux'
import {updateUserData} from '../store/actions/Options'

function Box() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [numb, setNumb] = useState('')
    const [filter,setFilter] = useState([])
    const [loadImg, setLoadImg] = useState(false)
    const [selectedOption, setSelectedOption] = useState('uomo');
    const myUserData = JSON.parse(localStorage.getItem('userData'))
    const data = useSelector(state=>state.Auth.userData)
    const myUserKey = myUserData.userKey 
    
 

 useEffect(()=>{
setFilter(data.find(e=>e.userId == myUserData.userId))

 })
  
    
    const dispatch = useDispatch()

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = async () => {
          if (reader.readyState === 2) {
            await setLoadImg(reader.result)

          }
        }
        reader.readAsDataURL(e.target.files[0])
      }
 
     
    const handleData = async() => {
      await  dispatch(updateUserData(name,email,numb,selectedOption,myUserKey))
     
     
    }
    return (
        <div className='ContainerBox'>
            <div className='Box_left'>
                <Link to={'/accounts/edit'}>Modifica Profilo</Link>
                <Link to={'/accounts/change'}>Modifica Password</Link>

            </div>
            <div className='Box_right'>

                <div style={{ display: 'flex', width: '100%', height: '100px', alignItems: 'center', justifyContent: 'center' }}>

                    <span className='BoxR_avatar' style={{backgroundImage:`url(${loadImg})`,backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}></span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                       {/* // <span>{filter.username}</span> */}
                        <label htmlFor='file-upload'>Cambia immagine profilo</label>
                        <input style={{ display: 'none' }} id='file-upload' type={'file'} onChange={imageHandler} ></input>
                    </div>

                    
                </div>

                <div className='BoxR_form'>
<form>
     <div>
                        <div>Nome</div>
                        <input required type={'text'} value={name} placeholder='Nome' onChange={(e) => setName(e.target.value)} />
                         
                    </div>
                    <div>
                        <div>E-mail</div>
                        <input required type={'text'} value={email} placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <div>Numero di telefono</div>
                        <input required type={'number'} value={numb} placeholder="Numero di telefono" onChange={(e) => setNumb(e.target.value)} />
                    </div>
                    <div>
                        <div>Genere</div>
                        <select onChange={(e) => {
                            const selectedMan = e.target.value;
                            setSelectedOption(selectedMan)
                        }}>
                            <option >uomo</option>
                            <option >donna</option>
                        </select>
                    </div>
                    <button type='submit' onClick={() => handleData()}>invia</button>
</form>
                   
                    


                    

                </div>

            </div>



        </div>
    )
}

export default Box