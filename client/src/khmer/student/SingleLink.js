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
        let answer = window.confirm('តើអ្នកប្រាកដជាចង់លុបតំណរបស់អ្នកឬ?')
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
                            ត្រលប់ទៅតំណ
                        </Link>
                       {isAuthenticated().user && 
                        isAuthenticated().user.role === 'admin' &&  
                        <div>
                             <Link to={`/khmer/link/edit/${link._id}`} className='btn btn-raised btn-warning ml-4 btn-sm mr-4'>
                             តំណភ្ជាប់ទាន់សម័យ
                            </Link>
                            <button onClick={this.deleteConfirm} className='btn btn-raised btn-warning btn-sm'>
                            លុបតំណ
                            </button>
                        </div>
                        
                        }

{isAuthenticated().user && 
                        isAuthenticated().user.code === 2609 &&  
                        <div>
                             <Link to={`/khmer/link/edit/${link._id}`} className='btn btn-raised btn-warning ml-4 btn-sm mr-4'>
                             តំណភ្ជាប់ទាន់សម័យ
                            </Link>
                            <button onClick={this.deleteConfirm} className='btn btn-raised btn-warning btn-sm'>
                            លុបតំណ
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
            return <Redirect to={`/khmer/student`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/khmer/signin`} />
         }

        return (
            <div>
                           <div  className='text-center'>
                                {!link ? ( 
                                        <div className='jumbotron text-center '>
                                            <h2>កំពុងផ្ទុក....</h2>
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