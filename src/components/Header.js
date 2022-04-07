import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsHouseDoor, BsPlusSquare, BsHeart, BsPersonCircle } from 'react-icons/bs'
import { IoPaperPlaneOutline, IoCompassOutline, } from 'react-icons/io5'
import ModalCreatePost from './ModalCreatePost';
import { Navbar, Container, Nav, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Header.css'
import DropMenu from './DropMenu';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../store/actions/Auth';
import SearchBar from './SearchBar';



function Header() {

  const [userName, setUserName] = useState([])
  const [userId, setUserId] = useState([])
  const [id, setId] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const a = useSelector(state => state.Auth.userData)



  const userData = JSON.parse(localStorage.getItem('userData'))

 
  const findUser = a.find(e => e.userId == id);

  const dispatch = useDispatch()
  useEffect( async () => {
    await dispatch(getUserData())
    if (userData == null) {
      return
    } else {
      setId(userData.userId)
      setUserName(userData.username)
      setUserId(userData.userId)

    }
  }, [])

  return (
    <>
      <Navbar fixed="top" variant="light" style={{ borderBottom: '1px solid lightgrey', background: 'white' }}>
        <Container>
          <Navbar.Brand href="#home">Instagram</Navbar.Brand>
          <SearchBar></SearchBar>
          <Nav className=" justify-content-end">
            <Nav.Link href="/"><BsHouseDoor size={20} /></Nav.Link>
            <Nav.Link href="#features"><IoPaperPlaneOutline size={20} /></Nav.Link>
            <Nav.Link ><BsPlusSquare onClick={() => setModalShow(true)} size={20} /></Nav.Link>
            <Nav.Link href="#a"><IoCompassOutline size={25} /></Nav.Link>
            <Nav.Link href="/logout"><BsHeart size={20} /></Nav.Link>
            <Nav.Link href="" onClick={() => setShow(!show)}><BsPersonCircle size={20} /></Nav.Link>
            {show == true ?
              <DropMenu myUserName={findUser.username} /> :
              null
            }
          </Nav>
        </Container>
        <ModalCreatePost
          show={modalShow}
          onHide={() => setModalShow(false)}
          username={userName}
          userId={userId}
        />

      </Navbar>

    </>
  );
}

export default Header;
