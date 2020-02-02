import React, {Component} from 'react'
import {singleLink, remove}  from './apiStudent'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../auth'

class SingleLink extends Component {
    state = {
        link: '',
        redirectToLinks: false,
        redirectToSignIn: false
    }

    componentDidMount = () => {
        const linkId = this.props.match.params.linkId
        singleLink(linkId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({link: data})
            }
        }) 
    }

      
    deleteLink = () => {
        const linkId = this.state.link._id
        const token = isAuthenticated().token
        remove(linkId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToLinks: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete your link?')
        if(answer) {
            this.deleteLink()
        }
    }

    renderLink = (link) => {

        return (
                <div  >
                    
                    <p className="card-text">
                        {link.body}
                        {link.url}
                    </p>

                    <div className='d-inline-block mb-5'>
                        <Link
                            to={`/student`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            Back to links
                        </Link>
                       {isAuthenticated().user && 
                        isAuthenticated().user.role === 'admin' &&  
                        <div>
                             <Link to={`/link/edit/${link._id}`} className='btn btn-raised btn-warning ml-4 btn-sm mr-4'>
                                Update Link
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
        const {link, redirectToLinks, redirectToSignIn} = this.state
        
        if(redirectToLinks) {
            return <Redirect to={`/student`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         }

        return (
            <div>
                <div  className='text-center'>
                    {!link ? ( 
                            <div className='jumbotron text-center '>
                                <h2>Loading....</h2>
                            </div>
                            ) : (
                                this.renderLink(link)
                            )
                        }
                    
                </div>
            </div>
        )
    }
}

export default SingleLink