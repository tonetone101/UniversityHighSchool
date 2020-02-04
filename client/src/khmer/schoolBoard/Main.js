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
        const { schoolBoardMeeting, url, redirectToSignIn } = this.state;

        if(redirectToSignIn) {
            return <Redirect to={`/khmer/signin`} />
         } 
        
        return (
            <div>
                <Header history={this.props.history} />

                  <div className='container mt-4'>
                     <h1>សូមស្វាគមន៍ចំពោះផ្នែកប្រជុំសាលារបស់យើង</h1>
                      <div  >
                        
                        {isAuthenticated().user && isAuthenticated().user.role === 'admin' ? ( 
                          <div>
                            <Link to={`/khmer/newschoolBoardMeeting`} className='btn btn-raised btn-primary'>Add schoolBoardMeeting in khmers</Link>
                          </div> 
                          ) : ( null)
                         }

{isAuthenticated().user && isAuthenticated().user.code === 2609 ? ( 
                          <div>
                            <Link to={`/khmer/newschoolBoardMeeting`} className='btn btn-raised btn-primary'>Add schoolBoardMeeting in khmers</Link>
                          </div> 
                          ) : ( null)
                         }
                         <Link to={`/khmer/schoolBoardMember`} className='btn btn-raised btn-primary mt-4'>Board Members in khmer</Link>

                      </div>
                      <hr />
                      
                      <div id='title'>
                         <h3>ប្រជុំនឹងមកដល់:</h3> 
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
                                                <Link to={`/khmer/schoolBoardMeeting/${schoolBoardMeeting._id}`} className='ml-2 text-danger'>មើល</Link>
                                            ) : (null)
                                        }

{
                                            isAuthenticated().user && isAuthenticated().user.code === 2609 ? (
                                                <Link to={`/khmer/schoolBoardMeeting/${schoolBoardMeeting._id}`} className='ml-2 text-danger'>មើល</Link>
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


