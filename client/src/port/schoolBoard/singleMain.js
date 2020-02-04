import React, {Component} from 'react'
import {singleschoolBoardMeeting, remove}  from './apiSchoolBoardMeeting'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../auth'

class SingleschoolBoardMeeting extends Component {
    state = {
        schoolBoardMeeting: '',
        redirectToschoolBoardMeetings: false,
        redirectToSignIn: false
    }

    componentDidMount = () => {
        const schoolBoardMeetingId = this.props.match.params.schoolBoardMeetingId
        singleschoolBoardMeeting(schoolBoardMeetingId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({schoolBoardMeeting: data})
            }
        }) 
    }

      
    deleteschoolBoardMeeting = () => {
        const schoolBoardMeetingId = this.state.schoolBoardMeeting._id
        const token = isAuthenticated().token
        remove(schoolBoardMeetingId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToschoolBoardMeetings: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete your schoolBoardMeeting?')
        if(answer) {
            this.deleteschoolBoardMeeting()
        }
    }

    renderschoolBoardMeeting = (schoolBoardMeeting) => {
        return (
                <div  >                   
                    <p className="card-text">
                        {schoolBoardMeeting.body}
                        {schoolBoardMeeting.url}
                    </p>

                    <div className='d-inline-block mb-5'>
                        <Link
                            to={`/port/schoolBoardMeeting`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            Voltar às reuniões do conselho escolar
                        </Link>
                       {isAuthenticated().user && 
                        isAuthenticated().user.code === 8290 &&  
                        <div>
                             <Link to={`/port/schoolBoardMeeting/edit/${schoolBoardMeeting._id}`} className='btn btn-raised btn-warning ml-4 btn-sm mr-4'>
                                Update schoolBoardMeeting
                            </Link>
                            <button onClick={this.deleteConfirm} className='btn btn-raised btn-warning btn-sm'>
                                Delete Post
                            </button>
                        </div>
                        
                        }

{isAuthenticated().user && 
                        isAuthenticated().user.code === 2609 &&  
                        <div>
                             <Link to={`/port/schoolBoardMeeting/edit/${schoolBoardMeeting._id}`} className='btn btn-raised btn-warning ml-4 btn-sm mr-4'>
                                Update schoolBoardMeeting
                            </Link>
                            <button onClick={this.deleteConfirm} className='btn btn-raised btn-warning btn-sm'>
                                Delete Post
                            </button>
                        </div>
                        
                        }
                    </div>
                </div>
        );
    }

    render() {
        const {schoolBoardMeeting, redirectToschoolBoardMeetings, redirectToSignIn} = this.state
        
        if(redirectToschoolBoardMeetings) {
            return <Redirect to={`/port/schoolBoardMeeting`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/port/signin`} />
         }

        return (
            <div>
                <div  className='text-center'>
                    {!schoolBoardMeeting ? ( 
                            <div className='jumbotron text-center '>
                                <h2>Carregando....</h2>
                            </div>
                            ) : (
                                this.renderschoolBoardMeeting(schoolBoardMeeting)
                            )
                        }
                    
                </div>
            </div>
        )
    }
}

export default SingleschoolBoardMeeting