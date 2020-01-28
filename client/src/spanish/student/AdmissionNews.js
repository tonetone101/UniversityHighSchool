import React from 'react'
import { isAuthenticated } from "../../auth";
import {comment, uncomment} from './apiStudent'
import { Link } from "react-router-dom";

class AdmissionNews extends React.Component {
    state = {
        text: '',
        error: ''
    }

    handleChange = event => {
        this.setState({error: ''})
        this.setState({text: event.target.value})
    }

    isValid = () => {
        const {text} = this.state
        if(!text.length > 0 || text.length > 150) {
            this.setState({
                error: "Annoucement should not be empty and must be less than 150 characters"
            })
            return false
        }
        return true
    }

    addComment = e => {
        e.preventDefault()

        if(!isAuthenticated()) {
            this.setState({error: 'Please sign in to leave an announcement'})
            return false
        }

        if(this.isValid()) {
            const userId = isAuthenticated().user._id
            const admissionId = this.props.admissionId
            const token = isAuthenticated().token
            

            comment(userId, token, admissionId, {text: this.state.text})
                .then(data => {
                    if(data.error) {
                        console.log(data.error)
                    } else {
                        this.setState({text: ''})
                        // push up data to parent component
                        this.props.updateComments(data.comments)
                    }
                })
         }
    }

    deleteComment = (comment) => {
        const userId = isAuthenticated().user._id
        const admissionId = this.props.admissionId
        const token = isAuthenticated().token
        

        uncomment(userId, token, admissionId, comment)
            .then(data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    // push up data to parent component
                    this.props.updateComments(data.comments)
                }
            })
    }

    deleteConfirm = (comment) => {
        let answer = window.confirm('Are you sure you want to delete your announcement?')
        if(answer) {
            this.deleteComment(comment)
        }
    }

    render() {
       
         const {comments} = this.props
         const {error} = this.state
         console.log(this.props)

        return (
            <div>
                        {
                                isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                    <form onSubmit={this.addComment} >
                                        <div className='form-group col-md-6 '>
                                            <textarea style={{ width: "950px" }} type='text' placeholder='Leave an announcement' value={this.state.text} onChange={this.handleChange} className='form-control'/>
                                            <button className="btn btn-raised btn-primary btn-sm mt-3" style={{color: 'white'}} >Add announcement in spanish</button>
                                        </div>
                                    </form>
                                )
                            }
                           
                            <div className='alert alert-danger' style={{display: error ? "" : "none"}}>
                                {error}
                            </div>

                            <div className="col-md-12 col-md-offset-2">
                               
                                {comments.map((comment, i) => (
                                    <div key={i}>
                                       
                                            <div className='row'>
                                                
                                                    <p className='col-md-8'>
                                                        {comment.text}
                                                    </p>
                                               
                                               
                                                <span className='col-md-4' >
                                                    <div >{new Date(comment.created).toDateString()}</div>
                                                    {   
                                                        isAuthenticated() && isAuthenticated().user.role === 'admin' &&  
                                                        (
                                                            
                                                            <span onClick={() => this.deleteConfirm(comment)} className='text-danger '>
                                                                Remove
                                                            </span>
                                                            
                                                        
                                                        )
                                                        
                                                    }
                                                </span>
                                            </div>
                                       
                                    </div>
                                ))}
                            </div>
                        
            </div>
        )
    }
}

export default AdmissionNews