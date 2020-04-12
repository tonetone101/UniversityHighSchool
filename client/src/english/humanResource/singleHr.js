import React, {Component} from 'react'
import {singlehr, remove} from './apiHr'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../auth'
import Header from '../header/Header'

class Singlehr extends Component {
    state = {
        hr: '',
        redirectToFaculties: false,
        redirectToSignIn: false,
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount = () => {
        const hrId = this.props.match.params.hrId
        singlehr(hrId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({hr: data})
            }
        }) 
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    deletehr = () => {
        const hrId = this.props.match.params.hrId
        const token = isAuthenticated().token
        remove(hrId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToFaculties: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete hr?')
        if(answer) {
            this.deletehr()
        }
    }

    renderhr = (hr) => {  
        const photoUrl = hr._id
        ? `/hr/photo/${
            hr._id
          }?${new Date().getTime()}`
        : '';

        return (
                <div  className='row'>
                     <div className='col-md-6 mt-5'>
                        <iframe 
                            src={photoUrl}
                            alt=''
                            onError={i =>
                                (i.target.src = ``)
                            }
                            className="img-thunbnail mb-3 ml-50"
                            style={{height: '500px', width: '500px', objectFit: 'cover', borderRadius: '10px'}}
                        ></iframe>
                   </div>

                    <div style={{color: 'black'}} className='col-md-6 mt-5'>
                        <h4 className="card-text">
                           {hr.title}
                        </h4>
                    </div>

                    <div className='row'>
                        <Link
                            to={`/hrd`}
                            className="btn btn-raised btn-primary btn-sm "
                            style={{marginLeft: '30px'}}
                        >
                            Back to hr
                        </Link>

                        {isAuthenticated().user && isAuthenticated().user.code === 8290 && (
                            <div >
                                <div >
                                    <Link
                                        to={`/edit/hr/${hr._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        Update hr
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        Delete 
                                    </button>
                                </div>
                            </div>
                        )}

{isAuthenticated().user && isAuthenticated().user.code === 2609 && (
                            <div >
                                <div >
                                    <Link
                                        to={`/edit/hr/${hr._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        Update hr
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        Delete 
                                    </button>
                                </div>
                            </div>
                        )}

{isAuthenticated().user && isAuthenticated().user.code === 1017 && (
                            <div >
                                <div >
                                    <Link
                                        to={`/edit/hr/${hr._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        Update hr
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
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
        const {hr, redirectToFaculties, redirectToSignIn} = this.state

        if(redirectToFaculties) {
            return <Redirect to={`/hrd`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         }

        return (
            <div>
                <Header history={this.props.history} />
                <div className='container mt-5'>
                    <div style={{borderBottom: 'solid black 1px'}}>
                        <h3 style={{color: 'black'}}></h3>
                    </div>
                    
                    {!hr ? ( 
                            <div className='jumbotron text-center '>
                                <h2>Loading....</h2>
                            </div>
                            ) : (
                                this.renderhr(hr)
                            )
                        }
                    
                </div>
            </div>
        )
    }
}

export default Singlehr