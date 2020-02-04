import React, { Component } from "react";
import { list } from "./apiApplication";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated} from '../../auth'
import { Button } from 'react-bootstrap';
import Header from '../header/Header'

class Application extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            applications: [],
            term: '',
            searched: false,
            searchedApplication: '',
            error: '',
            searching: false,
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    loadApplications = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data)
                this.setState({ applications: data });
                

            }
        });
    };


    componentDidMount() {
        this.loadApplications(this.state.applications)
        this.renderUser()
    }


    componentWillReceiveProps() {
        this.renderUser()
    }

    handleChange = event => {
        this.setState({error: ''})
        this.setState({term: event.target.value})
    }

    search = (e) => {
        e.preventDefault()
        this.state.applications.map(application => {
            if (application.name === this.state.term) {
                this.setState({searched: true, searchedApplication: application})
            } else {
                this.setState({searching: true, error: 'Application not found'})
            }
        })

    }

    renderApplications = applications => {
        return (
            <div  id='event' className='row container'>
                {applications.map((application, i) => {                      
                    return (

                        <div  className='col-md-4 mb-5' key={i}>
                            <Link
                                to={`/port/application/${application._id}`}
                                className="mb-4 ml-5"
                                >
                                {application.name}
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { applications, searched, searchedApplication, error } = this.state;

        if (searched) { return <Redirect to={`port/application/${searchedApplication._id}`}/> } 

        return (
            <div>
               <Header history={this.props.history} />
                <div className="container">
                    <div style={{borderBottom: 'solid black 1px'}} className='row mt-4 mb-3'>
                        <h2 className="col-md-6">
                            Applications
                            {!applications.length ? "Loading..." : ""}
                        </h2>
                        <br/>

                        <form className="col-md-6 text-center" onSubmit={this.search}>
                            <input placeholder='by application name' type='text' value={this.state.term} onChange={this.handleChange} />
                            <Button onClick={this.search}>Search</Button>
                            {"  "}{error}
                        </form>
                        <hr/>
                    </div>
                
                    <div>               
                        {this.renderApplications(applications)}
                    </div>   
                
                </div>
            </div>
        );
    }
}

export default Application;