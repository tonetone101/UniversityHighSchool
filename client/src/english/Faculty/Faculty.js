import React, { Component } from "react";
import { list, read } from "./apiFaculty";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated, signout} from '../../auth'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton, Card, Button, InputGroup, FormControl} from 'react-bootstrap';

class Faculty extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            faculties: [],
            spanishPage: false,
            englishPage: false,
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
        console.log(this.state.faculties)
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
        this.state.faculties.map(staff => {
            if (staff.name === this.state.term) {
                this.setState({searched: true, searchedFaculty: staff})
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
                                    <Link className='ml-3' to='/signin' style={{color: 'black'}}>
                                        Sign In 
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{color: 'black'}} to='/signup' >
                                        Sign Up
                                    </Link>
                                </Nav.Link>
                               </nav>
                            )
                        }
                        
                        {
                            this.state.user && (
                                <Nav.Link>
                                    <a style={{color: 'black'}}  onClick={() => signout(() => {
                                        this.props.history.push('/')
                                    })}>
                                        Sign Out
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
            <div style={{position: 'relative fixed'}}>
                 <Navbar id='menu' collapseOnSelect expand="lg" variant="dark"  >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                    <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                         <div id='link'>                        
                            <Nav.Link href="#features"><Link style={{color: 'white'}} to='/'>Home</Link></Nav.Link>
                        </div>

                       <div id='link'>                
                           <Nav.Link href="#features"><Link style={{color: 'white'}} to='/faculty'>Faculty</Link></Nav.Link>
                        </div>
                        <Nav.Link href="#features"><Link style={{color: 'white'}} to='/student'>Students</Link></Nav.Link>
                        
                        
                        <div id='link'>                        
                            <Nav.Link href="#features"><Link style={{color: 'white'}} to='/admission'>Admission</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link href="#features"><Link style={{color: 'white'}} to='/schoolboard'>School Board</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link href="#features"><Link style={{color: 'white'}} to='/partners'>Our Partners</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link href="#features"><Link style={{color: 'white'}} to='/images'>Gallery</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link href="#features"><Link style={{color: 'white'}} to='/events'>Upcoming Events</Link></Nav.Link>
                        </div>
                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }


    renderFaculties = faculties => {

        return (
            <div  id='event' className='row container'>
                {faculties.map((faculty, i) => {
                    const posterId = faculty.postedBy
                        ? `/user/${faculty.postedBy._id}`
                        : "";
                    const posterName = faculty.postedBy
                        ? faculty.postedBy.name
                        : " Unknown";

                        const photoUrl = faculty.postedBy
                        ? `/user/photo/${
                            event.postedBy._id
                          }?${new Date().getTime()}`
                        : ''

                        const facultyPhoto = faculty._id
                        ? `/faculty/photo/${
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
                                        to={`/faculty/${faculty._id}`}
                                        className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                    >
                                        Read more
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
        const { user, faculties, searched, spanishPage, khmerPage, englishPage, searchedFaculty, error } = this.state;
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
                    <div style={{borderBottom: 'solid black 1px'}} className='row mt-4 mb-3'>
                        <h2 className="col-md-6">
                            Our Team
                            {!faculties.length ? "Loading..." : ""}
                        </h2>
                        <br/>

                        <form className="col-md-6 text-center" onSubmit={this.search}>
                            <input placeholder='by faculty name' type='text' value={this.state.term} onChange={this.handleChange} />
                            <Button onClick={this.search}>Search</Button>
                            {"  "}{error}
                        </form>
                        <hr/>
                    </div>
                    {
                        isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                            <div>
                                <Link className='mb-5' to='/new/faculty'>Add Faculty</Link>
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