import React, {Component} from 'react'
import {singlePartner, remove} from './apiPartners'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../auth'
import Header from '../header/Header'

class SinglePartners extends Component {
    state = {
        partners: '',
        redirectToFaculties: false,
        redirectToSignIn: false,
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount = () => {
        const partnerId = this.props.match.params.partnersId
        console.log(this.props.match.params)
        singlePartner(partnerId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({partners: data})
            }
        }) 
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    deletepartners = () => {
        const partnersId = this.props.match.params.partnersId
        const token = isAuthenticated().token
        remove(partnersId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToFaculties: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('¿Estás seguro de que deseas eliminar el socio?')
        if(answer) {
            this.deletepartners()
        }
    }

    renderpartners = (partners) => {  
        const photoUrl = partners._id
        ? `/spanishPartners/photo/${
            partners._id
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
                           {partners.title}
                        </h4>
                        <p style={{color: 'black'}} className="card-text">
                            {partners.about}
                        </p>
                    </div>

                    <div className='row'>
                        <Link
                            to={`/spanish/partners`}
                            className="btn btn-raised btn-primary btn-sm "
                            style={{marginLeft: '30px'}}
                        >
                            Volver a socios
                        </Link>

                        {isAuthenticated().user && isAuthenticated().user.role === 'admin' && (
                            <div >
                                <div >
                                    <Link
                                        to={`/spanish/edit/partner/${partners._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                       Actualizar socios
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        Eliminar 
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        );
    }

    render() {
        const {partners, redirectToFaculties, redirectToSignIn} = this.state

        if(redirectToFaculties) {
            return <Redirect to={`/partners`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/spanish/signin`} />
         }

        return (
            <div>
                <Header history={this.props.history} />

                           <div className='container mt-5'>
                               <div style={{borderBottom: 'solid black 1px'}}>
                                    <h3 style={{color: 'black'}}>{partners.name}</h3>
                                </div>
                               
                                {!partners ? ( 
                                        <div className='jumbotron text-center '>
                                            <h2>Cargando....</h2>
                                        </div>
                                        ) : (
                                            this.renderpartners(partners)
                                        )
                                    }
                               
                            </div>
            </div>
        )
    }
}

export default SinglePartners