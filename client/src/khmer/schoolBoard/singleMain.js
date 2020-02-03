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
                            to={`/khmer/schoolBoardMeeting`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            ត្រលប់ទៅសាលារៀនប៊រឌីមេត្រេសវិញ
                        </Link>
                       {isAuthenticated().user && 
                        isAuthenticated().user.role === 'admin' &&  
                        <div>
                             <Link to={`/khmer/schoolBoardMeeting/edit/${schoolBoardMeeting._id}`} className='btn btn-raised btn-warning ml-4 btn-sm mr-4'>
                                Update schoolBoardMeeting in khmer
                            </Link>
                            <button onClick={this.deleteConfirm} className='btn btn-raised btn-warning btn-sm'>
                                Delete board member
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
            return <Redirect to={`/khmer/schoolBoardMeeting`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/khmer/signin`} />
         }

        return (
            <div>
                           <div  className='text-center'>
                                {!schoolBoardMeeting ? ( 
                                        <div className='jumbotron text-center '>
                                            <h2>កំពុងផ្ទុក....</h2>
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