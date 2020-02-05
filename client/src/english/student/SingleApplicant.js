import React, {Component} from 'react'
import {singleApplicant, removeApplicant} from './apiStudent'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../auth'


class SingleApplicant extends Component {
    state = {
        applicant: '',
        redirectToApplicants: false,
        redirectToSignIn: false,
    }

    componentDidMount = () => {
        const applicantId = this.props.match.params.applicantId
        singleApplicant(applicantId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({applicant: data})
            }
        }) 
    }

    deleteapplicant = () => {
        const applicantId = this.props.match.params.applicantId
        const token = isAuthenticated().token
        removeApplicant(applicantId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToApplicants: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete this applicant?')
        if(answer) {
            this.deleteapplicant()
        }
    }

    renderapplicant = (applicant) => {

        return (
                <div  className='text-center'>
                     <div style={{color: 'black'}} className='mt-5'>
                        <h4 className="card-text">
                           Parent's name: {applicant.parent}
                        </h4>
                        <p style={{color: 'black'}} className="card-text">
                            Student's name: {applicant.student}
                        </p>

                        <p style={{color: 'black'}} className="card-text">
                            Email: {applicant.email}
                        </p>

                        <p style={{color: 'black'}} className="card-text">
                            Contact Number: {applicant.contact}
                        </p>
                    </div>

                    <div className='row'>
                        <Link
                            to={`/applicants`}
                            className="btn btn-raised btn-primary btn-sm "
                            // style={{marginLeft: '30px'}}
                        >
                            Back to applicants
                        </Link>

                        {isAuthenticated().user && isAuthenticated().user.code === 8290 && (
                            <div >
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        Delete 
                                    </button>
                            </div>
                        )}

                        {isAuthenticated().user && isAuthenticated().user.code === 2609 && (
                            <div >
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        Delete 
                                    </button>
                            </div>
                        )}
                    </div>
                </div>
        );
    }

    render() {
        const {applicant, redirectToApplicants, redirectToSignIn} = this.state
        
        if(redirectToApplicants) {
            return <Redirect to={`/applicants`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         }

        return (
            <div>
                           <div className='container mt-5'>
                               {/* <div style={{borderBottom: 'solid black 1px'}}>
                                    <h3 style={{color: 'black'}}>{applicant.}</h3>
                                </div> */}
                               
                                {!applicant ? ( 
                                        <div className='jumbotron text-center '>
                                            <h2>Loading....</h2>
                                        </div>
                                        ) : (
                                            this.renderapplicant(applicant)
                                        )
                                    }
                               
                            </div>
            </div>
        )
    }
}

export default SingleApplicant