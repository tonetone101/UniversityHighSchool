import React, { Component } from "react";
import { list } from "./apiEvent";
import { Link} from "react-router-dom";
import {isAuthenticated} from '../../auth'
import { Card } from 'react-bootstrap';
import Header from '../header/Header'



class Events extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            events: [],
            page: 1,
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    loadEvents = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ events: data });               
            }
        });
    };

    componentDidMount() {
        this.loadEvents(this.state.events)
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    renderEvents = events => {
        return (
            <div  id='event' className='row container'>
                {events.map((event, i) => {
                    const posterId = event.postedBy
                        ? `/user/${event.postedBy._id}`
                        : "";
                    const posterName = event.postedBy
                        ? event.postedBy.name
                        : " Unknown";

                        const photoUrl = event.postedBy
                        ? `/user/photo/${
                            event.postedBy._id
                          }?${new Date().getTime()}`
                        : ''

                        const eventPhoto = event._id
                        ? `/event/photo/${
                            event._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (
                        <div className='col-md-4 mb-5' key={i}>
                        <Card border='dark' style={{ width: '18rem', height: '375px'}}>
                            <Card.Header className="font-italic mark mt-4">
                                Evento publicado en{" "}
                              
                                {new Date(event.created).toDateString()}
                            </Card.Header >
                            <Card.Body>
                                <Card.Title>{event.title.substring(0, 100)}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{event.where.substring(0, 100)}</Card.Subtitle>
                                
                                <Card.Text>
                                    {event.body.substring(0, 100)}
                                </Card.Text>
                            
                                <Card.Link >
                                    <Link
                                           onClick={() => { 
                                            window.open(`${event.url}`) 
                                            }} 
                                            className="btn btn-raised btn-primary btn-sm mb-4"
                                    >
                                           Google Doc
                                    </Link>
                                </Card.Link>
                            
                                <Card.Link >
                                    <Link
                                            to={`/spanish/event/${event._id}`}
                                            className="btn btn-raised btn-primary btn-sm mb-4"
                                    >
                                            Lee mas
                                    </Link>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    </div>


                       
                    );
                })}
            </div>
        );
    };

    render() {
        const { events } = this.state;

        return (
            <div>
                <Header history={this.props.history} />
                <div className="container">
                    
                    <h2 className="mt-5 mb-5">
                        {!events.length ? "Loading..." : ""}
                    </h2>
                    {
                        isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                            <div>
                                <Link className='mb-5' to='/spanish/new/event'>Añadir evento</Link>
                            </div>
                        )
                    }

{
                        isAuthenticated() && isAuthenticated().user.code === 2609 && (
                            <div>
                                <Link className='mb-5' to='/spanish/new/event'>Añadir evento</Link>
                            </div>
                        )
                    }
                
                    <div>               
                        {this.renderEvents(events)}
                    </div>   
                
                </div>
            </div>
        );
    }
}

export default Events;