import React, { Component } from "react";
import { list } from "./apiEvent";
import { Link } from "react-router-dom";
import {isAuthenticated} from '../../auth'
import { Card } from 'react-bootstrap';
import Header from '../header/Header'

class Events extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            events: [],
        };
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

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

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
                        
                    return (
                       <div className='col-md-4 mb-5' key={i}>
                            <Card border='dark' style={{ width: '18rem', height: '375px'}}>
                                <Card.Header className="font-italic mark mt-4">
                                Evento publicado{" "}
                                    em{' '}
                                    {new Date(event.created).toDateString()}
                                </Card.Header >
                                <Card.Body>
                                    <Card.Title>{event.title.substring(0, 100)}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{event.where.substring(0, 100)}</Card.Subtitle>
                                    
                                    <Card.Text>
                                        {event.body.substring(0, 100)}
                                    </Card.Text>
                                    {
                                        event.url ?
                                            <Card.Link >
                                                <Link
                                                    onClick={() => { 
                                                        window.open(`${event.url}`) 
                                                        }} 
                                                        className="btn btn-raised btn-primary btn-sm mb-4"
                                                >
                                                    Ligação
                                                </Link>
                                            </Card.Link> : null
                                      
                                        
                                    }
                                    
                                    {
                                        event.url2 ?
                                        <Card.Link >
                                        <Link
                                               onClick={() => { 
                                                window.open(`${event.url2}`) 
                                                }} 
                                                className="btn btn-raised btn-primary btn-sm mb-4"
                                        >
                                               Ligação2
                                        </Link>
                                    </Card.Link> : null
                                    }

                                    {               
                                        event.url3 ?
                                        <Card.Link >
                                        <Link
                                               onClick={() => { 
                                                window.open(`${event.url3}`) 
                                                }} 
                                                className="btn btn-raised btn-primary btn-sm mb-4"
                                        >
                                               Ligação3
                                        </Link>
                                    </Card.Link> : null
                                    }

                                    {               
                                        event.url4 ?
                                        <Card.Link >
                                        <Link
                                               onClick={() => { 
                                                window.open(`${event.url4}`) 
                                                }} 
                                                className="btn btn-raised btn-primary btn-sm mb-4"
                                        >
                                               Ligação4
                                        </Link>
                                    </Card.Link>: null
                                    }

                                    {
                                        event.url5 ? 
                                        <Card.Link >
                                        <Link
                                               onClick={() => { 
                                                window.open(`${event.url5}`) 
                                                }} 
                                                className="btn btn-raised btn-primary btn-sm mb-4"
                                        >
                                               Ligação5
                                        </Link>
                                    </Card.Link> : null
                                    }
                                                                     
                                
                                    <Card.Link >
                                        <Link
                                                to={`/port/event/${event._id}`}
                                                className="btn btn-raised btn-primary btn-sm mb-4"
                                        >
                                                Consulte Mais informação
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
                    próximos eventos
                        {!events.length ? "Loading..." : ""}
                    </h2>
                    {
                        isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                            <div>
                                <Link className='mb-5' to='/port/new/event'>Add Event in portuguese</Link>
                            </div>
                        )
                    }

{
                        isAuthenticated() && isAuthenticated().user.code === 2609 && (
                            <div>
                                <Link className='mb-5' to='/port/new/event'>Add Event in portuguese</Link>
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