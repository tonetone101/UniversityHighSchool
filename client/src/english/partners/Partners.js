import React, { Component } from "react";
import { list } from "./apiPartners";
import { Link, withRouter } from "react-router-dom";
import {isAuthenticated} from '../../auth'
import Header from '../header/Header'
import SideBar from '../sideBar/SideBar'
import Layout from '../about/Layout'

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
                            <div className='row'>
                                <div className='col-3'>
                                    <img src={partnersPhoto} style={{height: '150px', width: '150px'}} />
                                    <h5>{partner.name.substring(0, 100)}</h5>
                                </div>

                                <div className='col-5 ml-5'>
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
                <Layout  title="Our PARTNERS"
                        description="Productive behaviors are the catalyst that forges positive change!"
                        className="container-fluid">
                <div className="container row">
                    <SideBar />

                    <div className='col-md-8 text-center'>
                            <div className='row mt-4 mb-3'>
                                <h2 >
                                   {!partners.length ? "Loading..." : ""}
                                </h2>
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
</Layout>
            </div>
        );
    }
}

export default withRouter(Partners)