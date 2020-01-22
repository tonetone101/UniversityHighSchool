import React, { Component } from "react";
import { isAuthenticated, signout } from "../../auth";
import { create } from "./apiStudent";
import { Redirect, Link } from "react-router-dom";
import Links from './Links'
import { Navbar, Nav, ListGroup, Dropdown, DropdownButton} from 'react-bootstrap';

class Admission extends Component {
    constructor() {
        super();
        this.state = {
            error: "",
            user: {},
            spanishPage: false,
            englishPage: false,
            khmerPage: false
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
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
        const { spanishPage, khmerPage, englishPage} = this.state;

        if(spanishPage) {
            return <Redirect to={`/spanish/admission`} />
         } else if (englishPage) {
             return <Redirect to={'/admission'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmer/admission'} />
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
                <div className='container mt-3' >
                    <h3 className='text-center'>Bienvenido a nuestra sección de Admisiones</h3>

                    <ListGroup variant="flush">
                        <ListGroup.Item> 
                            <Link onClick={() => { 
                                            window.open(`https://drive.google.com/file/d/17Vya9qqFuHaAbH5KrDdO0rRXZi9cbYQP/view?usp=sharing`) 
                                            }} >
                                Ver formulario de solicitud
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item></ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        );
    }
}

export default Admission;