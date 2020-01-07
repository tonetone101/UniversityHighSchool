import React, {Component} from 'react'
import {signup} from '../auth'
import {Link} from 'react-router-dom'

class khmerSignup extends Component {
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
                <label className='text-muted'>នាមខ្លួន</label>
                <input onChange={this.handleChange('name')} type='text' className='form-control' value={name} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>អ៊ីមែល</label>
                <input onChange={this.handleChange('email')} type='email' className='form-control' value={email} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>លេខកូដ</label>
                <input placeholder='Opcional' onChange={this.handleChange('code')} type='number' className='form-control' value={code} />
            </div>

            {code === '8290' ? (
                <div className='form-group'>
                    <label className='text-muted'>ក្រដាស</label>
                    <input onChange={this.handleChange('role')} type='text' className='form-control' value={role} />
                </div>
            ) : (null)}
            
            <div className='form-group'>
                <label className='text-muted'>ពាក្យសម្ងាត់</label>
                <input onChange={this.handleChange('password')} type='password' className='form-control' value={password} />
            </div>
            <button onClick={this.handleSubmit} className='btn btn-raised btn-primary'>ដាក់ស្នើ
</button>
        </form>
        )
    }



    render() {
        const {name, email, role, code, password, error, open} = this.state

        return (
            <div id='authForm' className='container'>
                <h2 className='mt-5 '>ចុះឈ្មោះ</h2>

                <div className='alert alert-danger' style={{display: error ? "" : "none"}}>
                    {error}
                </div>

                <div className='alert alert-info' style={{display: open ? "" : "none"}}>
                គណនីថ្មីត្រូវបានបង្កើតដោយជោគជ័យ។ សូម<Link to='/khmer/signin' >ចុះឈ្មោះ</Link>.
                </div>

                {this.signupForm(name, email, role, code, password)}
            </div>
        )
    }
}

export default khmerSignup