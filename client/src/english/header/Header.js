import React from 'react'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';
import {signout, isAuthenticated} from '../../auth'
import {Link, Redirect } from 'react-router-dom'


class Header extends React.Component {
    state = {
        user: '',
        signedout: false,
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
                                        this.setState({
                                            signedout: true
                                        })
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

  render() {
    const {spanishPage, englishPage, khmerPage, redirectToSignIn, signedout } = this.state
        if(spanishPage) {
            return <Redirect to={`/spanish`} />
         } else if (englishPage) {
             return <Redirect to={'/'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmer'} />
        }
         else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         } 
         else if(signedout) {
             return <Redirect to={'/'} />
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
          </div>
      )
  }
}

export default Header