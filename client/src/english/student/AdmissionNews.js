import React from 'react'
import { isAuthenticated } from "../../auth";
import {comment, uncomment, edit} from './apiStudent'
import { Link } from "react-router-dom";

class AdmissionNews extends React.Component {
    state = {
        text: '',
        url: '',
        edit: false,
        error: ''
    }

    handleChange = event => {
        this.setState({error: ''})
        this.setState({
            text: event.target.value
        })
    }

    handleUrlChange = event => {
        this.setState({error: ''})
        this.setState({
            url: event.target.value
        })
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

    renderEdit = () => {
        this.setState({
            edit: true
        })
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
            

            comment(userId, token, admissionId, {text: this.state.text, url: this.state.url})
                .then(data => {
                    console.log(data)
                    if(data.error) {
                        console.log(data.error)
                    } else {
                        this.setState({text: ''})
                        this.setState({url: ''})
                        // push up data to parent component
                        this.props.updateComments(data.comments)
                    }
                })
         }
    }

    editComment = e => {
        e.preventDefault()
        if(!isAuthenticated()) {
            this.setState({error: 'Please sign in to edit an announcement'})
            return false
        }

        if(this.isValid()) {
            const userId = isAuthenticated().user._id
            const admissionId = this.props.admissionId
            const token = isAuthenticated().token
            

            edit(userId, token, admissionId, {text: this.state.text, url: this.state.url})
                .then(data => {
                    console.log(data)
                    if(data.error) {
                        console.log(data.error)
                    } else {
                        this.setState({text: '', edit: false})
                        this.setState({url: ''})
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
                                isAuthenticated() && isAuthenticated().user.code === 8290 && (
                                    <div>
                                        <form onSubmit={this.addComment}>
                                            <div className='form-group col-md-6 '>
                                                <textarea style={{ width: "950px" }} type='text' placeholder='Leave an announcement' value={this.state.text} onChange={this.handleChange} className='form-control'/>
                                                <input style={{ width: "950px" }} type='text' placeholder='google doc link' value={this.state.url} onChange={this.handleUrlChange} className='form-control'/>
                                                <button  className="btn btn-raised btn-primary btn-sm mt-3" style={{color: 'white'}} >Add announcement</button>
                                            </div>
                                        </form>
                                    </div>
                                )
                            }

{
                                isAuthenticated() && isAuthenticated().user.role === 1017 && (
                                    <div>
                                        <form onSubmit={this.addComment}>
                                            <div className='form-group col-md-6 '>
                                                <textarea style={{ width: "950px" }} type='text' placeholder='Leave an announcement' value={this.state.text} onChange={this.handleChange} className='form-control'/>
                                                <input style={{ width: "950px" }} type='text' placeholder='google doc link' value={this.state.url} onChange={this.handleUrlChange} className='form-control'/>
                                                <button  className="btn btn-raised btn-primary btn-sm mt-3" style={{color: 'white'}} >Add announcement</button>
                                            </div>
                                        </form>
                                    </div>
                                )
                            }

{
                                isAuthenticated() && isAuthenticated().user.code === 2609 && (
                                    <div>
                                        <form onSubmit={this.addComment}>
                                            <div className='form-group col-md-6 '>
                                                <textarea style={{ width: "950px" }} type='text' placeholder='Leave an announcement' value={this.state.text} onChange={this.handleChange} className='form-control'/>
                                                <input style={{ width: "950px" }} type='text' placeholder='google doc link' value={this.state.url} onChange={this.handleUrlChange} className='form-control'/>
                                                <button  className="btn btn-raised btn-primary btn-sm mt-3" style={{color: 'white'}} >Add announcement</button>
                                            </div>
                                        </form>
                                    </div>
                                )
                            }
                           
                            <div className='alert alert-danger' style={{display: error ? "" : "none"}}>
                                {error}
                            </div>

                            <div className="col-md-12 col-md-offset-2">
                               
                                {comments.map((comment, i) => (
                                    <div key={i}>
                                       
                                            <div className='row'>
                                                  
                                                       
                                                            {
                                                                this.state.edit ? (
                                                                    <form onSubmit={this.editComment}>
                                                                        <div className='form-group col-md-6 '>
                                                                            <textarea style={{ width: "950px" }} type='text' value={this.state.text} onChange={this.handleChange} className='form-control'/>
                                                                            <input style={{ width: "950px" }} type='text' placeholder='google doc link' value={this.state.url} onChange={this.handleUrlChange} className='form-control'/>
                                                                            <button  className="btn btn-raised btn-primary btn-sm mt-3" style={{color: 'white'}} >Edit announcement</button>
                                                                        </div>
                                                                    </form>
                                                                ) : (
                                                                    <Link onClick={() => { 
                                                                        window.open(comment.url) 
                                                                        }}>
                                                                            <p className='col-md-8'>
                                                                                {comment.text}
                                                                            </p>
                                                                    </Link>
                                                                    )
                                                            }
                                               
                                               
                                                <span className='col-md-4' >
                                                    <div >{new Date(comment.created).toDateString()}</div>
                                                    {   
                                                        isAuthenticated() && isAuthenticated().user.code === 8290 &&  
                                                        (
                                                            
                                                            <span onClick={() => this.deleteConfirm(comment)} className='text-danger '>
                                                                Remove
                                                            </span>
                                                            
                                                        
                                                        )
                                                        
                                                    }

{   
                                                        isAuthenticated() && isAuthenticated().user.code === 2609 &&  
                                                        (
                                                            
                                                            <span onClick={() => this.deleteConfirm(comment)} className='text-danger '>
                                                                Remove
                                                            </span>
                                                            
                                                        
                                                        )
                                                        
                                                    }

                                                {
                                                    isAuthenticated() && isAuthenticated().user.code === 8290 &&  
                                                        (
                                                            
                                                            <span onClick={() => this.renderEdit(comment)} className='text-danger '>
                                                                Edit
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