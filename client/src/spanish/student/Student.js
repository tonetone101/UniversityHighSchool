import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import Links from './Links'
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
            <div>
                <Header history={this.props.history} />

                <div className='container' >
                    <h3 className='text-center'>Bienvenido a nuestra sección de estudiantes</h3>
                    <p className='text-center'>A continuación encontrará una lista de contenido sobre nuestras políticas y otros enlaces importantes que creemos que beneficiarán a nuestros estudiantes.</p>
                <ul>
                    <li>
                        <Link to='/spanish/bully'>
                                Política de intimidación
                        </Link>
                    </li>

                    <li>
                        <Link  onClick={() => { window.open('https://docs.google.com/document/d/1jlafDy_caOu5EjBXnyKkk9eZIkKYJOgiocmEsYWtIM8/edit?usp=sharing', '_blank') }} >
                                Manual de intimidación
                        </Link>
                    </li>

                    <li>
                        <Link to='/spanish/genderpolicy'>
                                Política de género estudiantil
                        </Link>
                    </li>
                    
                    
                </ul>
                <Links />
                </div>
            </div>
        );
    }
}

export default Student;