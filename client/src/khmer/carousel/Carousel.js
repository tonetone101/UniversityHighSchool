import React, {Component} from 'react'
import { Carousel } from 'react-bootstrap';
import {list} from './apiCarousel'
import {Link } from 'react-router-dom'
import { isAuthenticated} from '../../auth'
import { Card } from 'react-bootstrap'
import Header from '../header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
// import Angkor from './Angkors'

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
   

    renderCards = () => {
        return (
            <div className='row mb-5' style={{backgroundColor: 'white'}}>
                <div className='col-sm-4'>
                <Link
                            to={`/grade9`}
                        >
                    <Card style={{ width: '18rem' }} id='homeCards' >
                   
                        <Card.Img variant="top" id='imgCard' style={{height: '200px', width: ''}} src={require("../../images/Risers.png")} />
                        <Card.Header id='title' className="font-italic mark mt-4" style={{fontWeight: 'bold'}}>RISERS</Card.Header>

                        <Card.Body id='body' >
                            <Card.Text id='text'>
                                A RISER's main focus, is to figure who you are as a learner, an individual,
                                as part of a collective (family, community, etc), a professional and interest.     
                            </Card.Text>
                            <Link
                                    to={`/grade9`}
                                    className="btn btn-raised btn-primary btn-sm mb-4 ml-5"

                                >
                                    Read more
                            </Link>
                        </Card.Body>
                        {/* <Card.Header>                        
                            <img id='imgCard' className='text-center' style={{height: '200px', width: '250px'}} src={require("../../images/RISERLOGO.png")} />
                        </Card.Header> */}
                        
                    </Card>
                    </Link>

                </div>

                <div className='col-md-4'>
                <Link
                            to={`/grade10`}
                        >
                    <Card style={{ width: '18rem' }} id='homeCards' >
                    {/* <Card.Header>                        
                        <img id='imgCard' className='text-center' style={{height: '200px', width: '250px'}} src={require("../../images/invest.png")} />
                    </Card.Header> */}
                    
                        <Card.Img variant="top" id='imgCard' style={{height: '200px', width: ''}} src={require("../../images/Investigators.png")} />
                        <Card.Header id='title' className="font-italic mark mt-4"  style={{fontWeight: 'bold'}}>INVESTIGATORS</Card.Header>
                        <Card.Body id='body'>
                            <Card.Text id='text'>
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
                    </Link>
                </div>

                <div className='col-md-4' >
                <Link
                            to={`/grade11`}
                        >
                    <Card style={{ width: '18rem'}} id='homeCards' >
                    {/* <Card.Header>                        
                        <img id='imgCard' className='text-center' style={{height: '200px', width: '250px'}} src={require("../../images/navi.png")} />
                    </Card.Header> */}

                        <Card.Img variant="top" id='imgCard' style={{height: '200px', width: ''}} src={require("../../images/Navigators.png")} />
                        <Card.Header id='title' className="font-italic mark mt-4" style={{fontWeight: 'bold'}}>NAVIGATORS</Card.Header>

                        <Card.Body id='body'>
                            <Card.Text id='text'>
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
                    </Link>
                </div>
                 
            </div>
        )
    }


    render() {
        const {carousel } = this.state

        const uhsVideo = 'https://drive.google.com/file/d/1O6So7c58o-HuQwCVPAeY4Y_yNkLbz06Z/preview?ts=sharing'

                       

        return (
            <div>
                <Header history={this.props.history} />
                <div>
                    <div style={{backgroundColor: 'white'}}>
                        {!carousel ? ( 
                                <div className='jumbotron text-center '>
                                    <h2>Loading....</h2>
                                </div>
                                ) : (
                                    <div id='video' >
                                        {/* <video autoPlay muted>
                                            <source src={require("../../images/UHS.mp4")} type='video/mp4'/>
                                        </video> */}
                                        <iframe width="100%" height="630" src={uhsVideo} allow='autoplay'></iframe>
                                        
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
                                    <Link to={`/edit/carousel/${carousel._id}`} className='text-center btn btn-primary mt-4 mb-4'>Update Learning achor explanation</Link>
                                )
                            }

                            {
                                isAuthenticated() && isAuthenticated().user.code === 2609 && (
                                    <Link to={`/edit/carousel/${carousel._id}`} className='text-center btn btn-primary mt-4 mb-4'>Update Learning achor explanation</Link>
                                )
                            }

                           
                        </div>
                   
                    </div>
                                        
                   
                </div>
                    
                        <div id='vision'>
                            <div className='container goals' >
                                <div className='text-center' >
                                    <h3 style={{fontWeight: 'bold', color: 'black'}}>
                                        OUR MISSION AND VISION
                                    </h3>
                                        <div className='icon'>
                                            <FontAwesomeIcon  icon ={faCheckSquare} />
                                        </div>
                                        <div className='title-underline text-center'></div>                              
                                </div>

                                <div className='row text-center mt-5'>
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
                        {/* achor section */}
                        {/* <Angkor achor={carousel} /> */}
                        
                        {/* <div>
                            {this.renderAnnouncements(carousel)}
                        </div> */}
                                
                                
                        <footer id='footer' className='mt-5'>
                            <div class="text-center row ml-5">
                                <img className='col-md-6 mb-4' style={{height: '150px', marginTop: '10px'}} src={require("../../images/uhsBanner.png")} /> 
                                <div className="col-md-6 d-flex justify-content-around align-items-baseline">
                                    <div className='mt-3'>
                                        <p>1 Empire Plaza | Providence, RI 02903</p>
                                        <p>Phone: (401) 254- 4829 | somaly@uhschool.org</p>
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
