import React, { Component } from "react";
import { getApplicants } from "./apiStudent";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated} from '../../auth'
import { Card, Button } from 'react-bootstrap';
import Header from '../header/Header'

class Applicants extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            applicants: [],
            term: '',
            searched: false,
            searchedApplicants: '',
            error: '',
            searching: false
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    loadsApplicants = page => {
         getApplicants(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data)
                this.setState({ applicants: data });
                

            }
        });
    };


    componentDidMount() {
        this.loadsApplicants(this.state.applicants)
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
        this.state.applicants.map(applicant => {
            if (applicant.student === this.state.term) {
                this.setState({searched: true, searchedApplicants: applicant})
            } else {
                this.setState({searching: true, error: 'Student applicant not found'})
            }
        })

    }

    renderapplicants = applicants => {
        return (
            <div className='row container'>
                {applicants.map((applicant, i) => {
                        
                    return (

                        <div  className='col-md-4' key={i}>
                            <Link to={`/applicant/${applicant._id}`}>
                                <p>
                                    {applicant.student}
                                </p>
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { applicants, searched, searchedApplicants, error } = this.state;

        if (searched) { return <Redirect to={`applicant/${searchedApplicants._id}`}/> } 

        return (
            <div>
               <Header history={this.props.history} />
                <div className="container">
                    <div style={{borderBottom: 'solid black 1px'}} className='row mt-4 mb-3'>
                        <h2 className="col-md-6">
                            Students to contact
                            {!applicants.length ? "Loading..." : ""}
                        </h2>
                        <br/>

                        <form className="col-md-6 text-center" onSubmit={this.search}>
                            <input placeholder='by applicant name' type='text' value={this.state.term} onChange={this.handleChange} />
                            <Button onClick={this.search}>Search</Button>
                            {"  "}{error}
                        </form>
                        <hr/>
                    </div>
                
                    <div>               
                        {this.renderapplicants(applicants)}
                    </div>   
                
                </div>
            </div>
        );
    }
}

export default Applicants;