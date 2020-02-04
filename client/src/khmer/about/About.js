import React, {Component} from 'react'
import {list} from './apiAbout'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../../auth'
import {Card} from 'react-bootstrap';
import Header from '../header/Header'

class About extends Component {
    state = {
        user: '',
        about: [],
        redirectToHome: false,
        redirectToSignIn: false,
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({about: data.find(d => {
                    if (d._id == "5e344e015bc1d590d06db21b") {
                        return d
                    }
                }) 
              })
              
            }
        }) 
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    renderAbout = (about) => {
       const photoUrl = about.postedBy
        ? `${process.env.REACT_APP_API_URL}/user/photo/${
            about._id
          }?${new Date().getTime()}`
        : ''

        return (
            <div className='container mt-5' style={{textIndent: '50px'}}>
                <Card border='dark' >
                    <Card.Body>
                        <Card.Title>អំពី​ពួក​យើង</Card.Title>
                        
                        <Card.Text>
                            {about.body}
                        </Card.Text>

                        <Card.Text>
                            {about.paragraph2}
                        </Card.Text>

                        <Card.Text>
                            {about.paragraph3}
                        </Card.Text>

                        <Card.Text>
                            {about.paragraph4}
                        </Card.Text>

                        <Card.Text>
                            {about.paragraph5}
                        </Card.Text>
                    
                    </Card.Body>
                </Card>
            </div>  
              
        );
    }

    render() {
        const {about } = this.state

        return (
            <div>
                <Header history={this.props.history} />
                
                <div>
                    <div className='text-center'>
                        {!about ? ( 
                                <div className='jumbotron text-center '>
                                    <h2>កំពុងផ្ទុក....</h2>
                                </div>
                                ) : (
                                    this.renderAbout(about)
                                    
                                )
                            } 

                        <div className='text-center' >
                            {
                                isAuthenticated() && isAuthenticated().user.code === 8290 && (
                                    <Link to={`/khmer/edit/about/${about._id}`} className='text-center btn btn-primary mt-4 mb-4'>Update in khmer</Link>
                                )
                            }
                        </div>
                    </div>               
                </div>
            </div>
        )
    }
}

export default About