import React, { Component } from "react";
import { list, read } from "./apiSchoolBoardMember";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated, signout} from '../../auth'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton, Card, Button, InputGroup, FormControl} from 'react-bootstrap';

class SchoolBoardMember extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            schoolBoardMembers: [],
            spanishPage: false,
            englishPage: false,
            term: '',
            searched: false,
            searchedschoolBoardMember: '',
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

    loadschoolBoardMembers = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data)
                this.setState({ schoolBoardMembers: data });
                

            }
        });
    };


    componentDidMount() {
        this.loadschoolBoardMembers(this.state.schoolBoardMembers)
        this.renderUser()
        console.log(this.state.schoolBoardMembers)
    }


    componentWillReceiveProps() {
        this.renderUser()
    }

    handleChange = event => {
        this.setState({error: ''})
        this.setState({term: event.target.value})
    }

    search = (e) => {
        e.preventDefault()
        this.state.schoolBoardMembers.map(staff => {
            if (staff.name === this.state.term) {
                this.setState({searched: true, searchedschoolBoardMember: staff})
            } else {
                this.setState({searching: true, error: 'Staff member not found'})
            }
        })

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

    renderschoolBoardMembers = schoolBoardMembers => {

        return (
            <div  id='event' className='row container'>
                {schoolBoardMembers.map((schoolBoardMember, i) => {
                    const posterId = schoolBoardMember.postedBy
                        ? `/user/${schoolBoardMember.postedBy._id}`
                        : "";
                    const posterName = schoolBoardMember.postedBy
                        ? schoolBoardMember.postedBy.name
                        : " Unknown";

                        const photoUrl = schoolBoardMember.postedBy
                        ? `/user/photo/${
                            event.postedBy._id
                          }?${new Date().getTime()}`
                        : ''

                        const schoolBoardMemberPhoto = schoolBoardMember._id
                        ? `/spanishschoolBoardMember/photo/${
                            schoolBoardMember._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (

                        <div  className='col-md-4 mb-5' key={i}>
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={schoolBoardMemberPhoto} />
                            <Card.Body>
                                <Card.Title>{schoolBoardMember.name.substring(0, 100)}</Card.Title>
                                <Card.Text>
                                    {schoolBoardMember.title.substring(0, 100)}
                                </Card.Text>
                                <Card.Text>
                                    {schoolBoardMember.about.substring(0, 100)}
                                </Card.Text>
                                <Link
                                        to={`/spanish/schoolBoardMember/${schoolBoardMember._id}`}
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
        const { user, schoolBoardMembers, searched, spanishPage, khmerPage, englishPage, searchedschoolBoardMember, error } = this.state;
        if(spanishPage) {
            return <Redirect to={`/spanish/schoolBoardMember`} />
         } else if (englishPage) {
             return <Redirect to={'/schoolBoardMember'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmer/schoolBoardMember'} />
        } 

        if (searched) { return <Redirect to={`spanish/schoolBoardMember/${searchedschoolBoardMember._id}`}/> } 

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
                    <div style={{borderBottom: 'solid black 1px'}} className='row mt-4 mb-3'>
                        <h2 className="col-md-6">
                            Miembros de la junta escolar
                            {!schoolBoardMembers.length ? "Loading..." : ""}
                        </h2>
                        <br/>

                        <form className="col-md-6 text-center" onSubmit={this.search}>
                            <input placeholder='by schoolBoardMember name' type='text' value={this.state.term} onChange={this.handleChange} />
                            <Button onClick={this.search}>Search</Button>
                            {"  "}{error}
                        </form>
                        <hr/>
                    </div>
                    {
                        isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                            <div>
                                <Link className='mb-5' to='/spanish/new/schoolBoardMember'>Agregar miembro del consejo escolar</Link>
                            </div>
                        )
                    }
                
                    <div>               
                        {this.renderschoolBoardMembers(schoolBoardMembers)}
                    </div>   
                
                </div>
            </div>
        );
    }
}

export default SchoolBoardMember;