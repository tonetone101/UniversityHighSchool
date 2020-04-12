import React, {Component} from 'react'
import {Link, withRouter } from 'react-router-dom'
import {isAuthenticated} from '../../auth'

const isActive = (history, path) => {
  if (history.location.pathname === path) return {
    color: '#ff9900'
  } 

  else if (history.location.pathname !== path) return {
    color: 'white'
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
                <div style={{backgroundColor: '#0033ff', opacity: '0.5', marginTop: '-30px'}} className='col-md-4 column text-center'>
                    <div className='mb-2'>
                        <Link style={isActive(history, '/part')} to='/part'>
                                Our Partners
                        </Link>
                    </div>

                    <div className='mb-2'>
                        <Link style={isActive(history, '/abo')} className='mt-4' to='/abo'>
                                About us
                        </Link>
                    </div>

                    <div className='mb-2'>
                        <Link style={isActive(history, '/hrd')} className='mt-4' to='/hrd'>
                                Human Resource
                        </Link>
                    </div>
                </div>
        )
    }
}

export default withRouter(SideBar)
