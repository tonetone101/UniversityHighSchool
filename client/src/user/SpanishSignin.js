import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {signin, authenticate} from '../auth'

class SpanishSignin extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error: '',
            redirectToReferer: false,
            loading: false
        }
    }

    handleChange = (name) => event => {
        this.setState({error: ''})
        this.setState({open: false})
        this.setState({
            [name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})
        const {email, password} = this.state
        const user = {
            email,
            password
        }
        console.log(user)
        signin(user)
        .then(data => {
            if(data.error) {
                this.setState({ error: data.error, loading: false })
            }
              else {
                  // authenticate user 
                  authenticate(data, () => {
                      this.setState({redirectToReferer: true})
                  })
              }
        })
    }

    signinForm = (email, password) => {
        return (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input onChange={this.handleChange('email')} type='email' className='form-control' value={email} />
            </div>
            
            <div className='form-group'>
                <label className='text-muted'>Contraseña</label>
                <input onChange={this.handleChange('password')} type='password' className='form-control' value={password} />
            </div>
            <button onClick={this.handleSubmit} className='btn btn-raised btn-primary'>Enviar</button>
        </form>
        )
    }



    render() {
        const {email, password, error, redirectToReferer, loading} = this.state
        
        if(redirectToReferer) {
            return <Redirect to='/spanish' />
        }

        return (
            <div id='authForm' className='container'>
                <h2 className='mt-5 mb-5'>Registrarse</h2>

                <div className='alert alert-danger' style={{display: error ? "" : "none"}}>
                    {error}
                </div>
                
                {loading ? ( 
                <div className='jumbotron text-center'>
                    <h2>Cargando....</h2>
                </div>
                ) : (
                    ""
                )
            }

                {this.signinForm(email, password)}

                <p className='mt-2'>
                    <Link
                        to="/forgot-password"
                        className="btn btn-raised btn-danger"
                    >
                        {" "}
                        Se te olvidó tu contraseña
                    </Link>
                </p>
            </div>
        )
    }
}

export default SpanishSignin