import React, { Component } from "react";
import { list } from "./apiAcademics";
import { Link, Redirect } from "react-router-dom";
import { ListGroup} from 'react-bootstrap';
import {isAuthenticated} from '../../auth'
import Header from '../header/Header'

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
                    if (d._id == "5e21c9ab9195bc7dc99dcfb3") {
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
                            <Link to={`/update/academics`} className='btn btn-raised btn-primary'>Update academics</Link>
                          </div> 
                          ) : ( null)
                         }

                        {isAuthenticated().user && isAuthenticated().user.code === 2609 ? ( 
                          <div>
                            <Link to={`/update/academics`} className='btn btn-raised btn-primary'>Update academics</Link>
                          </div> 
                          ) : ( null)
                         }


                      </div>
                      <hr />
                      
                      <div id='title'>
                        {academics.reverse().map((academic,  i) => (
                            <div key={i} className='mt-4 ml-4'>
                                <div> 
                                    <p>{academic.grade9Expect}</p>
                                    <p>{academic.grade9Curric}</p>
                                </div>
                            </div>
                        ))}
                         
                      </div>
                      
                  </div> 
                  
              
            </div>
            
        );
    }
}

export default Grade9;


