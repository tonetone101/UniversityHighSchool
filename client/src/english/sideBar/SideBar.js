import React, {Component} from 'react'
import {Link, withRouter } from 'react-router-dom'
import {isAuthenticated} from '../../auth'

const isActive = (history, path) => {
  if (history.location.pathname === path) return {
    color: '#ff9900'
  } 
}

class SideBar extends Component {
    state = {
        user: ''
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }


    render() {
        const {history} = this.props

        return (
                <div className='col-md-4 column text-center mt-5'>
                    <div className='mb-2'>
                        <Link style={isActive(history, '/part')} to='/partners'>
                                Our Partners
                        </Link>
                    </div>

                    <div className='mb-2'>
                        <Link style={isActive(history, '/abo')} className='mt-4' to='/about'>
                                About us
                        </Link>
                    </div>

                    <div className='mb-2'>
                        <Link style={isActive(history, '/hr')} className='mt-4' to='/hr'>
                                Human Resource
                        </Link>
                    </div>
                </div>
        )
    }
}

export default withRouter(SideBar)
