import React, {Component} from 'react'
import {singleLink, remove} from './apiAcademics'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../auth'


class SingleAcademics extends Component {
    state = {
        academics: '',
        redirectToFaculties: false,
        redirectToSignIn: false,
    }

    componentDidMount = () => {
        console.log(this.props.match.params)
        const academicsId = this.props.match.params.linkId
        singleLink(academicsId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({academics: data})
            }
        }) 
    }

    deleteacademics = () => {
        const academicsId = this.props.match.params.linkId
        const token = isAuthenticated().token
        remove(academicsId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToFaculties: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete content?')
        if(answer) {
            this.deleteacademics()
        }
    }

    renderacademics = (academics) => {
        const photoUrl = academics._id
        ? `/link/photo/${
            academics._id
          }?${new Date().getTime()}`
        : '';

        return (
                <div  className='row'>
                     <div className='col-md-6 mt-5'>
                        <img 
                            src={photoUrl}
                            alt=''
                            onError={i =>
                                (i.target.src = ``)
                            }
                            className="img-thunbnail mb-3 ml-50"
                            style={{height: '500px', width: '500px', objectFit: 'cover', borderRadius: '10px'}}
                        />
                   </div>

                    <div style={{color: 'black'}} className='col-md-6 mt-5'>
                        <h4 className="card-text">
                           {academics.title}
                        </h4>
                        <p style={{color: 'black'}} className="card-text">
                            {academics.body}
                        </p>
                    </div>

                    <div className='row'>
                        <Link
                            to={`/aca`}
                            className="btn btn-raised btn-primary btn-sm "
                            style={{marginLeft: '30px'}}
                        >
                            Back to Academics
                        </Link>

                        {isAuthenticated().user && isAuthenticated().user.code === 8290 && (
                            <div >
                                <div >
                                    <Link
                                        to={`/update/content/${academics._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        Update content
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
                                        to={`/update/content/${academics._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        Update content
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
        const {academics, redirectToFaculties, redirectToSignIn} = this.state
        
        if(redirectToFaculties) {
            return <Redirect to={`/aca`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         }

        return (
            <div>
                <div className='container mt-5'>
                    {!academics ? ( 
                            <div className='jumbotron text-center '>
                                <h2>Loading....</h2>
                            </div>
                            ) : (
                                this.renderacademics(academics)
                            )
                        }
                    
                </div>
            </div>
        )
    }
}

export default SingleAcademics