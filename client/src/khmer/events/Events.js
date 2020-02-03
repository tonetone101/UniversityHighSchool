import React, { Component } from "react";
import { list } from "./apiEvent";
import { Link } from "react-router-dom";
import {isAuthenticated} from '../../auth'
import Header from '../header/Header'

class Events extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            events: [],
            page: 1,
            spanishPage: false,
            englishPage: false,
            khmerPage: false
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
                        ? `${process.env.REACT_APP_API_URL}/user/photo/${
                            event.postedBy._id
                          }?${new Date().getTime()}`
                        : ''

                        const eventPhoto = event._id
                        ? `${process.env.REACT_APP_API_URL}/khmer/event/photo/${
                            event._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (
                        <div  className="card col-md-6 mb-4" key={i}>
                            <div  >
                                
                               
                                <p className="font-italic mark mt-4">
                                    ព្រឹត្តិការណ៍ដែលបានបោះពុម្ពផ្សាយនៅក្នុង{" "}

                                    {/* <Link to={`${posterId}`}>
                                        <img  style={{ height: "40px", borderRadius:'30px', width: "40px" }} className="img-thumbnail" src={photoUrl} alt='' />

                                        {posterName}{" "}
                                    </Link> */}
                                   
                                    {new Date(event.created).toDateString()}
                                </p>
                                <br />

                                <div className="card-text column mr-5">
                                    <p >
                                        ឈ្មោះព្រឹត្តិការណ៍: {event.title.substring(0, 100)}{' '}
                                    </p>  
                                    
                                    {/* <p >
                                       Date : {event.date.substring(0, 100)}{' '}
                                    </p>   */}

                                    {/* <p >
                                       Time: {event.time.substring(0, 100)}{' '}
                                    </p>  */}

                                     <p >
                                        ទីតាំង: {event.where.substring(0, 100)}{' '}
                                    </p>      

                                    <p >
                                        ការពិពណ៌នា: {event.body.substring(0, 100)}{' '}
                                    </p>           
                                </div>
                                                       
                             
                                {/* <img
                                    src={eventPhoto}
                                    className="img-thunbnail mb-3"
                                    style={{ height: "200px", width: "100%" }}
                                /> */}
                                <Link
                                    to={`/khmer/event/${event._id}`}
                                    className="btn btn-raised btn-primary btn-sm mb-4"
                                >
                                    សូមអានបន្ថែម
                                </Link>
                            </div>
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
                        {!events.length ? "កំពុងផ្ទុក..." : ""}
                    </h2>
                    {
                        isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                            <div>
                                <Link className='mb-5' to='/khmer/new/event'>បន្ថែមព្រឹត្តិការណ៍</Link>
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