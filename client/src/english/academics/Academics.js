import React, { Component } from "react";
import { list, listContent } from "./apiAcademics";
import { Link, Redirect, withRouter } from "react-router-dom";
import { ListGroup} from 'react-bootstrap';
import {isAuthenticated} from '../../auth'
import Header from '../header/Header'
import { Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'

const isActive = (history, path) => {
    if (history.location.pathname === path) return {
      color: '#ff9900'
    } 
  }

class Academics extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            academics: [],
            contents: [],
            url: '',
            docUrl: '',
            redirectToacademics: false,
            redirectToSignIn: false
        };
       
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    loadacademics = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({academics: data.find(d => {
                    if (d._id == "5e59194d4465c2d4a3afa744") {
                        return d
                    }
                }) 
              })
              
            }
        }) 
    };

    loadContent = () => {
        listContent().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({contents: data 
              })
              
            }
        }) 
    };

    componentDidMount() {
        this.loadContent()
        this.loadacademics()
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    renderContent = contents => {
        return (
            <div className='container'>
                {contents.map((content, i) => {
                        const contentPhoto = content._id
                        ? `/link/photo/${
                            content._id
                          }?${new Date().getTime()}`
                        : ''

                    return (
                        <div className='row' key={i}>
                           <div className='col-md-6'>
                                <h2>{content.title}</h2>
                                <p>{content.body}</p>
                           </div>

                            <div className='col-md-6'>
                                <img src={contentPhoto} height='100' width='100'/>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    renderCards = () => {
        return (
            <div className='row mb-5' style={{backgroundColor: 'white'}}>
                <div className='col-sm-4'>
                    <Card style={{ width: '18rem' }} id='academicCards' >
                        <Card.Header>                        
                            <img id='imgCard' className='text-center' style={{height: '200px', width: '250px'}} src={require("../../images/RISERLOGO.png")} />
                        </Card.Header>
                       
                        <Card.Body>
                            <Card.Title style={{fontWeight: 'bold'}}>RISERS</Card.Title>
                            <Card.Text>
                                A RISER's main focus is to figure who you are as a learner, an individual,
                                as part of a collective (family, community, etc), a professional and interest.     
                            </Card.Text>
                            <Link
                                    to={`/grade9`}
                                    className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                >
                                    Read more
                            </Link>
                        </Card.Body>
                    </Card>
                </div>

                <div className='col-md-4'>
                    <Card style={{ width: '18rem' }} id='academicCards' >
                    <Card.Header>                        
                        <img id='imgCard' className='text-center' style={{height: '200px', width: '250px'}} src={require("../../images/invest.png")} />
                    </Card.Header>
                        <Card.Body>
                            <Card.Title style={{fontWeight: 'bold'}}>INVESTIGATORS</Card.Title>
                            <Card.Text>
                               An INVESTIGATOR is about continueing to hone in on the understandings
                               gained from being a RISER and dive deeper into interest through inquiry     
                            </Card.Text>
                            <Link
                                    to={`/grade10`}
                                    className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                >
                                    Read more
                            </Link>
                        </Card.Body>
                    </Card>
                </div>

                <div className='col-md-4' >
                    <Card style={{ width: '18rem'}} id='academicCards' >
                    <Card.Header>                        
                        <img id='imgCard' className='text-center' style={{height: '200px', width: '250px'}} src={require("../../images/navi.png")} />
                    </Card.Header>
                        {/* <Card.Img variant="top" style={{height: '200px', width: ''}} src={require("../../images/navigators.png")} /> */}
                        <Card.Body>
                            <Card.Title style={{fontWeight: 'bold'}}>NAVIGATORS</Card.Title>
                            <Card.Text>
                                A NAVIGATOR's main focus is to continue honing in on understandings gained from being a 
                                RISER and INVESTIGATOR. Must build compacity for self and others.

                            </Card.Text>
                            <Link
                                    to={`/grade11`}
                                    className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                >
                                    Read more
                            </Link>
                        </Card.Body>
                    </Card>
                </div>
                 
            </div>
        )
    }


    render() {
        const { academics, redirectToSignIn } = this.state
        console.log(academics)
        const {history} = this.props

        if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         } 
        
        return (
            <div>
               <Header history={this.props.history} />
                  <div className='container mt-4'>
                     <h1 style={{fontWeight: 'bold'}} className='text-center'>Academics at University High School</h1>
                     <h4 className='text-center'>
                         It's more than just surviving it's about <h3 id='thrive'>Thriving!</h3>
                     </h4>
                      <div  >
                        
                        {isAuthenticated().user && isAuthenticated().user.code === 8290 ? ( 
                            <div>
                                <div className='mb-3'>
                                    <Link to={`/update/academics/${academics._id}`} className='btn btn-raised btn-primary'>Update academics</Link>
                                </div> 

                                <div className='mb-3'>
                                    <Link to={`/content/new`} className='btn btn-raised btn-primary'>add content</Link>
                                </div> 
                            </div>
                          ) : ( null)
                         }

                        {isAuthenticated().user && isAuthenticated().user.code === 2609 ? ( 
                         <div>
                            <div className='mb-3'>
                                <Link to={`/update/academics/${academics._id}`} className='btn btn-raised btn-primary'>Update academics</Link>
                            </div> 

                            <div className='mb-3'>
                                <Link to={`/content/new`} className='btn btn-raised btn-primary'>add content</Link>
                            </div> 
                        </div> 
                          ) : ( null)
                         }


                      </div>
                      <hr />
                      <div className='container mb-5'>
                        {this.renderCards()}
                      </div>

                      <div className='container mt-5'>
                          {this.renderContent()}
                      </div>
                      
                      {/* <div id='title' className='row container'>
                            <div className='col-md-4 column mt-5'>
                                <div className='mb-2'>
                                    <Link style={isActive(history, '/grade9')} to='/grade9'>
                                            Risers
                                    </Link>
                                </div>

                                <div className='mb-2'>
                                    <Link style={isActive(history, '/grade10')} className='mt-4' to='/grade10'>
                                           Investigators
                                    </Link>
                                </div>

                                <div className='mb-2'>
                                    <Link style={isActive(history, '/grade11')} className='mt-4' to='/grade11'>
                                            Navigators
                                    </Link>
                                </div>
                            </div>

                            
                            <div className='col-md-8 mt-4'>
                                    <h3>Our Goal</h3>
                                    <p>{academics.intro}</p>
                                    <p>{academics.paragraph1}</p>
                                    <p>{academics.paragraph2}</p>
                                    <p>{academics.paragraph3}</p>
                                    <p>{academics.paragraph4}</p>
                                
                            </div>
                            
                         
                      </div> */}
                      
                  </div> 
                  
              
            </div>
            
        );
    }
}

export default withRouter(Academics);


