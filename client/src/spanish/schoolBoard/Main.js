import React, { Component } from "react";
import { list, read, remove  } from "./apiSchoolBoardMeeting";
import { Link, Redirect } from "react-router-dom";
import { ListGroup} from 'react-bootstrap';
import {signout, isAuthenticated} from '../../auth'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            schoolBoardMeeting: [],
            url: '',
            docUrl: '',
            redirectToschoolBoardMeeting: false,
            redirectToSignIn: false
        };
       
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    loadschoolBoardMeeting = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data)
                this.setState({ schoolBoardMeeting: data, url: data.url, docUrl: data.docUrl });
                

            }
        });
    };

      componentDidMount() {
         this.loadschoolBoardMeeting()
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
    

    render() {
        const { user, spanishPage, englishPage, khmerPage, schoolBoardMeeting, url, redirectToSignIn } = this.state;
        console.log(schoolBoardMeeting)

        if(spanishPage) {
            return <Redirect to={`/spanish/schoolBoardMeeting`} />
         } else if (englishPage) {
             return <Redirect to={'/schoolBoardMeeting'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmer/schoolBoardMeeting'} />
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
                  <div className='container mt-4'>
                     <h1>Welcome to our schoolBoard Meeting section</h1>
                      <div  >
                        
                        {isAuthenticated().user && isAuthenticated().user.role === 'admin' ? ( 
                          <div>
                            <Link to={`/newschoolBoardMeeting`} className='btn btn-raised btn-primary'>Add schoolBoardMeeting</Link>
                          </div> 
                          ) : ( null)
                         }
                         <Link to={`/schoolBoardMember`} className='btn btn-raised btn-primary mt-4'>Board Members</Link>

                      </div>
                      <hr />
                      
                      <div id='title'>
                         <h3>Upcoming Meetings:</h3> 
                        {schoolBoardMeeting.reverse().map((schoolBoardMeeting,  i) => (
                        
                            <div key={i}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item> 
                                        <Link onClick={() => { 
                                            window.open(`${schoolBoardMeeting.url}`) 
                                            }}  
                                        >
                                            {schoolBoardMeeting.body}
                                        </Link>
                                        {
                                            isAuthenticated().user && isAuthenticated().user.role === 'admin' ? (
                                                <Link to={`/schoolBoardMeeting/${schoolBoardMeeting._id}`} className='ml-2 text-danger'>view</Link>
                                            ) : (null)
                                        }
                                    </ListGroup.Item>
                                    <ListGroup.Item></ListGroup.Item>
                                </ListGroup>
                          
                            </div>
                        ))}
                         
                      </div>
                      
                  </div> 
                  
              
            </div>
            
        );
    }
}

export default Main;


