import React, { Component } from "react";
import { list } from "./apiPartners";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import {isAuthenticated} from '../../auth'
import Header from '../header/Header'
import SideBar from '../sideBar/SideBar'

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
                        ? `/khmerPartners/photo/${
                            partner._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (
                        <div className='col-md-8 mb-5' key={i}>
                              <div className='row'>
                                <div>
                                    <img src={partnersPhoto} style={{height: '150px', width: '150px'}} />
                                    <h5>{partner.name.substring(0, 100)}</h5>
                                </div>

                                <div>
                                    <p>
                                        {partner.about}
                                    </p>

                                    <Link
                                        to={`/khmer/partners/${partner._id}`}
                                        className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                    >
                                        សូមមើល
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
        const { user, partners} = this.state

        return (
            <div>
                 <Header history={this.props.history} />
               
                 <div className="container row">
                    <SideBar />

                    <div className='col-md-8 text-center'>
                    <div className='row mt-4 mb-3' style={{borderBottom: 'solid black 1px'}}>
                        <h2 >
                        ដៃគូរបស់យើង
                            {!partners.length ? "Loading..." : ""}
                        </h2>

                        <hr/>
                    </div>
                    {
                        isAuthenticated() && isAuthenticated().user.code === 8290 && (
                            <div>
                                <Link className='mb-5' to='/khmer/new/partners'>បន្ថែមដៃគូថ្មី</Link>
                            </div>
                        )
                    }

{
                        isAuthenticated() && isAuthenticated().user.code === 2609 && (
                            <div>
                                <Link className='mb-5' to='/khmer/new/partners'>បន្ថែមដៃគូថ្មី</Link>
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

export default Partners