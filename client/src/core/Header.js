import React from 'react'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {signout, isAuthenticated} from '../auth';
import {Link, withRouter} from 'react-router-dom'

const Header = ({history}) => {
    console.log(isAuthenticated().user)

    
        return (
            <Navbar collapseOnSelect expand="lg" style={{height: '100px'}} variant="dark">
                <Navbar.Brand >
                    <img
                        style={{ height: "75px", width: "75px" }}
                        
                        src={require("../images/banner.png")}
                        alt="Second slide"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                  
                    

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
}

export default withRouter(Header)