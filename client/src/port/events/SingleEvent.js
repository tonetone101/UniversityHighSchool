import React, {Component} from 'react'
import {singleEvent, remove} from './apiEvent'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../auth'

class SingleEvent extends Component {
    state = {
        user: '',
        event: '',
        redirectToEvents: false,
        redirectToSignIn: false,
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount = () => {
        const eventId = this.props.match.params.eventId
        singleEvent(eventId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({event: data})
            }
        }) 
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    deleteEvent = () => {
        const eventId = this.props.match.params.eventId
        const token = isAuthenticated().token
        remove(eventId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToEvents: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete event?')
        if(answer) {
            this.deleteEvent()
        }
    }

    renderEvent = (event) => {
        const photoUrl = event._id
        ? `/portEvent/photo/${
            event._id
          }?${new Date().getTime()}`
        : '';

        return (
                <div  >
                    <p className="font-italic mark">
                        Evento publicado em{" "}
                        {/* <Link to={`${posterId}`}> */}
                        {/* <img  style={{ height: "40px", borderRadius:'30px', width: "40px" }} className="img-thumbnail" src={photoUrl} alt='' /> */}

                            {" "}
                        {/* </Link> */}
                        {new Date(event.created).toDateString()}
                    </p>
                    <div className='container' >
                        <p className="card-text">
                             Nome do evento: {event.title}
                        </p>
                        <p className="card-text">
                             Encontro: {event.date}
                        </p>
                        <p className="card-text">
                            Tempo: {event.time}
                        </p>
                        <p className="card-text">
                            Localização: {event.where}
                        </p>
                        <p className="card-text ">
                            Descrição: {event.body}
                        </p>
                        <p className="card-text ">
                            URL do GoogleDoc: {event.url}
                        </p>
                    </div>
                   <div >
                    <img 
                            src={photoUrl}
                            alt=''
                            onError={i =>
                                (i.target.src = ``)
                            }
                            className="img-thunbnail mb-3 ml-50"
                            style={{height: '500px', width: '500px', objectFit: 'cover'}} />
                   </div>

                    <div className='d-inline-block mb-5'>
                        <Link
                            to={`/port/events`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            Voltar para eventos

                        </Link>

                        {isAuthenticated().user && isAuthenticated().user.code === 8290 && (
                            <div className='mt-5'>
                                <div >
                                    <Link
                                        to={`/port/edit/event/${event._id}`}
                                        className='btn btn-raised btn-warning'
                                    >
                                        Update Event in portuguese
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-5'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}

{isAuthenticated().user && isAuthenticated().user.code === 2609 && (
                            <div className='mt-5'>
                                <div >
                                    <Link
                                        to={`/port/edit/event/${event._id}`}
                                        className='btn btn-raised btn-warning'
                                    >
                                        Update Event in portuguese
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-5'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        );
    }

    render() {
        const {event, redirectToEvents} = this.state
        if(redirectToEvents) {
            return <Redirect  to={'/port/events'} />
        }
        
        return (
            <div>
                           <div className='container'>
                                {!event ? ( 
                                        <div className='jumbotron text-center '>
                                            <h2>Carregando....</h2>
                                        </div>
                                        ) : (
                                            this.renderEvent(event)
                                        )
                                    }
                               
                            </div>
            </div>
        )
    }
}

export default SingleEvent