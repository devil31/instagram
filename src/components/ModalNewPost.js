import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/actions/Post';


function ModalNewPost({ open, close, username, userId }) {
    const [loadImg, setLoadImg] = useState(false)
    const [txtArea, setTxtArea] = useState('')
    const [loc, setLoc] = useState('')
    const dispatch = useDispatch();
    if (!open) return null


    const handlerTxtArea = (e) => {
        setTxtArea(e.target.value)
    }

    const handlerInput = (e) => {
        setLoc(e.target.value)
    }
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = async () => {
            if (reader.readyState === 2) {
                await setLoadImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const share = async () => {
        setLoc('')
        setTxtArea('')
  dispatch(createPost(txtArea, loc, loadImg, ))
       
    }

    return (
        <div style={modalContainer} >
            <div style={closeBtn} onClick={close}>x</div>
            <div style={mainCointainer} >
                <div style={modalTitle}>
                    Crea un nuovo post

                </div>
                {loadImg ?
                    <div style={modalPostContainer}>
                        <div style={{ backgroundImage: `url(${loadImg})`, backgroundSize: 'cover', flex: 1, height: '100%', backgroundRepeat: 'no-repeat', borderBottomLeftRadius: 15, backgroundPosition: 'center', }}>

                        </div>
                        <div style={modalPostMessage}>
                            <FaUserCircle color='lightgrey' size={'30px'} />
                            <p>{username}</p>

                            <textarea value={txtArea} style={textArea} placeholder='Scrivi una didascalia...' onChange={handlerTxtArea}></textarea>
                            <input style={modalInput} placeholder=" Aggiungi luogo" onChange={handlerInput} value={loc} />
                            <button onClick={share}>condividi</button>
                        </div>

                    </div> :
                    <div style={modalStart}>
                        <img style={modalStart_img} width={'100px'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoVGThfMUGNAxEudBUgOIwWU9OEm6eoy_NtdLy9UklgW9sPEzp9b65UdNHgnZX-vi0jAM&usqp=CAU' />
                        <p style={modalStartP}>Carica le foto e i video qui</p>
                        <label style={modalStartUpload} htmlFor='file-upload' >
                            Seleziona dal computer
                        </label>
                        <input style={{ display: 'none' }} id='file-upload' type={'file'} onChange={imageHandler}></input>
                    </div>
                }

            </div>
        </div>
    );
}

export default ModalNewPost;

const closeBtn = {
    color: 'white',
    fontSize: '30px',
    padding: '10px',
    position: 'absolute',
    right: 20,
    cursor: 'pointer',
    top: 20,

}
const modalContainer = {
    position: 'fixed',
    top: 0,
    height: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgb(0,0,0,0.8)',
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

}
const mainCointainer = {
    height: '50%',
    width: '50%',
    maxWidth: 600,
    backgroundColor: 'white',
    borderRadius: 15,
}
const modalTitle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderBottom: '1px solid lightgray',
    fontSize: 16,
    fontWeight: 500,
}
const modalPostContainer = {
    display: 'flex',
    flexDirection: 'row',
    height: '88.66%',
    width: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,


}
const modalPostImage = {
    flex: 1,
    backgroundSize: 'contain',
    borderRadius: '15px'



}

const modalStart = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
}
const modalStart_img = {
    marginBottom: 20,
    marginTop: -100,
}
const modalStartP = {
    marginBottom: 30,
    fontSize: 20,
}
const modalStartUpload = {
    backgroundColor: 'rgb(0, 134, 243)',
    borderRadius: 5,
    height: 30,
    width: '40%',
    color: 'white',
    border: 'none',
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
}
const modalPostMessage = {
    flex: 1,
    height: '100%',
    borderLeft: '1px solid lightgray',
}
const textArea = {
    backgroundColor: 'white',
    color: '#666666',
    padding: 5,
    width: ' 100%',
    height: 168,
    border: '1px solid transparent',
    outline: 'none',
    transition: 'all 0.2s',
    resize: 'none',

}
const modalInput = {
    outline: 'none',
    overflow: 'hidden',
    border: '1.4px solid lightgray',
    height: 45,
    width: '100%',
    borderLeft: 'none',
    borderRight: 'none',
}