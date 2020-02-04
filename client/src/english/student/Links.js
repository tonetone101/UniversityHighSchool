import React, { Component } from "react";
import { list, read, remove  } from "./apiStudent";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { ListGroup} from 'react-bootstrap';



class Links extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            links: [],
            url: '',
            redirectToSignin: false
        };
       
    }

    loadLinks = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data)
                this.setState({ links: data, url: data.url });
                

            }
        });
    };

      componentDidMount() {
         this.loadLinks()
       
      }
      
      deleteLink = () => {
        const linkId = this.state.links._id
        const token = isAuthenticated().token
        remove(linkId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToLinks: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete your link?')
        if(answer) {
            this.deleteLink()
        }
    }

    render() {
        const { user, links, url } = this.state;
        console.log(links)
        
        return (
            <div>
                  <div>
                     
                      <div  >
                        
                        {isAuthenticated().user && isAuthenticated().user.code === 8290 ? ( 
                          <div>
                            <Link to={`/newlink`} className='btn btn-raised btn-primary'>Add Link</Link>
                          </div> 
                          ) : ( null)
                         }

{isAuthenticated().user && isAuthenticated().user.code === 2609 ? ( 
                          <div>
                            <Link to={`/newlink`} className='btn btn-raised btn-primary'>Add Link</Link>
                          </div> 
                          ) : ( null)
                         }

{isAuthenticated().user && isAuthenticated().user.code === 1017 ? ( 
                          <div>
                            <Link to={`/newlink`} className='btn btn-raised btn-primary'>Add Link</Link>
                          </div> 
                          ) : ( null)
                         }

                      </div>
                      <hr />
                      
                      <div id='title'>
          
                        {links.reverse().map((link,  i) => (
                        
                            <div key={i}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item> 
                                        <Link onClick={() => { 
                                            window.open(`http://${link.url}`) 
                                            }}  
                                        >
                                            {link.body}
                                        </Link>
                                        {
                                            isAuthenticated().user && isAuthenticated().user.code === 8290 ? (
                                                <Link to={`/link/${link._id}`} className='ml-2 text-danger'>view</Link>
                                            ) : (null)
                                        }

{
                                            isAuthenticated().user && isAuthenticated().user.code === 2609 ? (
                                                <Link to={`/link/${link._id}`} className='ml-2 text-danger'>view</Link>
                                            ) : (null)
                                        }

{
                                            isAuthenticated().user && isAuthenticated().user.code === 1017 ? (
                                                <Link to={`/link/${link._id}`} className='ml-2 text-danger'>view</Link>
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

export default Links;


