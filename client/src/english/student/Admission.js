import React, { Component } from "react";
import { isAuthenticated, signout } from "../../auth";
import { getAdmission } from "./apiStudent";
import { Redirect, Link } from "react-router-dom";
import AdmissionNews from './AdmissionNews'
import { Navbar, Nav, ListGroup, Dropdown, DropdownButton} from 'react-bootstrap';

class Admission extends Component {
        state = {
            error: "",
            user: {},
            admission: '',
            fileSize: 0,
            comments: [],
            loading: false,
            redirectToProfile: false,
            spanishPage: false,
            englishPage: false,
            khmerPage: false
        };


    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    updateComments = comments => {
        this.setState({comments})
    }

    componentDidMount() {
        this.renderUser()
        getAdmission().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    admission: data,
                    comments: data.comments
              })
              
            }
        }) 
    }

    componentWillReceiveProps() {
        this.renderUser()
        getAdmission().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    admission: data,
                    comments: data.comments
              })
              
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

    renderContact = () => {
        return (
            <div>
                <p style={{fontWeight: 'bold'}}>Contact</p>
                <p> Phone: (401) 254- 4829</p>
                <p> Email: admissions@uhschool.org</p>
                <p>1 Empire Plaza | Providence, RI 02903</p>
            </div>
        )
    }

    renderRequirements = (admission) => {
        return (
            <div>
                <h3>{admission.title}</h3>
                <div>
                    <AdmissionNews admissionId={admission._id} comments={this.state.comments} updateComments={this.updateComments} />
                </div>
            </div>
        )
    }

    renderAppLinks = () => {
        return (
            <div>
                <h4 style={{fontWeight: 'bold'}}>
                    Registration
                </h4>
                 <ListGroup variant="flush">
                        <ListGroup.Item> 
                            <Link onClick={() => { 
                                            window.open(`https://drive.google.com/file/d/1zkxOP_gez1IsVi7YPnH7DF5KjAZn7e8-/view?usp=sharing`) 
                                            }} >
                                    View English application form
                            </Link>
                        </ListGroup.Item>

                        <ListGroup.Item> 
                            <Link onClick={() => { 
                                            window.open(`https://drive.google.com/file/d/17Vya9qqFuHaAbH5KrDdO0rRXZi9cbYQP/view?usp=sharing`) 
                                            }} >
                                View Spanish application form
                            </Link>
                        </ListGroup.Item>

                        <ListGroup.Item> 
                            <Link onClick={() => { 
                                            window.open(`https://drive.google.com/file/d/14nIKl8FHPsXm3nq0D0hcAEmbAFP5EPbY/view?usp=sharing`) 
                                            }} >
                                View Portuguese application form
                            </Link>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Link to='/new/application'>
                                Submit Student application
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
            </div>
        )
    }
    
    render() {
        const {
            admission, comments, spanishPage, englishPage, khmerPage
        } = this.state;

        console.log(admission)

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
                    <p className='text-center'> 
                        Welcome to our Admissions section. 
                        Here you can view and download a copy of our application as well as submit a completed form to us. 
                    </p>
                    
                    <div className='row mt-5'>
                        <div className='col-md-3 mt-4'>
                                {this.renderAppLinks()}
                            
                            <div className='mt-4'>
                                {this.renderContact()}
                            </div>  
                        </div>

                            

                        <div className='col-md-6 text-center'>
                            {this.renderRequirements(admission)}
                        </div>

                                     
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Admission;