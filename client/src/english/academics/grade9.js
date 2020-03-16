import React, { Component } from "react";
import { list } from "./apiAcademics";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import {isAuthenticated} from '../../auth'
import Header from '../header/Header'

const isActive = (history, path) => {
    if (history.location.pathname === path) return {
      color: '#ff9900'
    } 
  }

class Grade9 extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            academics: [],
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

    componentDidMount() {
        this.loadacademics()
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    subMenu = () => {
        const {history} = this.props

        return (
            <div className='row container'>
                <h3 className='mb-2 mr-5' style={{fontWeight: 'bold', fontStyle: 'italic'}}>
                    Stages |
                </h3>
                <div className='mb-2 mr-5'>
                    <Link style={isActive(history, '/grade9')} to='/grade9'>
                            Risers |
                    </Link>
                </div>

                <div className='mb-2 mr-5'>
                    <Link style={isActive(history, '/grade10')} className='mt-4' to='/grade10'>
                            Investigators |
                    </Link>
                </div>

                <div className='mb-2'>
                    <Link style={isActive(history, '/grade11')} className='mt-4' to='/grade11'>
                            Navigators
                    </Link>
                </div>
            </div>
        )
    }

    render() {
        const { academics, redirectToSignIn } = this.state
        const {history} = this.props

        if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         } 
        
        return (
            <div>
               <Header history={this.props.history} />
                {this.subMenu(history)}
                  <div className='container mt-4'>
                     <h1 style={{fontWeight: 'bold'}}>Risers</h1>
                      <div  >
                        
                      {isAuthenticated().user && isAuthenticated().user.code === 8290 ? ( 
                          <div>
                            <Link to={`/update/academics/${academics._id}`} className='btn btn-raised btn-primary'>Update academics</Link>
                          </div> 
                          ) : ( null)
                         }

                        {isAuthenticated().user && isAuthenticated().user.code === 2609 ? ( 
                          <div>
                            <Link to={`/update/academics/${academics._id}`} className='btn btn-raised btn-primary'>Update academics</Link>
                          </div> 
                          ) : ( null)
                         }


                      </div>
                      <hr />
                      
                      <div id='title' className='row container'>
                            <div className='col-md-4 column mt-5'>
                                <h3 className='mb-2' style={{fontWeight: 'bold', fontStyle: 'italic'}}>
                                    Stages
                                </h3>
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
                                    <h3 className='mb-3' style={{fontStyle: 'oblique'}}>A Riser's Goal</h3>
                                    <p className='mb-3'>{academics.grade9Expect}</p>

                                    <h3 className='mb-3' style={{fontStyle: 'oblique'}} >The Curriculum</h3>
                                    <p className='mb-3'>{academics.grade9Curric}</p>
                            </div>
                        
                         
                      </div>
                      
                  </div> 
                  
              
            </div>
            
        );
    }
}

export default withRouter(Grade9);


