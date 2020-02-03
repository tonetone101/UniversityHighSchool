import React, {Component} from 'react'
import {signup} from '../auth'
import {Link} from 'react-router-dom'

class PortSignup extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            role: '',
            code: '',
            password: '',
            error: '',
            open: false
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
        const {name, email, role, code, password} = this.state
        const user = {
            name,
            email,
            role,
            code,
            password
        }
        signup(user)
        .then(data => {
            if(data.error) this.setState({ error: data.error })
                else this.setState({
                    error: '',
                    name: '',
                    email: '',
                    role: '',
                    code: '',
                    password: '',
                    open: true
                })
        })
    }

    signupForm = (name, email, role, code, password) => {
        return (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Nome</label>
                <input onChange={this.handleChange('name')} type='text' className='form-control' value={name} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>O email</label>
                <input onChange={this.handleChange('email')} type='email' className='form-control' value={email} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Código</label>
                <input placeholder='Opcional' onChange={this.handleChange('code')} type='number' className='form-control' value={code} />
            </div>

            {code === '8290' ? (
                <div className='form-group'>
                    <label className='text-muted'>Papel</label>
                    <input onChange={this.handleChange('role')} type='text' className='form-control' value={role} />
                </div>
            ) : (null)}
            
            <div className='form-group'>
                <label className='text-muted'>Contraseña</label>
                <input onChange={this.handleChange('password')} type='password' className='form-control' value={password} />
            </div>
            <button onClick={this.handleSubmit} className='btn btn-raised btn-primary'>Enviar</button>
        </form>
        )
    }

    render() {
        const {name, email, role, code, password, error, open} = this.state

        return (
            <div id='authForm' className='container'>
                <h2 className='mt-5 '>Inscrever-se</h2>

                <div className='alert alert-danger' style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                <div className='alert alert-info' style={{display: open ? "" : "none"}}>
                    Nova conta foi criada com sucesso. Por favor<Link to='/port/signin' >Assinar em</Link>.
                </div>

                {this.signupForm(name, email, role, code, password)}
            </div>
        )
    }
}

export default PortSignup