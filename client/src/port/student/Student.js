import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { Redirect, Link } from "react-router-dom";
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
            redirectToProfile: false
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
            <div>
                <Header history={this.props.history} />
                <div className='container' >
                    <h3 className='text-center mt-4'>Bem-vindo à nossa seção de Alunos</h3>
                    <p className='text-center'>Abaixo, você encontrará uma lista de conteúdo sobre nossas políticas e outros links importantes que acreditamos beneficiarão nossos alunos</p>

                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Link to='/port/bully'>
                                Política de bullying
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link  onClick={() => { window.open('https://docs.google.com/document/d/1jlafDy_caOu5EjBXnyKkk9eZIkKYJOgiocmEsYWtIM8/edit?usp=sharing', '_blank') }} >
                                 Manual de Bullying
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to='/port/genderpolicy'>
                                Política de gênero dos estudantes
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