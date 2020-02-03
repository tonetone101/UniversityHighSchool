import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { getAdmission } from "./apiStudent";
import { Link } from "react-router-dom";
import AdmissionNews from './AdmissionNews'
import { ListGroup } from 'react-bootstrap';
import Header from '../header/Header'

class Admission extends Component {
    state = {
            error: "",
            user: {},
            admission: '',
            fileSize: 0,
            comments: [],
            loading: false,
            redirectToProfile: false,
            spanishPage: false,
            englishPage: false,
            khmerPage: false
        };
    
    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }
    
    updateComments = comments => {
        this.setState({comments})
        console.log(comments)
    }

    componentDidMount() {
        this.renderUser()
        const admissionId = this.props.match.params.admissionId
        getAdmission(admissionId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    admission: data,
                    comments: data.comments,
                    loading: true

                }, () => {
                    console.log(this.state.comments)
                })
                
            }
        }) 
    }


    UNSAFE_componentWillReceiveProps(props) {
        this.renderUser()
    }

    renderContact = () => {
        return (
            <div>
                <p style={{fontWeight: 'bold'}}>Contacto</p>
                <p> Teléfono: (401) 254- 4829</p>
                <p> Email: admissions@uhschool.org</p>
                <p>1 Empire Plaza | Providence, RI 02903</p>
            </div>
        )
    }

    renderRequirements = (admission) => {
        const {comments} = this.state
        return (
            <div>
                <h3>{admission.title}</h3>
                <div className='mt-5'>
                    {this.state.loading &&
                        <AdmissionNews admissionId={admission._id} comments={comments.reverse()} updateComments={this.updateComments} />
                    }
                </div>
            </div>
        )
    }

    renderAppLinks = () => {
        return (
            <div>
                <h4 style={{fontWeight: 'bold'}}>
                    Registro
                </h4>
                 <ListGroup variant="flush">
                        <ListGroup.Item> 
                            <Link onClick={() => { 
                                            window.open(`https://drive.google.com/file/d/1zkxOP_gez1IsVi7YPnH7DF5KjAZn7e8-/view?usp=sharing`) 
                                            }} >
                                    Ver formulario de solicitud en inglés

                            </Link>
                        </ListGroup.Item>

                        <ListGroup.Item> 
                            <Link onClick={() => { 
                                            window.open(`https://drive.google.com/file/d/17Vya9qqFuHaAbH5KrDdO0rRXZi9cbYQP/view?usp=sharing`) 
                                            }} >
                                    Ver formulario de solicitud en español
                            </Link>
                        </ListGroup.Item>

                        <ListGroup.Item> 
                            <Link onClick={() => { 
                                            window.open(`https://drive.google.com/file/d/14nIKl8FHPsXm3nq0D0hcAEmbAFP5EPbY/view?usp=sharing`) 
                                            }} >
                                Ver formulario de solicitud en portugués
                            </Link>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Link to='/new/application'>
                                Enviar solicitud de estudiante
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
            </div>
        )
    }

    
    render() {
        const {admission} = this.state;

        return (
            <div>
                <Header history={this.props.history} />

                <div className='container mt-3' >
                    <p className='text-center'> 
                        Bienvenido a nuestra sección de Admisiones.
                        Aquí puede ver y descargar una copia de nuestra aplicación, así como enviarnos un formulario completo. 
                    </p>
                    
                    <div className='row mt-5'>
                        <div className='col-md-3 mt-4'>
                                {this.renderAppLinks()}
                            
                            <div className='mt-4'>
                                {this.renderContact()}
                            </div>  
                        </div>

                            

                        <div className='col-md-6'>
                            {this.renderRequirements(admission)}
                           
                        </div>

                                     
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Admission;