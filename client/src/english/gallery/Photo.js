import React, { Component } from "react";
import { list } from "./apiPhoto";
import { Link } from "react-router-dom";
import {isAuthenticated} from '../../auth'
import { Image } from 'react-bootstrap';
import Header from '../header/Header'

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

    loadImages = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ images: data });
                

            }
        });
    };

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
        this.loadImages(this.state.images)
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    renderImages = images => {
        return (
            <div className='row container'>
                {images.map((image, i) => {
                        const imagePhoto = image._id
                        ? `/image/photo/${
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
                                to={`/image/${image._id}`}
                                className="btn btn-raised btn-primary btn-sm mb-4 "
                            >
                                View
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { images } = this.state;

        return (
            <div>
                <Header history={this.props.history} />
                <div className="container">
                    <div className='row mt-4 mb-3' style={{borderBottom: 'solid black 1px'}}>
                        <h2 className="col-md-6" >
                            Captured Moments
                            {!images.length ? "Loading..." : ""}
                        </h2>

                        <hr/>
                    </div>
                    {
                        isAuthenticated() && isAuthenticated().user.code === 8290 && (
                            <div>
                                <Link className='mb-5' to='/new/image'>Add New Photo</Link>
                            </div>
                        )
                    }

{
                        isAuthenticated() && isAuthenticated().user.code === 2609 && (
                            <div>
                                <Link className='mb-5' to='/new/image'>Add New Photo</Link>
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