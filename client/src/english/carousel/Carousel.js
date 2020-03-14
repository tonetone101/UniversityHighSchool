import React, {Component} from 'react'
import { Carousel } from 'react-bootstrap';
import {list} from './apiCarousel'
import {Link } from 'react-router-dom'
import { isAuthenticated} from '../../auth'
import {Animated} from 'react-animated-css'
import { Card, Button } from 'react-bootstrap';
import Header from '../header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'

class Carol extends Component {
    state = {
        user: '',
        carousel: [],
        redirectToSignin: false
    }

    renderUser = () => {
        this.setState({
            user: isAuthenticated().user
        })
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({carousel: data.find(d => {
                    if (d._id == "5e21c9ab9195bc7dc99dcfb3") {
                        return d
                    }
                }) 
              })
              
            }
        }) 
        this.renderUser()
        console.log(isAuthenticated().user)
    }

    componentWillReceiveProps() {
        this.renderUser()
    }
    
    // renderCarousel = (carousel) => {
    //     const posterId = carousel.postedBy
    //     ? `/user/${carousel.postedBy._id}`
    //     : "";
        
    //     const posterName = carousel.postedBy
    //     ? carousel.postedBy.name
    //     : " Unknown";

    //     const photoUrl = carousel.postedBy
    //     ? `${process.env.REACT_APP_API_URL}/user/photo/${
    //         carousel.postedBy._id
    //       }?${new Date().getTime()}`
    //     : ''

    //     const photoOne = carousel.photo1
    //     ? `${process.env.REACT_APP_API_URL}/carousel/photo/${
    //         carousel.photo1
    //       }?${new Date().getTime()}`
    //     : ''


    //     return (
    //         <div >
    //             <Carousel style={{background: 'black'}}>
    //                 <Carousel.Item style={{background: 'black'}}>
    //                     <img
    //                     style={{ height: "450px"}}
    //                     // className="d-block w-100"
    //                     src={require("../../images/UHS_research.JPG")}
    //                     alt="First slide"
    //                     />
    //                     <Carousel.Caption>
                       
    //                     </Carousel.Caption>
    //                 </Carousel.Item>
    //                 <Carousel.Item style={{background: 'black'}}>
    //                     <img
    //                     style={{ height: "450px"}}
    //                     // className="d-block w-100"
    //                     src={require("../../images/uhsStudents.JPG")}
    //                     alt="Second slide"
    //                     />

    //                     <Carousel.Caption>
                     
    //                     </Carousel.Caption>
    //                 </Carousel.Item>
    //                 <Carousel.Item style={{background: 'black'}}>
    //                     <img
    //                     style={{ height: "450px"}}
    //                     // className="d-block w-100"
    //                     src={require("../../images/uhsProfile.png")}
    //                     alt="Third slide"
    //                     />

    //                     <Carousel.Caption>
    //                     </Carousel.Caption>
    //                 </Carousel.Item>
    //             </Carousel>   

                
    //         </div>    
              
    //     );
    // }

    renderAnnouncements = (carousel) => {
        return (
            <div className='container mt-4' style={{color: 'black'}}>
                <h4 id='announcements' style={{borderBottom: 'solid black 1px'}}>Announcements</h4>
                <h5>
                    <Link onClick={() => { 
                            window.open(carousel.doc1) 
                            }} >
                        {!carousel.doc1 ? ''  : carousel.linkTitle1 }
                    </Link>
                    <Link onClick={() => { 
                            window.open(`https://${carousel.link1}`) 
                            }} >
                    {!carousel.link1 ? ''  : carousel.linkTitle1 }
                    </Link>
                    <div className='ml-4'>
                        {carousel.caption4}
                    </div>
                </h5>
                
                <h5>
                <Link onClick={() => { 
                            window.open(carousel.doc2) 
                            }} >
                        {!carousel.doc2 ? ''  : carousel.linkTitle2 }
                    </Link>
                    <Link onClick={() => { 
                            window.open(`https://${carousel.link2}`) 
                            }} >
                    {!carousel.link2 ? ''  : carousel.linkTitle2 }
                    </Link>
                    <div className='ml-4'>
                        {carousel.caption5}
                    </div>
                </h5>
                
                <h5>
                <Link onClick={() => { 
                            window.open(carousel.doc3) 
                            }} >
                        {!carousel.doc3 ? ''  : carousel.linkTitle3 }
                    </Link>
                    <Link onClick={() => { 
                            window.open(`https://${carousel.link3}`) 
                            }} >
                    {!carousel.link3 ? ''  : carousel.linkTitle3 }
                    </Link>
                    <div className='ml-4'>
                        {carousel.caption6}
                    </div>
                </h5>
            </div>
        )
    }

    renderCards = () => {
        return (
            <div className='row mb-5'>
                <div className='col-sm-4'>
                    <Card style={{ width: '18rem' }} id='homeCards' >
                        <Card.Header>                        
                            <img className='text-center' style={{height: '200px', width: '250px'}} src={require("../../images/risers.png")} />
                        </Card.Header>
                       
                        <Card.Body>
                            <Card.Title>RISERS</Card.Title>
                            <Card.Text>
                                A RISER's main focus, is to figure who your are as a learner, an individual,
                                as part of a collective (family, community, etc), a professional and interest.     
                            </Card.Text>
                            <Link
                                    to={`/grade9`}
                                    className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                >
                                    Read more
                            </Link>
                        </Card.Body>
                    </Card>
                </div>

                <div className='col-md-4'>
                    <Card style={{ width: '18rem' }} id='homeCards' >
                    <Card.Header>                        
                        <img className='text-center' style={{height: '200px', width: '250px'}} src={require("../../images/investigators.png")} />
                    </Card.Header>
                        <Card.Body>
                            <Card.Title>INVESTIGATORS</Card.Title>
                            <Card.Text>
                               An INVESTIGATOR is about continueing to hone in on the understandings
                               gained from being a RISER and dive deeper into interest through inquiry     
                            </Card.Text>
                            <Link
                                    to={`/grade10`}
                                    className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                >
                                    Read more
                            </Link>
                        </Card.Body>
                    </Card>
                </div>

                <div className='col-md-4'>
                    <Card style={{ width: '18rem'}} id='homeCards' >
                    <Card.Header>                        
                        <img className='text-center' style={{height: '200px', width: '250px'}} src={require("../../images/navigators.png")} />
                    </Card.Header>
                        {/* <Card.Img variant="top" style={{height: '200px', width: ''}} src={require("../../images/navigators.png")} /> */}
                        <Card.Body>
                            <Card.Title>NAVIGATORS</Card.Title>
                            <Card.Text>
                                A NAVIGATOR's main focus is to continue honing in on understandings gained from being a 
                                RISER and INVESTIGATOR. Must build compacity for self and others.

                            </Card.Text>
                            <Link
                                    to={`/grade11`}
                                    className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                >
                                    Read more
                            </Link>
                        </Card.Body>
                    </Card>
                </div>
                 
            </div>
        )
    }

    render() {
        const {carousel } = this.state

        return (
            <div>
                <Header history={this.props.history} />
                <div>
                    <div>
                        {!carousel ? ( 
                                <div className='jumbotron text-center '>
                                    <h2>Loading....</h2>
                                </div>
                                ) : (
                                    <div id='video' >
                                        <iframe width="100%" height="630" src="https://www.youtube.com/embed/Y3K1rtw5omA?autoplay=1&rel=1&controls=0&loop=1&playlist=Y3K1rtw5omA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        
                                    </div>
                                    
                                )
                            } 
                            <div className='container'>
                                {this.renderCards()}
                            </div>
                            
                         
                        {/* <div  id='stats' style={{height: '100px', }} className='container mt-3'>
                            <div style={{borderBottom: 'solid black 1px'}}>
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true} style={{color:'black'}} >
                                    <h4  >{carousel.caption1}</h4>
                                </Animated>
                            </div>
                            
                            <div className='container'>
                                    <h5 style={{ marginTop: '10px'}} className='mb-5'>{carousel.missionStatement}</h5>
                                
                            </div>    
                            
                            <div className='container'>
                                    <h5 style={{ marginTop: '10px'}} className='mb-5'>{carousel.caption2}</h5>
                                
                            </div>         

                            <div className='container'>
                                    <h5 style={{ marginTop: '10px'}} className='mb-5'>{carousel.caption3}</h5>
                                
                            </div>              
                        </div> */}

                        <div className='text-center' >
                            {
                                isAuthenticated() && isAuthenticated().user.code === 8290 && (
                                    <Link to={`/edit/carousel/${carousel._id}`} className='text-center btn btn-primary mt-4 mb-4'>Update</Link>
                                )
                            }

                            {
                                isAuthenticated() && isAuthenticated().user.code === 2609 && (
                                    <Link to={`/edit/carousel/${carousel._id}`} className='text-center btn btn-primary mt-4 mb-4'>Update for principle</Link>
                                )
                            }

                           
                        </div>
                   
                    </div>
                                        
                   
                </div>
                    
                        <div id='vision'>
                            <div className='container' >
                                <div className='text-center' >
                                    <h4 >
                                        OUR MISSION AND VISION
                                    </h4>

                                    <div className='mb-0' >
                                        <FontAwesomeIcon  icon ={faCheckSquare} />
                                   </div>

                                   <div className="title-underline"></div>
                                </div>
                                <div className='row text-center'>
                                    <img 
                                        id='homeImage'
                                        style={{ height: "300px", width: "200px" }}
                                        className="col-md-6"
                                        src={require("../../images/uhsMission.png")}
                                        
                                    />   
                                    <img 
                                        id='homeImage'
                                        style={{ height: "300px", width: "200px" }}
                                        className="col-md-6"
                                        src={require("../../images/uhsVision.png")}
                                        
                                    />  
                                </div>
                            </div>
                           
                        </div>
                        
                        {/* <div>
                            {this.renderAnnouncements(carousel)}
                        </div> */}
                                
                                
                        <footer className='mt-5'>
                            <div class="container row ml-5">
                                <img className='col-md-6 mb-4' style={{height: '150px', marginTop: '10px'}} src={require("../../images/uhsBannerLogo.png")} /> 
                                <div className="col-md-6 d-flex justify-content-around align-items-baseline">
                                    <div >
                                        <p>1 Empire Plaza | Providence, RI 02903</p>
                                        <p>Phone: (401) 254- 4829 | Sprak-martins@uhschool.org</p>
                                        <h5 className="text-capitalize">
                                        &copy; {new Date().getFullYear()} copyright : <a href="/">www.uhSchool.org </a>
                                        </h5> 
                                     </div>
                                </div>
                                </div>
                        </footer> 
            </div>
        )
    }
}

