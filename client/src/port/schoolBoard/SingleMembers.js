import React, {Component} from 'react'
import {singleschoolBoardMember, remove} from './apiSchoolBoardMember'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../auth'

class SingleschoolBoardMember extends Component {
    state = {
        schoolBoardMember: '',
        redirectToschoolBoardMember: false,
        redirectToSignIn: false,
    }

    componentDidMount = () => {
        const schoolBoardMemberId = this.props.match.params.schoolBoardMemberId
        singleschoolBoardMember(schoolBoardMemberId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({schoolBoardMember: data})
            }
        }) 
    }

    deleteschoolBoardMember = () => {
        const schoolBoardMemberId = this.props.match.params.schoolBoardMemberId
        const token = isAuthenticated().token
        remove(schoolBoardMemberId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToschoolBoardMember: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete your post?')
        if(answer) {
            this.deleteschoolBoardMember()
        }
    }

    renderschoolBoardMember = (schoolBoardMember) => {
        const photoUrl = schoolBoardMember._id
        ? `/portschoolBoardMember/photo/${
            schoolBoardMember._id
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

                    <div style={{color: 'black'}} className='col-md-6 mt-5'>
                        <h4 className="card-text">
                           {schoolBoardMember.title}
                        </h4>
                        <p style={{color: 'black'}} className="card-text">
                            {schoolBoardMember.about}
                        </p>
                    </div>

                    <div className='row'>
                        <Link
                            to={`/port/schoolBoardMember`}
                            className="btn btn-raised btn-primary btn-sm "
                            style={{marginLeft: '30px'}}
                        >
                            Voltar para a escola Membro do Conselho
                        </Link>

                        {isAuthenticated().user && isAuthenticated().user.code === 8290 && (
                            <div >
                                <div >
                                    <Link
                                        to={`/port/edit/schoolBoardMember/${schoolBoardMember._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        Update schoolBoardMember
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        Delete 
                                    </button>
                                </div>
                            </div>
                        )}

{isAuthenticated().user && isAuthenticated().user.code === 2609 && (
                            <div >
                                <div >
                                    <Link
                                        to={`/port/edit/schoolBoardMember/${schoolBoardMember._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        Update schoolBoardMember
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        Delete 
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        );
    }

    render() {
        const {schoolBoardMember, redirectToschoolBoardMember, redirectToSignIn} = this.state
        
        if(redirectToschoolBoardMember) {
            return <Redirect to={`/port/schoolBoardMember`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/port/signin`} />
         }

        return (
            <div>
                <div className='container mt-5'>
                    <div style={{borderBottom: 'solid black 1px'}}>
                        <h3 style={{color: 'black'}}>{schoolBoardMember.name}</h3>
                    </div>
                    
                    {!schoolBoardMember ? ( 
                            <div className='jumbotron text-center '>
                                <h2>Carregando....</h2>
                            </div>
                            ) : (
                                this.renderschoolBoardMember(schoolBoardMember)
                            )
                        }
                    
                </div>
            </div>
        )
    }
}

export default SingleschoolBoardMember