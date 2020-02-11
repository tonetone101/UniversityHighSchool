import React, { Component } from "react";
import { list } from "./apiPartners";
import { Link, withRouter } from "react-router-dom";
import { Card } from 'react-bootstrap';
import {isAuthenticated} from '../../auth'
import Header from '../header/Header'

const isActive = (history, path) => {
    if (history.location.pathname === path) return {
      color: '#ff9900'
    } 
  }

class Partners extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            partners: [],
            page: 1,
            error: '',
            searching: false,
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }


    loadPartners = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ partners: data });
                

            }
        });
    };


    componentDidMount() {
        this.loadPartners(this.state.partners)
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    renderPartners = partners => {

        return (
            <div  className='column container'>
                {partners.map((partner, i) => {

                        const partnersPhoto = partner._id
                        ? `/partners/photo/${
                            partner._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (
                        <div  className='col-md-8 mb-5' key={i}>
                            {/* <Card >
                            <Card.Img variant="top" src={partnersPhoto} />
                            <Card.Body>
                                <Card.Title>{partner.name.substring(0, 100)}</Card.Title>
                                <Card.Text>
                                    {partner.about.substring(0, 100)}
                                </Card.Text>
                                    <Link
                                        to={`/partners/${partner._id}`}
                                        className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                    >
                                        Read more
                                    </Link>
                            </Card.Body>
                            </Card> */}

                            <div className='row'>
                                <div>
                                    <img src={partnersPhoto} style={{height: '150px', width: '10px'}} />
                                    <h5>{partner.name.substring(0, 100)}</h5>
                                </div>

                                <div>
                                    <p>
                                        {partner.about}
                                    </p>

                                    <Link
                                        to={`/partners/${partner._id}`}
                                        className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                    >
                                        Read more
                                    </Link>
                                </div>

                            </div>

                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { partners } = this.state;
        const {history} = this.props

        return (
            <div>
                <Header history={this.props.history} />
                <div className="container row">
                    <div className='col-md-4 column text-center mt-5'>
                        <div>
                            <Link style={isActive(history, '/partners')} to='/partners'>
                                    Our Partners
                            </Link>
                        </div>
                        
                        <div>
                            <Link style={isActive(history, '/about')} className='mt-4' to='/about'>
                                    About us
                            </Link>
                         </div>
                    </div>

                    <div className='col-md-8 text-center'>
                            <div className='row mt-4 mb-3' style={{borderBottom: 'solid black 1px'}}>
                                <h2 >
                                    Our Partners
                                    {!partners.length ? "Loading..." : ""}
                                </h2>

                                <hr/>
                            </div>
                            {
                                isAuthenticated() && isAuthenticated().user.code === 8290 && (
                                    <div>
                                        <Link className='mb-5' to='/new/partners'>Add new partner</Link>
                                    </div>
                                )
                            }

                            {
                                isAuthenticated() && isAuthenticated().user.code === 1017 && (
                                    <div>
                                        <Link className='mb-5' to='/new/partners'>Add new partner</Link>
                                    </div>
                                )
                            }

        {
                                isAuthenticated() && isAuthenticated().user.code === 2609 && (
                                    <div>
                                        <Link className='mb-5' to='/new/partners'>Add new partner</Link>
                                    </div>
                                )
                            }
                    
                            <div>               
                                {this.renderPartners(partners)}
                            </div>  
                        </div> 
                
                </div>
            </div>
        );
    }
}

export default withRouter(Partners)