import React, { Component } from "react";
import { list } from "./apiSchoolBoardMeeting";
import { Link, Redirect } from "react-router-dom";
import { ListGroup} from 'react-bootstrap';
import {isAuthenticated} from '../../auth'
import Header from '../header/Header'

class Main extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            schoolBoardMeeting: [],
            url: '',
            docUrl: '',
            redirectToschoolBoardMeeting: false,
            redirectToSignIn: false
        };
       
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    loadschoolBoardMeeting = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data)
                this.setState({ schoolBoardMeeting: data, url: data.url, docUrl: data.docUrl });
                

            }
        });
    };

    componentDidMount() {
        this.loadschoolBoardMeeting()
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }


    render() {
        const { schoolBoardMeeting, url, redirectToSignIn } = this.state
        let meeting;

        console.log(schoolBoardMeeting)

        if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         } 

         if (!url) {
             meeting =  <Link onClick={() => { 
                window.open(`${schoolBoardMeeting.url}`) 
                }}  
            >
                {schoolBoardMeeting.body}
            </Link>
         } else {
            meeting = <div>
                {schoolBoardMeeting.body}
            </div>
         }
        
        return (
            <div>
               <Header history={this.props.history} />
                  <div className='container mt-4'>
                     <h1>Welcome to our schoolBoard Meeting section</h1>
                      <div  >
                        
                        {isAuthenticated().user && isAuthenticated().user.code === 8290 ? ( 
                          <div>
                            <Link to={`/newschoolBoardMeeting`} className='btn btn-raised btn-primary'>Add schoolBoardMeeting</Link>
                          </div> 
                          ) : ( null)
                         }

{isAuthenticated().user && isAuthenticated().user.code === 2609 ? ( 
                          <div>
                            <Link to={`/newschoolBoardMeeting`} className='btn btn-raised btn-primary'>Add schoolBoardMeeting</Link>
                          </div> 
                          ) : ( null)
                         }

{isAuthenticated().user && isAuthenticated().user.code === 1017 ? ( 
                          <div>
                            <Link to={`/newschoolBoardMeeting`} className='btn btn-raised btn-primary'>Add schoolBoardMeeting</Link>
                          </div> 
                          ) : ( null)
                         }

                         <Link to={`/schoolBoardMember`} className='btn btn-raised btn-primary mt-4'>Board Members</Link>

                      </div>
                      <hr />
                      
                      <div id='title'>
                         <h3>Upcoming Meetings:</h3> 
                        {schoolBoardMeeting.reverse().map((schoolBoardMeeting,  i) => (
                            <div key={i} >
                                <div className='row'> 
                                        {
                                           meeting
                                        }
                                   
                                        {
                                            isAuthenticated().user && isAuthenticated().user.code === 8290 ? (
                                                <Link to={`/schoolBoardMeeting/${schoolBoardMeeting._id}`} className='ml-2 text-danger'>view</Link>
                                            ) : (null)
                                        }

{
                                            isAuthenticated().user && isAuthenticated().user.code === 2609 ? (
                                                <Link to={`/schoolBoardMeeting/${schoolBoardMeeting._id}`} className='ml-2 text-danger'>view</Link>
                                            ) : (null)
                                        }

{
                                            isAuthenticated().user && isAuthenticated().user.code === 1017 ? (
                                                <Link to={`/schoolBoardMeeting/${schoolBoardMeeting._id}`} className='ml-2 text-danger'>view</Link>
                                            ) : (null)
                                        }
                                </div>


                                {/* <ListGroup >
                                    <ListGroup.Item> 
                                        <Link style={{backgroundColor: '#b7b7b7'}}  onClick={() => { 
                                            window.open(`${schoolBoardMeeting.url}`) 
                                            }}  
                                        >
                                            {schoolBoardMeeting.body}
                                        </Link>
                                        {
                                            isAuthenticated().user && isAuthenticated().user.code === 8290 ? (
                                                <Link to={`/schoolBoardMeeting/${schoolBoardMeeting._id}`} className='ml-2 text-danger'>view</Link>
                                            ) : (null)
                                        }

{
                                            isAuthenticated().user && isAuthenticated().user.code === 2609 ? (
                                                <Link to={`/schoolBoardMeeting/${schoolBoardMeeting._id}`} className='ml-2 text-danger'>view</Link>
                                            ) : (null)
                                        }

{
                                            isAuthenticated().user && isAuthenticated().user.code === 1017 ? (
                                                <Link to={`/schoolBoardMeeting/${schoolBoardMeeting._id}`} className='ml-2 text-danger'>view</Link>
                                            ) : (null)
                                        }
                                    </ListGroup.Item>
                                    <ListGroup.Item></ListGroup.Item>
                                </ListGroup> */}
                          
                            </div>
                        ))}
                         
                      </div>
                      
                  </div> 
                  
              
            </div>
            
        );
    }
}

export default Main;


