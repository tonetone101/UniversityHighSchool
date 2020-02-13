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
        user: '',
        about: [],
        redirectToHome: false,
        redirectToSignIn: false,
        spanishPage: false,
        englishPage: false,
        khmerPage: false
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
                    <div>
                        <Link style={isActive(history, '/partners')} to='/partners'>
                                Our Partners
                        </Link>
                    </div>

                    <div>
                        <Link style={isActive(history, '/about')} className='mt-4' to='/about'>
                                About us
                        </Link>
                    </div>
                </div>
        )
    }
}

export default withRouter(SideBar)
