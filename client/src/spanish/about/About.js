import React, {Component} from 'react'
import { Carousel } from 'react-bootstrap';
import {list} from './apiAbout'
import {Link, Redirect } from 'react-router-dom'
import {signout, isAuthenticated} from '../../auth'
import { Navbar, Nav, Card, Dropdown, DropdownButton} from 'react-bootstrap';


class About extends Component {
    state = {
        user: '',
        about: [],
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
                this.setState({about: data.find(d => {
                    if (d._id == "5e247f609147d80aab97c633") {
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
                                    <Link className='ml-3' to='/spanish/signin' style={{color: 'white'}}>
                                    Registrarse
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{color: 'white'}} to='/spanish/signup' >
                                    Regístrate
                                    </Link>
                                </Nav.Link>
                               </nav>
                            )
                        }
                        
                        {
                            isAuthenticated() && isAuthenticated().user && (
                                <Nav.Link>
                                    <a style={{color: 'white'}}  onClick={() => signout(() => {
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

    renderAbout = (about) => {
       const photoUrl = about.postedBy
        ? `${process.env.REACT_APP_API_URL}/spanish/user/photo/${
            about._id
          }?${new Date().getTime()}`
        : ''

        return (
            <div className='container mt-5'>
                <Card border='dark' >
                    <Card.Body>
                        <Card.Title>Sobre nosotros</Card.Title>
                        
                        <Card.Text>
                            {about.body}
                        </Card.Text>

                        <Card.Text>
                            {about.paragraph2}
                        </Card.Text>

                        <Card.Text>
                            {about.paragraph3}
                        </Card.Text>

                        <Card.Text>
                            {about.paragraph4}
                        </Card.Text>

                        <Card.Text>
                            {about.paragraph5}
                        </Card.Text>
                    
                    </Card.Body>
                </Card>
            </div>


            // <div className='container mt-4'>
            //     <h2 style={{borderBottom: 'solid black 1px'}}>About Us</h2>
            //    <p>
            //        {about.body}
            //    </p>    
            // </div>    
              
        );
    }

    render() {
        const {about, spanishPage, englishPage, khmerPage, redirectToSignIn } = this.state
        if(spanishPage) {
            return <Redirect to={`/spanish/about`} />
         } else if (englishPage) {
             return <Redirect to={'/about'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmer/about'} />
        }
         else if(redirectToSignIn) {
            return <Redirect to={`/spanish/signin`} />
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
                        {!about ? ( 
                                <div className='jumbotron text-center '>
                                    <h2>Loading....</h2>
                                </div>
                                ) : (
                                    this.renderAbout(about)
                                    
                                )
                            } 

                        <div className='text-center' >
                            {
                                isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                    <Link to={`/spanish/edit/about/${about._id}`} className='text-center btn btn-primary mt-4 mb-4'>Update</Link>
                                )
                            }
                        </div>
                    </div>               
                </div>
            </div>
        )
    }
}

export default About