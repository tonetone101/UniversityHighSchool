import React, {Component} from 'react'
import { Carousel } from 'react-bootstrap';
import {list} from './apiCarousel'
import {Link, Redirect } from 'react-router-dom'
import {signout, isAuthenticated} from '../../auth'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';
import {Animated} from 'react-animated-css'

class Carol extends Component {
    state = {
        user: '',
        carousel: [],
        redirectToHome: false,
        redirectToSignIn: false,
        spanishPage: false,
        englishPage: false,
        khmerPage: false
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({carousel: data.find(d => {
                    if (d._id == "5e35fb64e6ffb39e3011a285") {
                        return d
                    }
                }) 
              })
              
            }
        }) 
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    translateSpanish = () => {
        this.setState({spanishPage: true, englishPage: false, khmerPage: false})
    }

    translateEnglish = () => {
        this.setState({englishPage: true, spanishPage: false, khmerPage: false})
    }
 
    translateKhmer = () => {
        this.setState({khmerPage: true, spanishPage: false, englishPage: false,})
    }

    renderTopHeader = () => {
        return (
            <div style={{border: 'solid black 2px', width: '100%'}}>
                <Navbar id='topHeader' collapseOnSelect expand="lg" variant="dark" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto " >
                    <DropdownButton id="dropdown-basic-button" title="translator"  >
                                <Dropdown.Item ><a onClick={this.translateSpanish}>Spanish</a>
                                </Dropdown.Item>
                                <Dropdown.Item ><a onClick={this.translateKhmer}>Cambodian</a>
                                </Dropdown.Item>
                                <Dropdown.Item><a>Hmong</a></Dropdown.Item>

                                <Dropdown.Item><a onClick={this.translateEnglish}>English</a></Dropdown.Item>

                                <Dropdown.Item><a>Portuguese</a></Dropdown.Item>
                            
                    </DropdownButton>
                        
                        {
                            !this.state.user && (
                               <nav className='row'>
                                <Nav.Link >
                                    <Link className='ml-3' to='/signin' style={{color: 'white'}}>
                                        Sign In 
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{color: 'white'}} to='/signup' >
                                        Sign Up
                                    </Link>
                                </Nav.Link>
                               </nav>
                            )
                        }
                        
                        {
                            this.state.user && (
                                <Nav.Link>
                                    <a style={{color: 'white'}}  onClick={() => signout(() => {
                                        this.props.history.push('/')
                                    })}>
                                        Sign Out
                                    </a>
                                </Nav.Link>
                            )
                        }

                        {
                            isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                <Nav.Link>
                                    <Link style={{color: 'white', marginLeft: '1070px'}} to='/application' >
                                        Applications
                                    </Link>
                                </Nav.Link>
                            )
                        }

                        
                      
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }

    renderMenu = () => {
        return (
            <div style={{border: 'solid black 2px'}}>
                 <Navbar id='menu' collapseOnSelect expand="lg" variant="dark"  >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                    <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                         <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/'>Home</Link></Nav.Link>
                        </div>
                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/about'>About Us</Link></Nav.Link>
                        </div>

                       <div id='link'>                
                           <Nav.Link><Link style={{color: 'white'}} to='/faculty'>Faculty</Link></Nav.Link>
                        </div>
                        <Nav.Link><Link style={{color: 'white'}} to='/student'>Students</Link></Nav.Link>
                        
                        
                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/admission'>Admission</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/schoolBoardMeeting'>School Board</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/partners'>Our Partners</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/images'>Gallery</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/events'>Upcoming Events</Link></Nav.Link>
                        </div>
                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
    
    renderCarousel = (carousel) => {
        const posterId = carousel.postedBy
        ? `/user/${carousel.postedBy._id}`
        : "";
        
        const posterName = carousel.postedBy
        ? carousel.postedBy.name
        : " Unknown";

        const photoUrl = carousel.postedBy
        ? `${process.env.REACT_APP_API_URL}/user/photo/${
            carousel.postedBy._id
          }?${new Date().getTime()}`
        : ''

        const photoOne = carousel.photo1
        ? `${process.env.REACT_APP_API_URL}/carousel/photo/${
            carousel.photo1
          }?${new Date().getTime()}`
        : ''


        return (
            <div >
                <Carousel style={{background: 'black'}}>
                    <Carousel.Item style={{background: 'black'}}>
                        <img
                        style={{ height: "450px"}}
                        // className="d-block w-100"
                        src={require("../../images/UHS_research.JPG")}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                       
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{background: 'black'}}>
                        <img
                        style={{ height: "450px"}}
                        // className="d-block w-100"
                        src={require("../../images/uhsStudents.JPG")}
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                     
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{background: 'black'}}>
                        <img
                        style={{ height: "450px"}}
                        // className="d-block w-100"
                        src={require("../../images/uhsProfile.png")}
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>   

                
            </div>    
              
        );
    }

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

    render() {
        const {carousel, spanishPage, englishPage, khmerPage, redirectToSignIn } = this.state
        if(spanishPage) {
            return <Redirect to={`/spanish`} />
         } else if (englishPage) {
             return <Redirect to={'/'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmer'} />
        }
         else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         } 

        return (
            <div>
                {this.renderTopHeader()}
                <div className="text-center">
                        <img 
                            style={{height: '150px', width: '600px', backgroundColor: 'blue'}}
                            src={require("../../images/logo.png")}
                        />
                    </div>
                {this.renderMenu()}
                <div>
                    <div className='text-center'>
                        {!carousel ? ( 
                                <div className='jumbotron text-center '>
                                    <h2>Loading....</h2>
                                </div>
                                ) : (
                                    this.renderCarousel(carousel)
                                    
                                )
                            } 
                         
                        <div  id='stats' style={{height: '100px', }} className='container mt-3'>
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
                        </div>

                        <div className='text-center' >
                            {
                                isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                    <Link to={`/edit/carousel/${carousel._id}`} className='text-center btn btn-primary mt-4 mb-4'>Update</Link>
                                )
                            }
                        </div>
                   
                    </div>
                                        
                   
                </div>
                        
                        <div className='row container' style={{marginLeft: '150px', marginTop: '150px'}}>
                           
                            <img 
                                style={{ height: "300px", width: "200px" }}
                                className="mt-4 col-sm-6"
                                src={require("../../images/uhsMission.png")}
                                alt="Second slide" 
                                
                            />   
                            <img 
                                style={{ height: "300px", width: "200px" }}
                                className="mt-4 col-sm-6"
                                src={require("../../images/uhsVision.png")}
                                alt="Second slide" 
                                
                            />  
                           
                        </div>
                        
                        <div>
                            {this.renderAnnouncements(carousel)}
                        </div>
                                
                                
                        <footer className='mt-5'>
                            <div class="container row ml-5">
                                <img className='col-md-6 mb-4' style={{height: '150px', marginTop: '10px'}} src={require("../../images/banner.png")} /> 
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