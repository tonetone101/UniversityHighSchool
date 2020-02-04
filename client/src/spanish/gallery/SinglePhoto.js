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
        console.log(this.props.match.params.imageId)
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
        let answer = window.confirm('¿Seguro que quieres eliminar tu foto?')
        if(answer) {
            this.deleteImage()
        }
    }

    renderImage = (image) => {

        const photoUrl = image._id
        ? `/spanishimage/photo/${
            image._id
          }?${new Date().getTime()}`
        : '';

        return (
                <div  className='text-center mt-5'>
                     <div>
                        <img 
                            src={photoUrl}
                            alt=''
                            onError={i =>
                                (i.target.src = ``)
                            }
                            className="img-thunbnail "
                            style={{height: '500px', width: '500px', objectFit: 'cover', borderRadius: '10px'}}
                        />
                   </div>

                        <p className="card-text">
                            {image.caption}
                        </p>
                    

                    <div className=' text-center'>
                        <Link
                            to={`/spanish/images`}
                            className="btn btn-raised btn-primary btn-sm mb-2"
                            style={{marginLeft: '30px'}}
                        >
                            Volver a la galería
                        </Link>

                        {isAuthenticated().user && isAuthenticated().user.code === 8290 && (
                            <div >
                                <div >
                                    <Link
                                        to={`/spanish/edit/image/${image._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        Editar foto
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        Eliminar 
                                    </button>
                                </div>
                            </div>
                        )}

{isAuthenticated().user && isAuthenticated().user.code === 2609 && (
                            <div >
                                <div >
                                    <Link
                                        to={`/spanish/edit/image/${image._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        Editar foto
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        Eliminar 
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        );
    }

    render() {
        const {image, redirectToGallery, redirectToSignIn} = this.state
        
        if(redirectToGallery) {
            return <Redirect to={`/spanish/images`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         }

        return (
            <div className='text-center'>
                 <div className='mt-5 container' style={{borderBottom: 'solid black 1px'}}>
                    <h2>
                    Un momento capturado
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