import React, {Component} from 'react'
import { Carousel } from 'react-bootstrap';
import {singleCarousel, update, list} from './apiCarousel'
import {Link, Redirect} from 'react-router-dom'
import {signout, isAuthenticated} from '../../auth'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';
import {Animated} from 'react-animated-css'

class Carol extends Component {
    state = {
        user: '',
        carousel: [],
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
                    if (d._id == "5e21c38ee171cd756604685f") {
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
            <div>
                <Navbar id='topHeader' collapseOnSelect expand="lg" variant="dark" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto " >
                    <DropdownButton id="dropdown-basic-button" title="Traductora"  >
                                <Dropdown.Item ><a onClick={this.translateSpanish}>Spanish</a>
                                </Dropdown.Item>
                                <Dropdown.Item ><a onClick={this.translateKhmer}>Cambodian</a>
                                </Dropdown.Item>
                                <Dropdown.Item><a>Hmong</a></Dropdown.Item>

                                <Dropdown.Item><a onClick={this.translateEnglish}>English</a></Dropdown.Item>

                                <Dropdown.Item><a>Portuguese</a></Dropdown.Item>
                            
                            </DropdownButton>
                        
                        {
                            !isAuthenticated() && (
                               <nav className='row'>
                                <Nav.Link >
                                    <Link className='ml-3' to='/spanish/signin' style={{color: 'black'}}>
                                    Registrarse
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{color: 'black'}} to='/spanish/signup' >
                                    Regístrate
                                    </Link>
                                </Nav.Link>
                               </nav>
                            )
                        }
                        
                        {
                            isAuthenticated() && isAuthenticated().user && (
                                <Nav.Link>
                                    <a style={{color: 'black'}}  onClick={() => signout(() => {
                                        this.props.history.push('/spanish')
                                    })}>
                                      Desconectar
                                    </a>
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
            <div>
                 <Navbar id='menu' collapseOnSelect expand="lg" variant="dark"  >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                    <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                         <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanish'>Hogar</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/spanish/about'>Sobre nosotros</Link></Nav.Link>
                        </div>

                       <div id='link'>                
                           <Nav.Link ><Link style={{color: 'white'}} to='/spanish/faculty'>Facultad</Link></Nav.Link>
                        </div>
                        <Nav.Link ><Link style={{color: 'white'}} to='/spanish/student'>Estudiantes</Link></Nav.Link>
                        
                        
                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanish/admission'>Admisión</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanish/partners'>Nuestros compañeros</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanish/images'>Galería</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanishevents'>Próximos Eventos</Link></Nav.Link>
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
        const {carousel, spanishPage, englishPage, khmerPage, redirectToSignIn} = this.state
       
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
                    
                </div>
                <div>                       
                    <div className='text-center' >
                        {
                            isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                <Link to={`/spanish/edit/carousel/${carousel._id}`} className='text-center btn btn-primary mt-4 mb-4'>Actualización</Link>
                            )
                        }
                    </div>

                    <div className='row container' style={{marginLeft: '150px', marginTop: '150px'}}>
                           
                           <img 
                               style={{ height: "300px", width: "200px" }}
                               className=" col-sm-6"
                               src={require("../../images/uhsMission.png")}
                               alt="Second slide" 
                               
                           />   
                           <img 
                               style={{ height: "300px", width: "200px" }}
                               className=" col-sm-6"
                               src={require("../../images/uhsVision.png")}
                               alt="Second slide" 
                               
                           />  
                          
                       </div>

                       <div>
                            {this.renderAnnouncements(carousel)}
                        </div>
            
                        <footer >
                            
                            <div className="container row ml-5">
                                <img className='col-md-6 mb-4' style={{height: '150px', marginTop: '10px'}} src={require("../../images/banner.png")} /> 
                                <div className="col-md-6 d-flex justify-content-around align-items-baseline">
                                    <div >
                                        <p>1 Empire Plaza | Providence, RI 02903</p>
                                        <p>Teléfono: (401) 254- 4829 | Email: Sprak-martins@uhschool.org</p>
                                        <h5 className="text-capitalize">
                                        &copy;{new Date().getFullYear()} derechos de autor : <a href="/">www.uhSchool.org </a>
                                        </h5> 
                                     </div>
                                </div>
                                </div>
                        </footer> 
                </div>
            </div>
        )
    }
}

export default Carol