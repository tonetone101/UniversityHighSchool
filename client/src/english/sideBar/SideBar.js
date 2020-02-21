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
                    <ul>
                        <li>
                            <Link style={isActive(history, '/partners')} to='/partners'>
                                    Our Partners
                            </Link>
                        </li>

                        <li>
                            <Link style={isActive(history, '/about')} className='mt-4' to='/about'>
                                    About us
                            </Link>
                        </li>

                        <li>
                            <Link style={isActive(history, '/hr')} className='mt-4' to='/hr'>
                                    Human Resource
                            </Link>
                        </li>
                    </ul>
                    
                </div>
        )
    }
}

export default withRouter(SideBar)
