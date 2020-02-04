import React, { Component } from "react";
import { list, remove} from "./apiPhoto";
import { Link } from "react-router-dom";
import {isAuthenticated} from '../../auth'
import {Image} from 'react-bootstrap';
import Header from '..//header/Header'

class Photo extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            images: [],
            page: 1,
            error: '',
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    loadImages = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ images: data });
                

            }
        });
    };

    componentDidMount() {
        this.loadImages(this.state.images)
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    deleteImage = () => {
        const image = this.state.images.map(image => {
            return image
        })
        const imageId = image._id
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

    renderImages = images => {
        return (
            <div className='row container'>
                {images.map((image, i) => {

                        const imagePhoto = image._id
                        ? `/spanishimage/photo/${
                            image._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (

                        <div  className="col-md-4 mb-4" key={i}>
                            <Image src={imagePhoto} fluid />
                            <p >
                                {image.caption.substring(0, 100)}{' '}
                            </p> 
                           
                            <Link
                                to={`/spanish/image/${image._id}`}
                                className="btn btn-raised btn-primary btn-sm mb-4 "
                            >
                                Ver
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const {images} = this.state;

        return (
            <div>
                <Header history={this.props.history} />

                <div className="container">
                    <div className='row mt-4 mb-3' style={{borderBottom: 'solid black 1px'}}>
                        <h2 className="col-md-6" >
                            Momentos captados
                            {!images.length ? "Cargando..." : ""}
                        </h2>

                        <hr/>
                    </div>
                    {
                        isAuthenticated() && isAuthenticated().user.code === 8290 && (
                            <div>
                                <Link className='mb-5' to='/spanish/new/image'>Añadir nueva foto</Link>
                            </div>
                        )
                    }

{
                        isAuthenticated() && isAuthenticated().user.code === 2609 && (
                            <div>
                                <Link className='mb-5' to='/spanish/new/image'>Añadir nueva foto</Link>
                            </div>
                        )
                    }
                
                    <div>               
                        {this.renderImages(images)}
                    </div>   
                
                </div>
            </div>
        );
    }
}

export default Photo;