import React from 'react'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';
import {signout, isAuthenticated} from '../../auth'
import {Link, Redirect } from 'react-router-dom'


class Header extends React.Component {
    state = {
        user: '',
        redirectToSignIn: false,
        spanishPage: false,
        englishPage: false,
        khmerPage: false
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
        this.renderUser()
    }

    componentWillReceiveProps(props) {
        this.renderUser()
    }

    translateSpanish = () => {
        this.setState({spanishPage: true, englishPage: false, portPage: false, khmerPage: false})
    }

    translatePort = () => {
        this.setState({portPage: true, englishPage: false, spanishPage: false, khmerPage: false})
    }

    translateEnglish = () => {
        this.setState({englishPage: true, spanishPage: false, portPage: false, khmerPage: false})
    }
 
    translateKhmer = () => {
        this.setState({khmerPage: true, spanishPage: false, portPage: false, englishPage: false,})
    }

    renderTopHeader = () => {
        return (
            <div style={{border: 'solid black 2px', width: '100%'}}>
                <Navbar id='topHeader' collapseOnSelect expand="lg" variant="dark" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto " >
                    <DropdownButton id="dropdown-basic-button" title="traductor"  >
                                <Dropdown.Item ><a onClick={this.translateSpanish}>Spanish</a>
                                </Dropdown.Item>
                                <Dropdown.Item ><a onClick={this.translateKhmer}>Cambodian</a>
                                </Dropdown.Item>

                                <Dropdown.Item><a onClick={this.translateEnglish}>English</a></Dropdown.Item>

                                <Dropdown.Item><a onClick={this.translatePort}>Portuguese</a></Dropdown.Item>
                            
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

                        {
                             isAuthenticated() && isAuthenticated().user.code === 8290 && (
                                <Nav.Link>
                                    <Link style={{color: 'white', marginLeft: '1070px'}} to='/spanish/application' >
                                        Aplicaciones
                                    </Link>
                                </Nav.Link>
                            )
                        }

{
                             isAuthenticated() && isAuthenticated().user.code === 2609 && (
                                <Nav.Link>
                                    <Link style={{color: 'white', marginLeft: '1070px'}} to='/spanish/application' >
                                        Aplicaciones
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
                            <Nav.Link><Link style={{color: 'white'}} to='/spanish/schoolBoardMeeting'>Consejo Escolar</Link></Nav.Link>
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

  render() {
    const {spanishPage, englishPage, khmerPage, portPage, redirectToSignIn } = this.state
    if(spanishPage) {
        return <Redirect to={`/spanish`} />
     } else if (englishPage) {
         return <Redirect to={'/'} />
     } else if (khmerPage) {
        return <Redirect to={'/khmer'} />
    }  else if (portPage) {
        return <Redirect to={'/port'} />
    }
         else if(redirectToSignIn) {
            return <Redirect to={`/spanish/signin`} />
         } 

      return (
          <div>
              {this.renderTopHeader()}
                <div className="text-center" id='header'>
                        <img 
                            className='mt-5 mb-5'
                            style={{height: '200px', width: '800px'}}
                            src={require("../../images/uhsBanner.png")}
                        />
                    </div>
                {this.renderMenu()}
          </div>
      )
  }
}

export default Header