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
        console.log(comments)
    }

    componentDidMount() {
        this.renderUser()
        const admissionId = this.props.match.params.admissionId
        getAdmission(admissionId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    admission: data,
                    comments: data.comments,
                    loading: true

              }, () => {
                    console.log(this.state.comments)
              })
              
            }
        }) 
    }

    UNSAFE_componentWillReceiveProps(props) {
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
    renderContact = () => {
        return (
            <div>
                <p style={{fontWeight: 'bold'}}>ទំនាក់ទំនង</p>
                <p> ទូរស័ព្ទ: (401) 254- 4829</p>
                <p> អ៊ីមែល: admissions@uhschool.org</p>
                <p>1 Empire Plaza | Providence, RI 02903</p>
            </div>
        )
    }

    renderRequirements = (admission) => {
        const {comments} = this.state
        return (
            <div>
                <h3>{admission.title}</h3>
                <div className='mt-5'>
                    {this.state.loading &&
                        <AdmissionNews admissionId={admission._id} comments={comments.reverse()} updateComments={this.updateComments} />
                    }
                </div>
            </div>
        )
    }

    renderAppLinks = () => {
        return (
            <div>
                <h4 style={{fontWeight: 'bold'}}>
                ការចុះឈ្មោះ
                </h4>
                 <ListGroup variant="flush">
                        <ListGroup.Item> 
                            <Link onClick={() => { 
                                            window.open(`https://drive.google.com/file/d/1zkxOP_gez1IsVi7YPnH7DF5KjAZn7e8-/view?usp=sharing`) 
                                            }} >
                                មើលពាក្យសុំជាភាសាអង់គ្លេស
                            </Link>
                        </ListGroup.Item>

                        <ListGroup.Item> 
                            <Link onClick={() => { 
                                            window.open(`https://drive.google.com/file/d/17Vya9qqFuHaAbH5KrDdO0rRXZi9cbYQP/view?usp=sharing`) 
                                            }} >
                                មើលពាក្យសុំជាភាសាអេស្ប៉ាញ
                            </Link>
                        </ListGroup.Item>

                        <ListGroup.Item> 
                            <Link onClick={() => { 
                                            window.open(`https://drive.google.com/file/d/14nIKl8FHPsXm3nq0D0hcAEmbAFP5EPbY/view?usp=sharing`) 
                                            }} >
                                មើលពាក្យសុំព័រទុយហ្កាល់
                            </Link>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Link to='/khmer/new/application'>
                                បញ្ជូនពាក្យសុំនិស្សិត
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

        console.log(comments.text)

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
                        សូមស្វាគមន៍ចំពោះផ្នែកចូលរៀនរបស់យើង។
                        នៅទីនេះអ្នកអាចមើលនិងទាញយកច្បាប់ចម្លងនៃពាក្យសុំរបស់យើងក៏ដូចជាបញ្ជូនសំណុំបែបបទដែលបានបំពេញជូនយើង។
                    </p>
                    
                    <div className='row mt-5'>
                        <div className='col-md-3 mt-4'>
                                {this.renderAppLinks()}
                            
                            <div className='mt-4'>
                                {this.renderContact()}
                            </div>  
                        </div>

                            

                        <div className='col-md-6'>
                            {this.renderRequirements(admission)}
                           
                        </div>

                                     
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Admission;