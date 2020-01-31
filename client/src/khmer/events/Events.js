import React, { Component } from "react";
import { list, read } from "./apiEvent";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated, signout} from '../../auth'
import cookie from "react-cookies";
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';



class Events extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            events: [],
            page: 1,
            spanishPage: false,
            englishPage: false,
            khmerPage: false
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    loadEvents = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data)
                this.setState({ events: data });
                

            }
        });
    };


    componentDidMount() {
        this.loadEvents(this.state.events)
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



    renderEvents = events => {

        return (
            <div  id='event' className='row container'>
                {events.map((event, i) => {
                    const posterId = event.postedBy
                        ? `/user/${event.postedBy._id}`
                        : "";
                    const posterName = event.postedBy
                        ? event.postedBy.name
                        : " Unknown";

                        const photoUrl = event.postedBy
                        ? `${process.env.REACT_APP_API_URL}/user/photo/${
                            event.postedBy._id
                          }?${new Date().getTime()}`
                        : ''

                        const eventPhoto = event._id
                        ? `${process.env.REACT_APP_API_URL}/khmer/event/photo/${
                            event._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (
                        <div  className="card col-md-6 mb-4" key={i}>
                            <div  >
                                
                               
                                <p className="font-italic mark mt-4">
                                    ព្រឹត្តិការណ៍ដែលបានបោះពុម្ពផ្សាយនៅក្នុង{" "}

                                    {/* <Link to={`${posterId}`}>
                                        <img  style={{ height: "40px", borderRadius:'30px', width: "40px" }} className="img-thumbnail" src={photoUrl} alt='' />

                                        {posterName}{" "}
                                    </Link> */}
                                   
                                    {new Date(event.created).toDateString()}
                                </p>
                                <br />

                                <div className="card-text column mr-5">
                                    <p >
                                        ឈ្មោះព្រឹត្តិការណ៍: {event.title.substring(0, 100)}{' '}
                                    </p>  
                                    
                                    {/* <p >
                                       Date : {event.date.substring(0, 100)}{' '}
                                    </p>   */}

                                    {/* <p >
                                       Time: {event.time.substring(0, 100)}{' '}
                                    </p>  */}

                                     <p >
                                        ទីតាំង: {event.where.substring(0, 100)}{' '}
                                    </p>      

                                    <p >
                                        ការពិពណ៌នា: {event.body.substring(0, 100)}{' '}
                                    </p>           
                                </div>
                                                       
                             
                                {/* <img
                                    src={eventPhoto}
                                    className="img-thunbnail mb-3"
                                    style={{ height: "200px", width: "100%" }}
                                /> */}
                                <Link
                                    to={`/khmer/event/${event._id}`}
                                    className="btn btn-raised btn-primary btn-sm mb-4"
                                >
                                    សូមអានបន្ថែម
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { user, spanishPage, englishPage, khmerPage, events } = this.state;
        
        if(spanishPage) {
            return <Redirect to={`/spanishevents`} />
         } else if (englishPage) {
             return <Redirect to={'/events'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmerevents'} />
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
                <div className="container">
                    
                    <h2 className="mt-5 mb-5">
                        {!events.length ? "កំពុងផ្ទុក..." : ""}
                    </h2>
                    {
                        isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                            <div>
                                <Link className='mb-5' to='/khmer/new/event'>បន្ថែមព្រឹត្តិការណ៍</Link>
                            </div>
                        )
                    }
                
                    <div>               
                        {this.renderEvents(events)}
                    </div>   
                
                </div>
            </div>
        );
    }
}

export default Events;