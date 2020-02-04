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
        let answer = window.confirm('តើអ្នកពិតជាចង់លុបរូបថតរបស់អ្នកមែនទេ?')
        if(answer) {
            this.deleteImage()
        }
    }

    renderImage = (image) => {

        const photoUrl = image._id
        ? `/khmerImage/photo/${
            image._id
          }?${new Date().getTime()}`
        : '';

        return (
                <div  >
                     <div className=' mt-5'>
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

                    
                        <p >
                            {image.caption}
                        </p>
                   

                    <div >
                        <Link
                            to={`/khmer/images`}
                            className="btn btn-raised btn-primary btn-sm mb-2"
                            style={{marginLeft: '30px'}}
                        >
                            ត្រឡប់ទៅវិចិត្រសាលវិញ
                        </Link>

                        {isAuthenticated().user && isAuthenticated().user.role === 'admin' && (
                            <div >
                                <div >
                                    <Link
                                        to={`/khmer/edit/image/${image._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        កែរូបថត
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        យកចេញ
                                    </button>
                                </div>
                            </div>
                        )}

{isAuthenticated().user && isAuthenticated().user.code === 2609 && (
                            <div >
                                <div >
                                    <Link
                                        to={`/khmer/edit/image/${image._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        កែរូបថត
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        យកចេញ
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
            return <Redirect to={`/khmer/images`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/khmer/signin`} />
         }

        return (
            <div className='text-center'>
                 <div className='mt-5 container' style={{borderBottom: 'solid black 1px'}}>
                    <h2>
                    ពេលចាប់បាន
                    </h2>
                </div>
                           <div className='container'>
                                {!image ? ( 
                                        <div className='jumbotron text-center '>
                                            <h2>កំពុងផ្ទុក....</h2>
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