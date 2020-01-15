import React, { Component } from "react";
import { isAuthenticated, signout } from "../../auth";
import { create } from "./apiStudent";
import { Redirect, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';


class GenderPolicy extends Component {
    constructor() {
        super();
        this.state = {
            parent: "",
            student: "",
            birthday: "",
            contact: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false,
            spanishPage: false,
            englishPage: false,
            khmerPage: false
        };
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
        const {
            spanishPage, englishPage, khmerPage
        } = this.state;

        if(spanishPage) {
            return <Redirect to={`/spanish/genderpolicy`} />
         } else if (englishPage) {
             return <Redirect to={'/genderpolicy'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmer/genderpolicy'} />
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
                <div className='container mt-4' >
                    <h3>STUDENT FAQ: Transgender and Gender Expansive Student Policy</h3>
                    <div>
                        <p>
                            What does the term “Transgender” mean?
                            “Transgender” is an adjective describing a person whose gender identity or gender expression differs from the gender listed on that person’s 
                            original birth certificate. “Gender identity” is just like it sounds – what gender terms (male, female, a combination of genders, or no gender) a person uses for self-identification. “Gender expression” is how that person expresses his, her or their own gender to others, 
                            whether through dress, behavior or other activities.
                        </p>

                        <p>
                            Why is there a policy specifically for transgender and gender expansive students?
                            Providence Public Schools is committed to creating a safe and inclusive environment for all students. This policy describes ways that the school can create 
                            an environment in which transgender and gender expansive students feel comfortable and supported.
                        </p>

                        <p>
                            What is the district’s approach to transgender students’ using school restrooms and changing facilities?
                            Providence Public Schools allows transgender students to choose their restroom or changing facilities, based on the gender 
                            with which they identify or express themselves. Students who do not identify with the gender assigned to them at birth and who are uncomfortable choosing a male-segregated or female-segregated 
                            restroom may request the use of private restrooms. Similarly, they may request changing room accommodations, such as partitioning or a separate changing schedule.
                        </p>

                        <p>
                            On which sports teams do transgender students play?
                            Transgender students may choose which physical education and intramural teams they wish to join, based on their gender identity and expression. Students involved in interscholastic sports 
                            follow Rhode Island Interscholastic League rules: http://www.riil.org/index.php/resources/rules-and-regulations/.
                        </p>

                        <p>
                            How can I support transgender and gender expansive students?

                            Honor their choices, including the gender identity and gender expression they choose.
                            Follow their lead. Refer to transgender and gender expansive students with the same first names and pronouns they choose to identify themselves.
                            Point them to support. If you know a student who is undergoing or considering a gender transition, make sure they know that trained and caring adults, known as the Transgender and Gender Expansive Student Point Team, exist for them right in their own school.
                        </p>

                        <p>
                            If you are a transgender or gender expansive student enrolled in the Providence Public Schools,
                            <h3>You decide:</h3>
                            With whom you wish to share you gender identity and status.
                            What name you should be called and what pronoun to use for yourself. The name you choose to call yourself does not have to match what is on your birth certificate.
                            What restroom or changing room you want to use. You can also request a comfortable alternative, such as a partition or separate changing schedule or access to a private restroom.
                            What physical education and intramural teams you want to join, regardless of gender. If you are involved in interscholastic sports, you should follow R.I. Interscholastic League rules: http://www.riil.org/index.php/resources/rules-and-regulations/.
                        </p>
                        <p>
                            You can ask:
                            For support from your schools’ Transgender and Gender Expansive Student Point Team any time you need it. If you are undergoing or are planning to undergo a gender transition, point team members can create customized supports for you, and if appropriate, your family.
                        </p>

                        <p>  
                            Always report: 

                            Incidents of bullying, harassment and discrimination whether directed at you or another student.
                            These will be taken seriously and handled in a manner consistent with board policies and the law.             
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default GenderPolicy;