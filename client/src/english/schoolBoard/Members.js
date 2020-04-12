import React, { Component } from "react";
import { list } from "./apiSchoolBoardMember";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated} from '../../auth'
import { Card, Button } from 'react-bootstrap';
import Header from '../header/Header'

class SchoolBoardMember extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            schoolBoardMembers: [],
            term: '',
            searched: false,
            searchedschoolBoardMember: '',
            error: '',
            searching: false
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    loadschoolBoardMembers = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data)
                this.setState({ schoolBoardMembers: data });
                

            }
        });
    };


    componentDidMount() {
        this.loadschoolBoardMembers(this.state.schoolBoardMembers)
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
        this.state.schoolBoardMembers.map(staff => {
            if (staff.name === this.state.term) {
                this.setState({searched: true, searchedschoolBoardMember: staff})
            } else {
                this.setState({searching: true, error: 'Staff member not found'})
            }
        })

    }

    renderschoolBoardMembers = schoolBoardMembers => {
        return (
            <div  id='event' className='row container'>
                {schoolBoardMembers.map((schoolBoardMember, i) => {
                        const schoolBoardMemberPhoto = schoolBoardMember._id
                        ? `/schoolBoardMember/photo/${
                            schoolBoardMember._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (

                        <div  className='col-md-4 mb-5' key={i}>
                            <Card style={{ border: 'solid black 2px', width: '18rem' }} id='readStaff'>
                            <Card.Img variant="top" style={{height: '200px'}} src={schoolBoardMemberPhoto} />
                            <Card.Body>
                                <Card.Title>{schoolBoardMember.name.substring(0, 100)}</Card.Title>
                                <Card.Text>
                                    {schoolBoardMember.title.substring(0, 100)}
                                </Card.Text>
                                
                                <Link
                                        to={`/schoolBoardMember/${schoolBoardMember._id}`}
                                        className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                    >
                                        Learn more
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
        const { schoolBoardMembers, searched, searchedschoolBoardMember, error } = this.state;

        if (searched) { return <Redirect to={`schoolBoardMember/${searchedschoolBoardMember._id}`}/> } 

        return (
            <div>
               <Header history={this.props.history} />
                <div className="container">
                    <div style={{borderBottom: 'solid black 1px'}} className='row mt-4 mb-3'>
                        <h2 className="col-md-6">
                            {!schoolBoardMembers.length ? "Loading..." : <p style={{fontWeight: 'bold'}}>School Board Members</p>}
                        </h2>
                        <br/>

                        <form className="col-md-6 text-center" onSubmit={this.search}>
                            <input placeholder='by schoolBoardMember name' type='text' value={this.state.term} onChange={this.handleChange} />
                            <Button onClick={this.search}>Search</Button>
                            {"  "}{error}
                        </form>
                        <hr/>
                    </div>
                    {
                        isAuthenticated() && isAuthenticated().user.code === 8290 && (
                            <div>
                                <Link className='mb-5' to='/new/schoolBoardMember'>Add schoolBoardMember</Link>
                            </div>
                        )
                    }

{
                        isAuthenticated() && isAuthenticated().user.code === 2609 && (
                            <div>
                                <Link className='mb-5' to='/new/schoolBoardMember'>Add schoolBoardMember</Link>
                            </div>
                        )
                    }

{
                        isAuthenticated() && isAuthenticated().user.code === 1017 && (
                            <div>
                                <Link className='mb-5' to='/new/schoolBoardMember'>Add schoolBoardMember</Link>
                            </div>
                        )
                    }
                
                    <div>               
                        {this.renderschoolBoardMembers(schoolBoardMembers)}
                    </div>   
                
                </div>
            </div>
        );
    }
}

export default SchoolBoardMember;