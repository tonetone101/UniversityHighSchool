import React, { Component } from "react";
import { list, read } from "./apiPartners";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated} from '../../auth'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton, Card, Button, InputGroup, FormControl} from 'react-bootstrap';


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
    }

    renderPartners = partners => {

        return (
            <div  className='row container'>
                {partners.map((partner, i) => {

                        const partnersPhoto = partner._id
                        ? `/partners/photo/${
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
                                        to={`/partner/${partner._id}`}
                                        className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                    >
                                        Read more
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
        const { user, partners, error } = this.state;


        return (
            <div className="container">
                <div className='row mt-4 mb-3'>
                    <h2 className="col-md-6" style={{borderBottom: 'solid black 1px'}}>
                        Our Partners
                        {!partners.length ? "Loading..." : ""}
                    </h2>

                    <hr/>
                </div>
                {
                    isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                        <div>
                            <Link className='mb-5' to='/new/partners'>Add new partner</Link>
                        </div>
                    )
                }
               
                <div>               
                    {this.renderPartners(partners)}
                 </div>   
               
            </div>
        );
    }
}

export default Partners