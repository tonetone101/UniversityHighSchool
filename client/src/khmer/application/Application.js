import React, { Component } from "react";
import { list, read } from "./apiApplication";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated, signout} from '../../auth'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton, Card, Button, InputGroup, FormControl} from 'react-bootstrap';

class Application extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            applications: [],
            spanishPage: false,
            englishPage: false,
            term: '',
            searched: false,
            searchedApplication: '',
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

    loadApplications = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data)
                this.setState({ applications: data });
                

            }
        });
    };


    componentDidMount() {
        this.loadApplications(this.state.applications)
        this.renderUser()
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
        this.state.applications.map(application => {
            if (application.name === this.state.term) {
                this.setState({searched: true, searchedApplication: application})
            } else {
                this.setState({searching: true, error: 'Application not found'})
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
            <div style={{border: 'solid black 2px', width: '100%'}}>
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
                                    <Link className='ml-3' to='/khmer/signin' style={{color: 'white'}}>
                                    ចុះឈ្មោះ
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{color: 'white'}} to='/khmer/signup' >
                                    ចុះឈ្មោះ
                                    </Link>
                                </Nav.Link>
                               </nav>
                            )
                        }
                        
                        {
                            this.state.user && (
                                <Nav.Link>
                                    <a style={{color: 'white'}}  onClick={() => signout(() => {
                                        this.props.history.push('/khmer')
                                    })}>
                                        ផ្តាច់
                                    </a>
                                </Nav.Link>
                            )
                        }

                        {
                            isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                <Nav.Link>
                                    <Link style={{color: 'white', marginLeft: '1070px'}} to='/khmer/application' >
                                        ពាក្យសុំ
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
                            <Nav.Link ><Link style={{color: 'white'}} to='/khmer'>ផ្ទះ</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/khmer/about'>អំពី​ពួក​យើង</Link></Nav.Link>
                        </div>

                       <div id='link'>                
                           <Nav.Link ><Link style={{color: 'white'}} to='/khmer/faculty'>មហាវិទ្យាល័យ</Link></Nav.Link>
                        </div>
                        <Nav.Link ><Link style={{color: 'white'}} to='/khmer/student'>និស្សិត</Link></Nav.Link>
                        
                        
                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/khmer/admission'>ការចូលរៀន</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/khmer/schoolBoardMeeting'>ក្រុមប្រឹក្សាភិបាលសាលា</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/khmer/partners'>ដៃគូរបស់យើង</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/khmer/images'>វិចិត្រសាល</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/khmerevents'>ព្រឹត្តិការណ៍ជិតមកដល់</Link></Nav.Link>
                        </div>
                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }

    renderApplications = applications => {

        return (
            <div  id='event' className='row container'>
                {applications.map((application, i) => {
                    const posterId = application.postedBy
                        ? `/user/${application.postedBy._id}`
                        : "";
                    const posterName = application.postedBy
                        ? application.postedBy.name
                        : " Unknown";

                        const photoUrl = application.postedBy
                        ? `/user/photo/${
                            event.postedBy._id
                          }?${new Date().getTime()}`
                        : ''

                        const applicationFile = application._id
                        ? `/application/photo/${
                            application._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (

                        <div  className='col-md-4 mb-5' key={i}>
                            <Link
                                to={`/application/${application._id}`}
                                className="mb-4 ml-5"
                                >
                                {application.name}
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { user, applications, searched, spanishPage, khmerPage, englishPage, searchedApplication, error } = this.state;
        if(spanishPage) {
            return <Redirect to={`/spanish/application`} />
         } else if (englishPage) {
             return <Redirect to={'/application'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmer/application'} />
        } 

        if (searched) { return <Redirect to={`application/${searchedApplication._id}`}/> } 

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
                        ពាក្យសុំ
                            {!applications.length ? "Loading..." : ""}
                        </h2>
                        <br/>

                        <form className="col-md-6 text-center" onSubmit={this.search}>
                            <input placeholder='by application name' type='text' value={this.state.term} onChange={this.handleChange} />
                            <Button onClick={this.search}>Search</Button>
                            {"  "}{error}
                        </form>
                        <hr/>
                    </div>
                
                    <div>               
                        {this.renderApplications(applications)}
                    </div>   
                
                </div>
            </div>
        );
    }
}

export default Application;