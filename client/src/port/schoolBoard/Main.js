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
        const { schoolBoardMeeting, redirectToSignIn } = this.state;

         if(redirectToSignIn) {
            return <Redirect to={`/port/signin`} />
         } 
        
        return (
            <div>
                <Header  history={this.props.history} />
                  <div className='container mt-4'>
                     <h1>Bem-vindo à nossa seção SchoolBoard Meeting</h1>
                      <div  >
                        
                        {isAuthenticated().user && isAuthenticated().user.role === 'admin' ? ( 
                          <div>
                            <Link to={`/port/newschoolBoardMeeting`} className='btn btn-raised btn-primary'>Add schoolBoardMeeting</Link>
                          </div> 
                          ) : ( null)
                         }

{isAuthenticated().user && isAuthenticated().user.code === 2609 ? ( 
                          <div>
                            <Link to={`/port/newschoolBoardMeeting`} className='btn btn-raised btn-primary'>Add schoolBoardMeeting</Link>
                          </div> 
                          ) : ( null)
                         }
                         <Link to={`/port/schoolBoardMember`} className='btn btn-raised btn-primary mt-4'>Membros do Conselho</Link>

                      </div>
                      <hr />
                      
                      <div id='title'>
                         <h3>Próximas Reuniões:</h3> 
                        {schoolBoardMeeting.reverse().map((schoolBoardMeeting,  i) => (
                        
                            <div key={i}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item> 
                                        <Link onClick={() => { 
                                            window.open(`${schoolBoardMeeting.url}`) 
                                            }}  
                                        >
                                            {schoolBoardMeeting.body}
                                        </Link>
                                        {
                                            isAuthenticated().user && isAuthenticated().user.role === 'admin' ? (
                                                <Link to={`/port/schoolBoardMeeting/${schoolBoardMeeting._id}`} className='ml-2 text-danger'>Visão</Link>
                                            ) : (null)
                                        }

{
                                            isAuthenticated().user && isAuthenticated().user.code === 2609 ? (
                                                <Link to={`/port/schoolBoardMeeting/${schoolBoardMeeting._id}`} className='ml-2 text-danger'>Visão</Link>
                                            ) : (null)
                                        }
                                    </ListGroup.Item>
                                    <ListGroup.Item></ListGroup.Item>
                                </ListGroup>
                          
                            </div>
                        ))}
                         
                      </div>
                      
                  </div> 
                  
              
            </div>
            
        );
    }
}

export default Main;


