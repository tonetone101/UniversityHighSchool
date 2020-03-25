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
            <div  >
                <Navbar  id='topHeader' collapseOnSelect expand="lg" variant="dark" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                    {/* <DropdownButton id="dropdown-basic-button" title="translator"  >
                                <Dropdown.Item ><a onClick={this.translateSpanish}>Spanish</a>
                                </Dropdown.Item>
                                <Dropdown.Item ><a onClick={this.translateKhmer}>Cambodian</a>
                                </Dropdown.Item>

                                <Dropdown.Item><a onClick={this.translateEnglish}>English</a></Dropdown.Item>

                                <Dropdown.Item><a onClick={this.translatePort}>Portuguese</a></Dropdown.Item>
                            
                    </DropdownButton> */}

                        
                           
                                <div id='link'>
                                    <Nav.Link><Link style={{color: 'black'}} to='/boardmeeting'>School Board</Link></Nav.Link>

                                </div>
                                <div id='link'>
                                    <Nav.Link><Link style={{color: 'black'}} to='/staff'>Faculty</Link></Nav.Link>

                                </div>

                                {
                            !this.state.user && (
                                <Nav >

                                <Nav.Link >
                                    <Link to='/signin' style={{color: 'black'}}>
                                        Sign In 
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{color: 'black'}} to='/signup' >
                                        Sign Up
                                    </Link>
                                </Nav.Link>
                               </Nav>
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
                        

                        {
                            isAuthenticated() && isAuthenticated().user.code === 8290 && (
                                <Nav>
                                <div id='link' >
                                        <Nav.Link>
                                            <Link style={{color: 'black'}} to='/app' >
                                            Submitted Applications
                                            </Link>
                                        </Nav.Link>
                                    </div>
                                    <div id='link' >
                                        <Nav.Link>
                                            <Link style={{color: 'black'}} to='/applicants' >
                                                Pre-registered Applicants
                                            </Link>
                                        </Nav.Link>
                                    </div>
                                </Nav>
                            )
                        }

                        {
                            isAuthenticated() && isAuthenticated().user.code === 2609 && (
                                <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                                <div id='link' >
                                        <Nav.Link>
                                            <Link style={{color: 'black'}} to='/apps' >
                                            Submitted Applications
                                            </Link>
                                        </Nav.Link>
                                    </div>
                                    <div id='link' >
                                        <Nav.Link>
                                            <Link style={{color: 'black'}} to='/applicants' >
                                                Pre-registered Applicants
                                            </Link>
                                        </Nav.Link>
                                    </div>
                                </Nav>
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
           
            <div >
                <Navbar id='menu' collapseOnSelect expand="lg" variant="dark"  >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                    <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                        <div id='link'>                        
                            <Nav.Link>
                                <Link style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}} to='/'>
                                    <img  style={{height: '100px'}} src={require("../../images/uhsBannerLogo.png")} />
                                </Link>
                            </Nav.Link>
                        </div>
                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}} to='/abo'>About Us</Link></Nav.Link>
                        </div>
                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}} to='/aca'>Academics</Link></Nav.Link>
                        </div>

                       
                        {/* <Nav.Link><Link style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}} to='/student'>Students</Link></Nav.Link> */}
                        
                        
                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}} to='/admiss'>Admissions</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}} to='/con'>Contact us</Link></Nav.Link>
                        </div>                     

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}} to='/images'>Gallery</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}} to='/events'>Upcoming Events</Link></Nav.Link>
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
            return <Redirect to={`/signin`} />
         } 

      return (
          <div>
            {this.renderTopHeader()}
            {this.renderMenu()}
          </div>
      )
  }
}

export default Header