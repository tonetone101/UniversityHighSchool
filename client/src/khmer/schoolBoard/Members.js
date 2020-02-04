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
            searching: false,
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
        console.log(this.state.schoolBoardMembers)
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
                    const posterId = schoolBoardMember.postedBy
                        ? `/user/${schoolBoardMember.postedBy._id}`
                        : "";
                    const posterName = schoolBoardMember.postedBy
                        ? schoolBoardMember.postedBy.name
                        : " Unknown";

                        const photoUrl = schoolBoardMember.postedBy
                        ? `/user/photo/${
                            event.postedBy._id
                          }?${new Date().getTime()}`
                        : ''

                        const schoolBoardMemberPhoto = schoolBoardMember._id
                        ? `/khmerschoolBoardMember/photo/${
                            schoolBoardMember._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (

                        <div  className='col-md-4' key={i}>
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={schoolBoardMemberPhoto} />
                            <Card.Body>
                                <Card.Title>{schoolBoardMember.name.substring(0, 100)}</Card.Title>
                                <Card.Text>
                                    {schoolBoardMember.title.substring(0, 100)}
                                </Card.Text>
                                <Card.Text>
                                    {schoolBoardMember.about.substring(0, 100)}
                                </Card.Text>
                                <Link
                                        to={`/khmerschoolBoardMember/${schoolBoardMember._id}`}
                                        className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                    >
                                        អាន​បន្ថែម

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
        const { user, schoolBoardMembers, searched, searchedschoolBoardMember, error } = this.state;      

        if (searched) { return <Redirect to={`khmer/schoolBoardMember/${searchedschoolBoardMember._id}`}/> } 

        return (
            <div>
                 <Header history={this.props.history} />
             
                <div className="container">
                    <div style={{borderBottom: 'solid black 1px'}} className='row mt-4 mb-3'>
                        <h2 className="col-md-6">
                        សមាជិកក្រុមប្រឹក្សាភិបាលសាលា
                            {!schoolBoardMembers.length ? "Loading..." : ""}
                        </h2>
                        <br/>

                        <form className="col-md-6 text-center" onSubmit={this.search}>
                            <input placeholder='ដោយឈ្មោះក្រុមប្រឹក្សាភិបាលខែធ្នូ' type='text' value={this.state.term} onChange={this.handleChange} />
                            <Button onClick={this.search}>ស្វែងរក</Button>
                            {"  "}{error}
                        </form>
                        <hr/>
                    </div>
                    {
                        isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                            <div>
                                <Link className='mb-5' to='/khmer/new/schoolBoardMember'>Add schoolBoardMember in khmer</Link>
                            </div>
                        )
                    }

{
                        isAuthenticated() && isAuthenticated().user.code === 2609 && (
                            <div>
                                <Link className='mb-5' to='/khmer/new/schoolBoardMember'>Add schoolBoardMember in khmer</Link>
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