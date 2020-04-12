import React, { Component } from "react";
import { lister } from "./apiAcademics";
import { Link, Redirect, withRouter } from "react-router-dom";
import { ListGroup} from 'react-bootstrap';
import {isAuthenticated} from '../../auth'
import Header from '../header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnchor } from '@fortawesome/free-solid-svg-icons'


class AchorPage extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            carousel: [],
            url: '',
            docUrl: '',
            redirectTocarousel: false,
            redirectToSignIn: false
        };
       
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    loadcarousel = () => {
         lister().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({carousel: data.find(d => {
                    if (d._id == "5e21c9ab9195bc7dc99dcfb3") {
                        return d
                    }
                }) 
              })
              
            }
        }) 
    };

    componentDidMount() {
        this.loadcarousel()
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }


    render() {
        const { carousel, redirectToSignIn } = this.state
        const {history} = this.props

        if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         } 
        
        return (
            <div>
               <Header history={this.props.history} />
                  <div className='container mt-4'>
                      <div className="title text-center mb-5">
                        <h1 className="text-uppercase" style={{fontWeight: 'bold'}}>Learning Anchors</h1>
                        <div className='icon'>
                            <FontAwesomeIcon  icon ={faAnchor} />
                        </div>                  
                        <div className="title-underline"></div>
                    </div>
                      <div  >
                        
                      {isAuthenticated().user && isAuthenticated().user.code === 8290 ? ( 
                          <div>
                            <Link to={`/edit/carousel/${carousel._id}`} className='btn btn-raised btn-primary'>Edit Achor info</Link>
                          </div> 
                          ) : ( null)
                         }

                        {isAuthenticated().user && isAuthenticated().user.code === 2609 ? ( 
                          <div>
                            <Link to={`/edit/carousel/${carousel._id}`} className='btn btn-raised btn-primary'>Edit Anchor info</Link>
                          </div> 
                          ) : ( null)
                         }


                      </div>
                      <hr />
                      
                      <div id='title' className='container row'>
                            <img className='mb-4 mt-4 col-6' style={{height: '500px', width: '800px', marginTop: '10px'}} src={require("../../images/anchors.png")} />
                        
                            <div className='mb-4 mt-4 col-6'>
                                
                                    <h3 className='mb-3' style={{fontWeight: 'bold', color: '#649CD0'}}>Compentency</h3>
                                    <p className='mb-3' >{carousel.caption1}</p>
                                    
                                    <h3 className='mb-3' style={{fontWeight: 'bold', color: '#70DE57'}}>Language Acquisition</h3>
                                    <p className='mb-3'>{carousel.caption2}</p>

                                     <h3 className='mb-3' style={{fontWeight: 'bold', color: '#F8BE45'}}>Restorative</h3>
                                    <p className='mb-3'>{carousel.missionStatement}</p>
                                
                            </div>
                        
                         
                      </div>
                      
                  </div> 
                  
              
            </div>
            
        );
    }
}

export default withRouter(AchorPage);


