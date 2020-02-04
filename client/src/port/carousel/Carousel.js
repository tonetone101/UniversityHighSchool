import React, {Component} from 'react'
import { Carousel } from 'react-bootstrap';
import {list} from './apiCarousel'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../../auth'
import {Animated} from 'react-animated-css'
import Header from '../header/Header'

class Carol extends Component {
    state = {
        user: '',
        carousel: [],
        redirectToHome: false,
        redirectToSignIn: false,
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({carousel: data.find(d => {
                    if (d._id == "5e35fb64e6ffb39e3011a285") {
                        return d
                    }
                }) 
              })
              
            }
        }) 
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    renderCarousel = (carousel) => {
        // const photoUrl = carousel.postedBy
        // ? `${process.env.REACT_APP_API_URL}/user/photo/${
        //     carousel.postedBy._id
        //   }?${new Date().getTime()}`
        // : ''

        return (
            <div >
                <Carousel style={{background: 'black'}}>
                    <Carousel.Item style={{background: 'black'}}>
                        <img
                        style={{ height: "450px"}}
                        // className="d-block w-100"
                        src={require("../../images/UHS_research.JPG")}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                       
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{background: 'black'}}>
                        <img
                        style={{ height: "450px"}}
                        // className="d-block w-100"
                        src={require("../../images/uhsStudents.JPG")}
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                     
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{background: 'black'}}>
                        <img
                        style={{ height: "450px"}}
                        // className="d-block w-100"
                        src={require("../../images/uhsProfile.png")}
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>   

                
            </div>    
              
        );
    }

    renderAnnouncements = (carousel) => {
        return (
            <div className='container mt-4' style={{color: 'black'}}>
                <h4 id='announcements' style={{borderBottom: 'solid black 1px'}}>Comunicados</h4>
                <h5>
                    <Link onClick={() => { 
                            window.open(carousel.doc1) 
                            }} >
                        {!carousel.doc1 ? ''  : carousel.linkTitle1 }
                    </Link>
                    <Link onClick={() => { 
                            window.open(`https://${carousel.link1}`) 
                            }} >
                    {!carousel.link1 ? ''  : carousel.linkTitle1 }
                    </Link>
                    <div className='ml-4'>
                        {carousel.caption4}
                    </div>
                </h5>
                
                <h5>
                <Link onClick={() => { 
                            window.open(carousel.doc2) 
                            }} >
                        {!carousel.doc2 ? ''  : carousel.linkTitle2 }
                    </Link>
                    <Link onClick={() => { 
                            window.open(`https://${carousel.link2}`) 
                            }} >
                    {!carousel.link2 ? ''  : carousel.linkTitle2 }
                    </Link>
                    <div className='ml-4'>
                        {carousel.caption5}
                    </div>
                </h5>
                
                <h5>
                <Link onClick={() => { 
                            window.open(carousel.doc3) 
                            }} >
                        {!carousel.doc3 ? ''  : carousel.linkTitle3 }
                    </Link>
                    <Link onClick={() => { 
                            window.open(`https://${carousel.link3}`) 
                            }} >
                    {!carousel.link3 ? ''  : carousel.linkTitle3 }
                    </Link>
                    <div className='ml-4'>
                        {carousel.caption6}
                    </div>
                </h5>
            </div>
        )
    }

    render() {
        const {carousel } = this.state

        return (
            <div>
                <Header history={this.props.history} />
                <div>
                    <div className='text-center'>
                        {!carousel ? ( 
                                <div className='jumbotron text-center '>
                                    <h2>Carregando....</h2>
                                </div>
                                ) : (
                                    this.renderCarousel(carousel)
                                    
                                )
                            } 
                         
                        <div  id='stats' style={{height: '100px', }} className='container mt-3'>
                            <div style={{borderBottom: 'solid black 1px'}}>
                                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true} style={{color:'black'}} >
                                    <h4  >{carousel.caption1}</h4>
                                </Animated>
                            </div>
                            
                            <div className='container'>
                                    <h5 style={{ marginTop: '10px'}} className='mb-5'>{carousel.missionStatement}</h5>
                                
                            </div>    
                            
                            <div className='container'>
                                    <h5 style={{ marginTop: '10px'}} className='mb-5'>{carousel.caption2}</h5>
                                
                            </div>         

                            <div className='container'>
                                    <h5 style={{ marginTop: '10px'}} className='mb-5'>{carousel.caption3}</h5>
                                
                            </div>              
                        </div>

                        <div className='text-center' >
                            {
                                isAuthenticated() && isAuthenticated().user.code === 8290 && (
                                    <Link to={`/port/edit/carousel/${carousel._id}`} className='text-center btn btn-primary mt-4 mb-4'>Update in portuguese</Link>
                                )
                            }

{
                                isAuthenticated() && isAuthenticated().user.code === 2609 && (
                                    <Link to={`/port/edit/carousel/${carousel._id}`} className='text-center btn btn-primary mt-4 mb-4'>Update in portuguese</Link>
                                )
                            }
                        </div>
                   
                    </div>
                                        
                   
                </div>
                        
                        <div className='row container' style={{marginLeft: '150px', marginTop: '150px'}}>
                           
                            <img 
                                style={{ height: "300px", width: "200px" }}
                                className="mt-4 col-sm-6"
                                src={require("../../images/uhsMission.png")}
                                alt="Second slide" 
                                
                            />   
                            <img 
                                style={{ height: "300px", width: "200px" }}
                                className="mt-4 col-sm-6"
                                src={require("../../images/uhsVision.png")}
                                alt="Second slide" 
                                
                            />  
                           
                        </div>
                        
                        <div>
                            {this.renderAnnouncements(carousel)}
                        </div>
                                
                                
                        <footer className='mt-5'>
                            <div class="container row ml-5">
                                <img className='col-md-6 mb-4' style={{height: '150px', marginTop: '10px'}} src={require("../../images/banner.png")} /> 
                                <div className="col-md-6 d-flex justify-content-around align-items-baseline">
                                    <div >
                                        <p>1 Empire Plaza | Providence, RI 02903</p>
                                        <p>telefone: (401) 254- 4829 | Sprak-martins@uhschool.org</p>
                                        <h5 className="text-capitalize">
                                        &copy; {new Date().getFullYear()} direito autoral : <a href="/">www.uhSchool.org </a>
                                        </h5> 
                                     </div>
                                </div>
                                </div>
                        </footer> 
            </div>
        )
    }
}

export default Carol