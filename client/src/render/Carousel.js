import React from 'react';
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';
import { Redirect} from "react-router-dom";
import EnglishCarousel from '../english/carousel/Carousel'
import SpanishCarousel from '../spanish/carousel/Carousel'


class CarouselTranslator extends React.Component {
    state = {
        spanishPage: false
    }

    translateSpanish = () => {
        this.setState({spanishPage: true})
    }

    render() {
        if(this.state.spanishPage) {
            return <Redirect to='/spanish' />
        }

        return (
            <div>
                <Navbar id='topHeader' collapseOnSelect expand="lg" variant="dark" >
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto " >
                            <DropdownButton id="dropdown-basic-button" title="Translator"  >
                                <Dropdown.Item href="#/action-1"><a onClick={this.translateSpanish()}>Spanish</a>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2"><a onClick={() => {
                                                            window.open('https://translate.google.com/translate?hl=en&tab=TT0&authuser=0&sl=en&tl=km&u=www.uhSchool.org', '_blank')
                                                        }}>Cambodian</a>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3"><a>Hmong</a></Dropdown.Item>

                                <Dropdown.Item href="#/action-3"><a>English</a></Dropdown.Item>

                                <Dropdown.Item href="#/action-3"><a>Portuguese</a></Dropdown.Item>
                            
                            </DropdownButton>
                                
                            
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
            </div>
        )
    }
}

export default CarouselTranslator;