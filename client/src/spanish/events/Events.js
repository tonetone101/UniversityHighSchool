import React, { Component } from "react";
import { list, read } from "./apiEvent";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated, signout} from '../../auth'
import cookie from "react-cookies";
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';



class Events extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            events: [],
            page: 1,
            spanishPage: false,
            englishPage: false,
            khmerPage: false
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    loadEvents = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data)
                this.setState({ events: data });
                

            }
        });
    };


    componentDidMount() {
        this.loadEvents(this.state.events)
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


    renderEvents = events => {

        return (
            <div  id='event' className='row container'>
                {events.map((event, i) => {
                    const posterId = event.postedBy
                        ? `/user/${event.postedBy._id}`
                        : "";
                    const posterName = event.postedBy
                        ? event.postedBy.name
                        : " Unknown";

                        const photoUrl = event.postedBy
                        ? `/user/photo/${
                            event.postedBy._id
                          }?${new Date().getTime()}`
                        : ''

                        const eventPhoto = event._id
                        ? `/event/photo/${
                            event._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (
                        <div className='col-md-4 mb-5' key={i}>
                        <Card border='dark' style={{ width: '18rem', height: '375px'}}>
                            <Card.Header className="font-italic mark mt-4">
                                Evento publicado en{" "}
                              
                                {new Date(event.created).toDateString()}
                            </Card.Header >
                            <Card.Body>
                                <Card.Title>{event.title.substring(0, 100)}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{event.where.substring(0, 100)}</Card.Subtitle>
                                
                                <Card.Text>
                                    {event.body.substring(0, 100)}
                                </Card.Text>
                            
                                <Card.Link >
                                    <Link
                                           onClick={() => { 
                                            window.open(`${event.url}`) 
                                            }} 
                                            className="btn btn-raised btn-primary btn-sm mb-4"
                                    >
                                           Google Doc
                                    </Link>
                                </Card.Link>
                            
                                <Card.Link >
                                    <Link
                                            to={`/spanish/event/${event._id}`}
                                            className="btn btn-raised btn-primary btn-sm mb-4"
                                    >
                                            Lee mas
                                    </Link>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    </div>


                       
                    );
                })}
            </div>
        );
    };

    render() {
        const { user, spanishPage, englishPage, khmerPage, events } = this.state;
        
        
        if(spanishPage) {
            return <Redirect to={`/spanishevents`} />
         } else if (englishPage) {
             return <Redirect to={'/events'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmerevents'} />
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
                <div className="container">
                    
                    <h2 className="mt-5 mb-5">
                        {!events.length ? "Loading..." : ""}
                    </h2>
                    {
                        isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                            <div>
                                <Link className='mb-5' to='/spanish/new/event'>Añadir evento</Link>
                            </div>
                        )
                    }
                
                    <div>               
                        {this.renderEvents(events)}
                    </div>   
                
                </div>
            </div>
        );
    }
}

export default Events;