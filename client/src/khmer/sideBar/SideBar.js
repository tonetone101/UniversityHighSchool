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
                    <div>
                        <Link style={isActive(history, '/khmer/partners')} to='/khmer/partners'>
                            ដៃគូរបស់យើង
                        </Link>
                    </div>

                    <div>
                        <Link style={isActive(history, '/khmer/about')} className='mt-4' to='/khmer/about'>
                            អំពី​ពួក​យើង
                        </Link>
                    </div>

                    <div>
                        <Link style={isActive(history, '/khmer/hr')} className='mt-4' to='/khmer/hr'>
                            ធនធានមនុស្ស
                        </Link>
                    </div>
                </div>
        )
    }
}

export default withRouter(SideBar)
