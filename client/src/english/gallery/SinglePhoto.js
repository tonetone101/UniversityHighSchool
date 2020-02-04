import React, {Component} from 'react'
import {singlePhoto, remove} from './apiPhoto'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../auth'


class SinglePhoto extends Component {
    state = {
        image: '',
        redirectToGallery: false,
        redirectToSignIn: false,
    }

    componentDidMount = () => {
        const imageId = this.props.match.params.imageId
        singlePhoto(imageId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({image: data})
            }
        }) 
    }

    deleteImage = () => {
        const imageId = this.props.match.params.imageId
        const token = isAuthenticated().token
        remove(imageId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToGallery: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete your photo?')
        if(answer) {
            this.deleteImage()
        }
    }

    renderImage = (image) => {

        const photoUrl = image._id
        ? `/image/photo/${
            image._id
          }?${new Date().getTime()}`
        : '';

        return (
                <div className='text-center'>
                    
                     <div className='mt-5'>
                        <img 
                            src={photoUrl}
                            alt=''
                            onError={i =>
                                (i.target.src = ``)
                            }
                            className="img-thunbnail "
                            style={{height: '500px', width: '500px', objectFit: 'cover', borderRadius: '10px'}}
                        />
                        <p>{image.caption}</p>

                        <div className=' text-center'>
                                <Link
                                    to={`/images`}
                                    className="btn btn-raised btn-primary btn-sm mb-2"
                                    style={{marginLeft: '30px'}}
                                >
                                    Back to gallery
                                </Link>

                                {isAuthenticated().user && isAuthenticated().user.role === 'admin' && (
                                    <div >
                                        <div >
                                            <Link
                                                to={`/edit/image/${image._id}`}
                                                className='btn btn-raised btn-warning ml-3'
                                            >
                                                Edit Photo
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
                                                to={`/edit/image/${image._id}`}
                                                className='btn btn-raised btn-warning ml-3'
                                            >
                                                Edit Photo
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
                                                to={`/edit/image/${image._id}`}
                                                className='btn btn-raised btn-warning ml-3'
                                            >
                                                Edit Photo
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

                   

                  
                </div>
        );
    }

    render() {
        const {image, redirectToGallery, redirectToSignIn} = this.state
        
        if(redirectToGallery) {
            return <Redirect to={`/images`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         }

        return (
            <div className='text-center'>
                <div className='mt-5 container' style={{borderBottom: 'solid black 1px'}}>
                    <h2>
                        A Captured Moment
                    </h2>
                </div>
                           <div className='container'>
                                {!image ? ( 
                                        <div className='jumbotron text-center '>
                                            <h2>Loading....</h2>
                                        </div>
                                        ) : (
                                            this.renderImage(image)
                                        )
                                    }
                               
                            </div>
            </div>
        )
    }
}

export default SinglePhoto