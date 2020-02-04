import React from 'react'
import { Carousel } from 'react-bootstrap';
import {isAuthenticated} from '../auth';

const Home = () => {
    return (
        <div className='mt-1'>
            <Carousel className='container'>
                <Carousel.Item>
                    <img
                     style={{ height: "300px", width: "auto" }}
                    className="d-block w-100"
                    src={require("./person.png")}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    style={{ height: "300px", width: "auto" }}
                    className="d-block w-100"
                    src={require("./joker.jpeg")}
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    style={{ height: "300px", width: "auto" }}
                    className="d-block w-100"
                    src={require("./avatar.jpeg")}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>          

            <h1 className='text-center mt-5'>Mission Statement</h1>
            <p className='container'>Lorem ipsum dolor sit amet Consectetuer adipiscing elit, Sed diam nonummy
                Nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet Consectetuer adipiscing elit, Sed diam nonummy
                Nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet Consectetuer adipiscing elit, Sed diam nonummy
                Nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet Consectetuer adipiscing elit, Sed diam nonummy
                Nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </p>
            {
                isAuthenticated() && isAuthenticated().user.code === 8290 && (
                    <div className='text-center'>
                        <button className='btn btn-primary'>Update</button>
                    </div>
                )
            }
        </div>
    )
}

export default Home