import React, { Component } from "react";
import { list } from "./apiPartners";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import {isAuthenticated} from '../../auth'
import Header from '..//header/Header'

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
            <div  className='row container'>
                {partners.map((partner, i) => {

                        const partnersPhoto = partner._id
                        ? `/spanish/partners/photo/${
                            partner._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (
                        <div  className='col-md-4' key={i}>
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={partnersPhoto} />
                            <Card.Body>
                                <Card.Title>{partner.name.substring(0, 100)}</Card.Title>
                                <Card.Text>
                                    {partner.about.substring(0, 100)}
                                </Card.Text>
                                <Link
                                        to={`/spanish/partners/${partner._id}`}
                                        className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                    >
                                        Lee mas
                                    </Link>
                            </Card.Body>
                            </Card>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { user, partners } = this.state;

        return (
            <div>
                <Header history={this.props.history} />
                <div className="container">
                    <div className='row mt-4 mb-3' style={{borderBottom: 'solid black 1px'}}>
                        <h2 >
                        Nuestros compañeros
                            {!partners.length ? "Loading..." : ""}
                        </h2>

                        <hr/>
                    </div>
                    {
                        isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                            <div>
                                <Link className='mb-5' to='/spanish/new/partners'>Agregar nuevo socio</Link>
                            </div>
                        )
                    }

{
                        isAuthenticated() && isAuthenticated().user.role === 2609 && (
                            <div>
                                <Link className='mb-5' to='/spanish/new/partners'>Agregar nuevo socio</Link>
                            </div>
                        )
                    }
                
                    <div>               
                        {this.renderPartners(partners)}
                    </div>   
                
                </div>
            </div>
        );
    }
}

export default Partners