export default Carol

{/* <MDBFooter color="blue" className="font-small pt-4 mt-4" >
<MDBContainer fluid className="text-center text-md-left">
    <MDBRow>
    <MDBCol md="6">
        <img className='col-md-6 mt-4 mb-4' style={{height: '150px', marginTop: '10px'}} src={require("../../images/banner.png")} /> 
    </MDBCol>
    <MDBCol md="6">
        <ul>
        <li className="list-unstyled">
            <a href="https://www.google.com/maps/place/Roger+Williams+University/@41.6511285,-71.2598636,17z/data=!3m1!4b1!4m5!3m4!1s0x89e454ec321d3d7f:0x5c138da5433de6e8!8m2!3d41.6511285!4d-71.2598636">1 Old Ferry Rd, Bristol, RI 02809</a>
        </li>
        <li className="list-unstyled">
            <p>Phone: (401) 332- 2233 </p>
        </li>
        <li className="list-unstyled">
            <a href="#!">Email: Somaly@uhSchool.org</a>
        </li>
        </ul>
    </MDBCol>
    </MDBRow>
</MDBContainer>
<div id='bottomFooter' style={{borderTop: 'solid 2px'}} className="footer-copyright text-center py-3">
    <MDBContainer fluid>
    &copy; {new Date().getFullYear()} Copyright: <a href="https://www.uhSchool.org">www.uhSchool.org </a>
    </MDBContainer>
</div>
</MDBFooter> */}