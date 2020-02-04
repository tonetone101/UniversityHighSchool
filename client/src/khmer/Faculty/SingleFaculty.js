import React, {Component} from 'react'
import {singleFaculty, remove} from './apiFaculty'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../auth'

class SingleFaculty extends Component {
    state = {
        faculty: '',
        redirectToFaculties: false,
        redirectToSignIn: false,
    }

    componentDidMount = () => {
        const facultyId = this.props.match.params.facultyId
        singleFaculty(facultyId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({faculty: data})
            }
        }) 
    }

    deleteFaculty = () => {
        const facultyId = this.props.match.params.facultyId
        const token = isAuthenticated().token
        remove(facultyId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToFaculties: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('តើអ្នកពិតជាចង់លុបប្រកាសរបស់អ្នកមែនទេ?')
        if(answer) {
            this.deleteFaculty()
        }
    }

    renderFaculty = (faculty) => {
        const photoUrl = faculty._id
        ? `/khmerFaculty/photo/${
            faculty._id
          }?${new Date().getTime()}`
        : '';

        return (
                <div  className='row'>
                     <div className='col-md-6 mt-5'>
                        <img 
                            src={photoUrl}
                            alt=''
                            onError={i =>
                                (i.target.src = ``)
                            }
                            className="img-thunbnail mb-3 ml-50"
                            style={{height: '500px', width: '500px', objectFit: 'cover', borderRadius: '10px'}}
                        />
                   </div>

                    <div className='col-md-6 mt-5'>
                        <p style={{color: 'black'}} className="card-text">
                         {faculty.title}
                        </p>
                        
                        <p style={{color: 'black'}} className="card-text">
                        {faculty.about}
                        </p>
                    </div>

                    <div className='row'>
                        <Link
                            to={`/khmer/faculty`}
                            className="btn btn-raised btn-primary btn-sm "
                            style={{marginLeft: '30px'}}
                        >
                            ត្រលប់ទៅមហាវិទ្យាល័យវិញ
                        </Link>

                        {isAuthenticated().user && isAuthenticated().user.code === 8290 && (
                            <div >
                                <div >
                                    <Link
                                        to={`/khmer/edit/faculty/${faculty._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        ធ្វើឱ្យទាន់សម័យមហាវិទ្យាល័យ
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        យកចេញ
                                    </button>
                                </div>
                            </div>
                        )}

{isAuthenticated().user && isAuthenticated().user.code === 2609 && (
                            <div >
                                <div >
                                    <Link
                                        to={`/khmer/edit/faculty/${faculty._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        ធ្វើឱ្យទាន់សម័យមហាវិទ្យាល័យ
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        យកចេញ
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        );
    }

    render() {
        const {faculty, redirectToFaculties, redirectToSignIn} = this.state
        
        if(redirectToFaculties) {
            return <Redirect to={`/khmer/faculty`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/khmer/signin`} />
         }

        return (
            <div>
                           <div className='container mt-5'>
                                <div style={{borderBottom: 'solid black 1px'}}>
                                    <h3 style={{color: 'black'}}>{faculty.name}</h3>
                                </div>
                                {!faculty ? ( 
                                        <div className='jumbotron text-center '>
                                            <h2>កំពុងផ្ទុក....</h2>
                                        </div>
                                        ) : (
                                            this.renderFaculty(faculty)
                                        )
                                    }
                               
                            </div>
            </div>
        )
    }
}

export default SingleFaculty