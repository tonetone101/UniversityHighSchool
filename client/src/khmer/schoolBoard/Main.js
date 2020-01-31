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
                     <h1>សូមស្វាគមន៍ចំពោះផ្នែកប្រជុំសាលារបស់យើង</h1>
                      <div  >
                        
                        {isAuthenticated().user && isAuthenticated().user.role === 'admin' ? ( 
                          <div>
                            <Link to={`/khmer/newschoolBoardMeeting`} className='btn btn-raised btn-primary'>Add schoolBoardMeeting in khmers</Link>
                          </div> 
                          ) : ( null)
                         }
                         <Link to={`/khmer/schoolBoardMember`} className='btn btn-raised btn-primary mt-4'>Board Members in khmer</Link>

                      </div>
                      <hr />
                      
                      <div id='title'>
                         <h3>ប្រជុំនឹងមកដល់:</h3> 
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
                                                <Link to={`/khmer/schoolBoardMeeting/${schoolBoardMeeting._id}`} className='ml-2 text-danger'>មើល</Link>
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


