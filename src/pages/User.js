import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import '../css/User.css';
import { Col, Container, Row, Button } from 'react-bootstrap';

function User() {
    const { username } = useParams()
    const userData = useSelector(state => state.Auth.userData)
    const PostData = useSelector(state => state.Post.fetchData)
    const myUserKey = JSON.parse(localStorage.getItem('userData'))
    const find = userData.find(e => e.username == username)
    const UserPost = PostData.filter(e => e.username.includes(username))
    

 console.log(find.key)

    const RenderPost = UserPost.map((i) => {
        return (
            <div key={i.key} style={{ backgroundImage: `url(${i.loadImg})`, minWidth: '200px', width: '250px', height: '300px', margin: '10px', display: 'flex', border: '1px solid black', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPositionX: '50%, 50%', }}>
                {i.username}
            </div>
        )
    })


    return (

        <div className='UserContainer'>

            <Header />
            {find.key == myUserKey.userKey ?
                <Container>
                    <Row className="justify-content-md-center" >
                        <Col xs={4} >
                            <div className='UserAvatar'>
                                Avatar
                            </div>
                        </Col>
                        <Col >
                            <Row className='User_1'>
                                <Col>
                                    <div className='User_nick'>
                                        <h2> {find.username}</h2>
                                    </div>

                                </Col>
                                <Col>
                                    <div className='Option_Button' >
                                        <Link to={'/accounts/edit'} >
                                            <p>Modifica Profilo</p>
                                        </Link>


                                    </div>
                                </Col>
                                <Col>...</Col>
                            </Row>
                            <Row>
                                <Col>
                                    Post: <strong>51</strong>
                                </Col>
                                <Col><strong>504</strong> follower</Col>
                                <Col><strong>50</strong> Profili seguiti</Col>
                            </Row>

                        </Col>
                    </Row>

                    <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <div style={{ minWidth: '300px', width: '900px', display: 'flex', marginTop: '150px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                            {RenderPost}
                        </div>



                    </Row>
                </Container >
                :
                <Container >


                    <Row className="justify-content-md-center" >
                        <Col xs={4} >
                            <div className='UserAvatar'>
                                Avatar
                            </div>
                        </Col>
                        <Col >
                            <Row className='User_1'>
                                <Col>
                                    <div className='User_nick'>
                                        <h2> {find.username}</h2>
                                    </div>

                                </Col>
                                <Col>
                                    <div className='User_Button' >
                                        <p>Segui</p>
                                    </div>
                                </Col>
                                <Col>...</Col>
                            </Row>
                            <Row>
                                <Col>
                                    Post: <strong>51</strong>
                                </Col>
                                <Col><strong>504</strong> follower</Col>
                                <Col><strong>50</strong> Profili seguiti</Col>
                            </Row>

                        </Col>
                    </Row>

                    <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <div style={{ minWidth: '300px', width: '900px', display: 'flex', marginTop: '150px', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                            {RenderPost}
                        </div>



                    </Row>
                </Container>
            }
        </div >
    )
}

export default User