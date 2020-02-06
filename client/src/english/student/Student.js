import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import Links from './Links'
import { ListGroup } from 'react-bootstrap';
import Header from '../header/Header'

class Student extends Component {
    constructor() {
        super();
        this.state = {
            parent: "",
            student: "",
            birthday: "",
            contact: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false,
        };
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

        return (
            <div style={{background: '#b7b7b7'}}>
                <Header history={this.props.history} />
                <div className='container' >
                    <h3 className='text-center mt-4'>Welcome to our Student section</h3>
                    <p className='text-center'>Below you'll find a list of content about our policies and other important links we believe will benefit our students</p>

                    <ListGroup variant="flush" style={{background: '#b7b7b7'}}>
                        <ListGroup.Item>
                            <Link to='/bully'>
                                Bullying policy
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link  onClick={() => { window.open('https://docs.google.com/document/d/1jlafDy_caOu5EjBXnyKkk9eZIkKYJOgiocmEsYWtIM8/edit?usp=sharing', '_blank') }} >
                                Bullying Manual 
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to='/genderpolicy'>
                                Student gender policy
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
                {//LINKS
                }
                <Links />
                </div>
            </div>
        );
    }
}

export default Student;