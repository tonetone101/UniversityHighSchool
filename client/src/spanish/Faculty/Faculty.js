import React, { Component } from "react";
import { list, read } from "./apiFaculty";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated, signout} from '../../auth'
import { Navbar, Nav, NavDropdown, Dropdown, Card, DropdownButton} from 'react-bootstrap';

class Faculty extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            faculties: [],
            page: 1,
            term: '',
            searched: false,
            searchedFaculty: '',
            error: '',
            searching: false,
            spanishPage: false,
            englishPage: false,
            khmerPage: false
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    loadFaculties = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data)
                this.setState({ faculties: data });
                

            }
        });
    };


    componentDidMount() {
        this.loadFaculties(this.state.faculties)
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

{   
                            isAuthenticated() && isAuthenticated().user.role === 'admin' && (
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

    handleChange = event => {
        this.setState({error: ''})
        this.setState({term: event.target.value})
    }

    search = (e) => {
        e.preventDefault()
        this.state.faculties.map(staff => {
            if (staff.name === this.state.term) {
                this.setState({searched: true, searchedFaculty: staff})
            } else {
                this.setState({searching: true, error: 'Miembro del personal no encontrado'})
            }
        })

    }

    renderFaculties = faculties => {

        return (
            <div  id='event' className='row container'>
                {faculties.map((faculty, i) => {
                        const facultyPhoto = faculty._id
                        ? `/spanishfaculty/photo/${
                            faculty._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (
                        <div  className='col-md-4' key={i}>
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={facultyPhoto} />
                        <Card.Body>
                            <Card.Title>{faculty.name.substring(0, 100)}</Card.Title>
                            <Card.Text>
                                {faculty.title.substring(0, 100)}
                            </Card.Text>
                            <Card.Text>
                                {faculty.about.substring(0, 100)}
                            </Card.Text>
                            <Link
                                    to={`/spanish/faculty/${faculty._id}`}
                                    className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                >
                                    Lee mas
                                </Link>
                        </Card.Body>
                        </Card>
                    </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { user, faculties, searched, spanishPage, englishPage, khmerPage, searchedFaculty, error } = this.state;

        if(spanishPage) {
            return <Redirect to={`/spanish/faculty`} />
         } else if (englishPage) {
             return <Redirect to={'/faculty'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmer/faculty'} />
        }

        if (searched) { return <Redirect to={`faculty/${searchedFaculty._id}`}/> } 

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
                    <div className='row mt-4 mb-3'>
                        <h2 className="col-md-6">
                            
                            Nuestro equipo
                            {!faculties.length ? "Loading..." : ""}
                        </h2>

                        <form className="col-md-6">
                            <input placeholder='por nombre de la facultad' type='text' value={this.state.term} onChange={this.handleChange} />
                            <button onClick={this.search}>Buscar</button>
                            {"  "}{error}
                        </form>
                        <hr/>
                    </div>
                    {
                        isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                            <div>
                                <Link className='mb-5' to='/spanish/new/faculty'>Añadir facultad</Link>
                            </div>
                        )
                    }
                
                    <div>               
                        {this.renderFaculties(faculties)}
                    </div>   
                
                </div>
            </div>
        );
    }
}

export default Faculty;