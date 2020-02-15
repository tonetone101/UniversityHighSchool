import React, { Component } from "react";
import { list } from "./apiHr";
import { Link, withRouter } from "react-router-dom";
import {isAuthenticated} from '../../auth'
import Header from '../header/Header'
import SideBar from '../sideBar/SideBar'

class Hr extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            hr: [],
            page: 1,
            error: '',
            searching: false,
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }


    loadhr = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({ hr: data });
                

            }
        });
    };


    componentDidMount() {
        this.loadhr(this.state.hr)
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    conditionalRender = hr => {

        if (hr.docUrl !== undefined) {
             <Link onClick={() => { 
                window.open(`${hr.docUrl}`) 
                }}  
            >
                {hr.title}
            </Link> 
        } else if(hr.url !== undefined) {
             <Link onClick={() => { 
                window.open(`http://${hr.url}`) 
                }}  
            >
                {hr.title}
            </Link> 
        } else {
            <Link to={`/hr/${hr._id}`} >{hr.title}</Link>   
        }
    }

    renderhr = hr => {

        return (
            <div  className='column container'>
                {hr.map((hr, i) => {

                        const hrPhoto = hr._id
                        ? `/hr/photo/${
                            hr._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (
                        <div  className='col-md-8 mb-5' key={i}>

                            <div className='row'>
                                <div>
                                        {
                                           this.conditionalRender(hr)
                                        }
                                   
                                </div>

                                <div>
                                    <Link
                                        to={`/hr/${hr._id}`}
                                        className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                    >
                                        View
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
        const { hr } = this.state;
        const {history} = this.props
        console.log(hr)

        return (
            <div>
                <Header history={this.props.history} />
                <div className="container row">
                    <SideBar />

                    <div className='col-md-8 text-center'>
                            <div className='row mt-4 mb-3' style={{borderBottom: 'solid black 1px'}}>
                                <h2 >
                                    Human Resource
                                    {!hr.length ? "Loading..." : ""}
                                </h2>

                                <hr/>
                            </div>
                            {
                                isAuthenticated() && isAuthenticated().user.code === 8290 && (
                                    <div>
                                        <Link className='mb-5' to='/new/hr'>Add new hr</Link>
                                    </div>
                                )
                            }

                            {
                                isAuthenticated() && isAuthenticated().user.code === 1017 && (
                                    <div>
                                        <Link className='mb-5' to='/new/hr'>Add new hr</Link>
                                    </div>
                                )
                            }

        {
                                isAuthenticated() && isAuthenticated().user.code === 2609 && (
                                    <div>
                                        <Link className='mb-5' to='/new/hr'>Add new hr</Link>
                                    </div>
                                )
                            }
                    
                            <div>               
                                {this.renderhr(hr)}
                            </div>  
                        </div> 
                
                </div>
            </div>
        );
    }
}

export default withRouter(Hr)