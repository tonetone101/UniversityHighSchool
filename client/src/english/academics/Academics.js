import React, { Component } from "react";
import { list } from "./apiAcademics";
import { Link, Redirect } from "react-router-dom";
import { ListGroup} from 'react-bootstrap';
import {isAuthenticated} from '../../auth'
import Header from '../header/Header'

class Academics extends Component {
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


    render() {
        const { academics, redirectToSignIn } = this.state
        console.log(academics)

        if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         } 
        
        return (
            <div>
               <Header history={this.props.history} />
                  <div className='container mt-4'>
                     <h1>Academics at University High School</h1>
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
                      
                      <div id='title'>
                        {
                            <div className='mt-4 ml-4'>
                                
                                    <p>{academics.intro}</p>
                                    <p>{academics.paragraph1}</p>
                                    <p>{academics.paragraph2}</p>
                                    <p>{academics.paragraph3}</p>
                                    <p>{academics.paragraph4}</p>
                                
                            </div>
                            }
                         
                      </div>
                      
                  </div> 
                  
              
            </div>
            
        );
    }
}

export default Academics;


