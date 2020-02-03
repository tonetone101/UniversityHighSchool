import React, { Component } from "react";
import { list } from "./apiPhoto";
import { Link } from "react-router-dom";
import {isAuthenticated} from '../../auth'
import {Image} from 'react-bootstrap';
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

    renderImages = images => {

        return (
            <div className='row container'>
                {images.map((image, i) => {

                        const imagePhoto = image._id
                        ? `/khmerImage/photo/${
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
                                to={`/khmer/image/${image._id}`}
                                className="btn btn-raised btn-primary btn-sm mb-4 "
                            >
                                សូមមើល
                            </Link>
                        </div>

                    
                    );
                })}
            </div>
        );
    };

    render() {
        const {images } = this.state;

        return (
            <div>
                <Header history={this.props.history} />

                <div className="container">
                    <div className='row mt-4 mb-3' style={{borderBottom: 'solid black 1px'}}>
                        <h2 className="col-md-6" >
                        បានចាប់យកពេល
                            {!images.length ? "កំពុងផ្ទុក..." : ""}
                        </h2>

                        <hr/>
                    </div>
                    {
                        isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                            <div>
                                <Link className='mb-5' to='/khmer/new/image'>បញ្ចូលរូបថតថ្មី</Link>
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