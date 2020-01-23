import React, { Component } from "react";
import { isAuthenticated, signout } from "../../auth";
import { create } from "./apiStudent";
import { Redirect, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';

class GenderPolicy extends Component {
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
            spanishPage: false,
            englishPage: false,
            khmerPage: false
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

    translateSpanish = () => {
        this.setState({spanishPage: true, englishPage: false, khmerPage: false})
    }

    translateEnglish = () => {
        this.setState({englishPage: true, spanishPage: false, khmerPage: false})
    }

    translateKhmer = () => {
        this.setState({khmerPage: true, spanishPage: false, englishPage: false,})
    }

    renderTopHeader = () => {
        return (
            <div>
                <Navbar id='topHeader' collapseOnSelect expand="lg" variant="dark" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto " >
                    <DropdownButton id="dropdown-basic-button" title="Traductora"  >
                                <Dropdown.Item ><a onClick={this.translateSpanish}>Spanish</a>
                                </Dropdown.Item>
                                <Dropdown.Item ><a onClick={this.translateKhmer}>Cambodian</a>
                                </Dropdown.Item>
                                <Dropdown.Item><a>Hmong</a></Dropdown.Item>

                                <Dropdown.Item><a onClick={this.translateEnglish}>English</a></Dropdown.Item>

                                <Dropdown.Item><a>Portuguese</a></Dropdown.Item>
                            
                            </DropdownButton>
                        
                        {
                            !isAuthenticated() && (
                               <nav className='row'>
                                <Nav.Link >
                                    <Link className='ml-3' to='/spanish/signin' style={{color: 'white'}}>
                                    Registrarse
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{color: 'white'}} to='/spanish/signup' >
                                    Regístrate
                                    </Link>
                                </Nav.Link>
                               </nav>
                            )
                        }
                        
                        {
                            isAuthenticated() && isAuthenticated().user && (
                                <Nav.Link>
                                    <a style={{color: 'white'}}  onClick={() => signout(() => {
                                        this.props.history.push('/spanish')
                                    })}>
                                      Desconectar
                                    </a>
                                </Nav.Link>
                            )
                        }

{   
                            isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                <Nav.Link>
                                    <Link style={{color: 'white', marginLeft: '1070px'}} to='/spanish/application' >
                                        Aplicaciones
                                    </Link>
                                </Nav.Link>
                            )
                        }
                      
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }

    renderMenu = () => {
        return (
            <div>
                 <Navbar id='menu' collapseOnSelect expand="lg" variant="dark"  >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                    <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                         <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanish'>Hogar</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/spanish/about'>Sobre nosotros</Link></Nav.Link>
                        </div>

                       <div id='link'>                
                           <Nav.Link ><Link style={{color: 'white'}} to='/spanish/faculty'>Facultad</Link></Nav.Link>
                        </div>
                        <Nav.Link ><Link style={{color: 'white'}} to='/spanish/student'>Estudiantes</Link></Nav.Link>
                        
                        
                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanish/admission'>Admisión</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link><Link style={{color: 'white'}} to='/spanish/schoolBoardMeeting'>Consejo Escolar</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanish/partners'>Nuestros compañeros</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanish/images'>Galería</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link ><Link style={{color: 'white'}} to='/spanishevents'>Próximos Eventos</Link></Nav.Link>
                        </div>
                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }


    
    render() {
        const {spanishPage, englishPage, khmerPage } = this.state;

        if(spanishPage) {
            return <Redirect to={`/spanish/genderpolicy`} />
         } else if (englishPage) {
             return <Redirect to={'/genderpolicy'} />
         } else if (khmerPage) {
            return <Redirect to={'/khmer/genderpolicy'} />
        }
        return (
            <div>
                {this.renderTopHeader()}
                <div className="text-center">
                        <img 
                            style={{height: '150px', width: '600px', backgroundColor: 'blue'}}
                            src={require("../../images/logo.png")}
                        />
                    </div>
                {this.renderMenu()}
                <div className='container mt-4' >
                    <h3>PREGUNTAS MÁS FRECUENTES DEL ESTUDIANTE: Política para estudiantes expansivos de género y transgénero</h3>
                    <div>
                        <p>
                            ¿Qué significa el término "transgénero"?
                            "Transgénero" es un adjetivo que describe a una persona cuya identidad de género o expresión de género difiere del género que figura en esa persona.
                            certificado de nacimiento original La "identidad de género" es tal como suena: qué términos de género (masculino, femenino, una combinación de géneros o sin género) utiliza una persona para su autoidentificación. La "expresión de género" es cómo esa persona expresa su propio género a los demás,
                            ya sea por vestimenta, comportamiento u otras actividades.
                        </p>

                        <p>
                            ¿Por qué hay una política específica para estudiantes transgénero y de género expansivo?
                            Las Escuelas Públicas de Providence se comprometen a crear un ambiente seguro e inclusivo para todos los estudiantes. Esta política describe formas en que la escuela puede crear
                            Un ambiente en el que los estudiantes transgénero y de género expansivo se sientan cómodos y apoyados.
                        </p>

                        <p>
                            ¿Cuál es el enfoque del distrito para los estudiantes transgénero que usan los baños escolares y los vestuarios?
                            Las Escuelas Públicas de Providence permiten a los estudiantes transgénero elegir su baño o cambiarse de instalaciones, según el género.
                            con el que se identifican o se expresan. Estudiantes que no se identifican con el género que se les asignó al nacer y que se sienten incómodos al elegir un hombre segregado o femenino
                            los baños pueden solicitar el uso de baños privados. Del mismo modo, pueden solicitar acomodaciones en los vestuarios, como particiones o un horario de cambio por separado.
                        </p>

                        <p>
                            ¿En qué equipos deportivos juegan los estudiantes transgénero?
                            Los estudiantes transgénero pueden elegir a qué equipos de educación física e intramuros desean unirse, según su identidad y expresión de género. Estudiantes involucrados en deportes interescolares.
                            siga las reglas de Rhode Island Interscholastic League: http://www.riil.org/index.php/resources/rules-and-regulations/.
                        </p>

                        <p>
                            ¿Cómo puedo apoyar a los estudiantes transgénero y de género expansivo?

                            Honre sus elecciones, incluida la identidad de género y la expresión de género que elijan.
                            Sigue su ejemplo. Refiérase a los estudiantes transgénero y de género expansivo con los mismos nombres y pronombres que eligen identificarse.
                            Señalarlos para apoyar. Si conoce a un estudiante que está experimentando o considerando una transición de género, asegúrese de que sepan que los adultos capacitados y afectuosos, conocidos como el Equipo de Puntos de Estudiantes Transgénero y Expansivo de Género, existen para ellos en su propia escuela.
                        </p>

                        <p>
                            Si usted es un estudiante transgénero o expansivo de género inscrito en las Escuelas Públicas de Providence,
                            <h3>Tú decides:</h3>
                            Con quién desea compartir su identidad y estado de género.
                            Qué nombre debe llamarte y qué pronombre usar para ti. El nombre que elija llamarse no tiene que coincidir con el que figura en su certificado de nacimiento.
                            Qué baño o vestuario quieres usar. También puede solicitar una alternativa cómoda, como una partición o un horario de cambio por separado o acceso a un baño privado.
                            A qué equipos de educación física e intramuros quieres unirte, independientemente del género. Si participa en deportes interescolares, debe seguir las reglas de la Liga Interscolástica de R.I .: http://www.riil.org/index.php/resources/rules-and-regulations/.
                        </p>
                        <p>
                            Puedes pedir:
                            Para obtener apoyo del Equipo de Puntos de Estudiantes Transgénero y Expansivo de Género de sus escuelas en cualquier momento que lo necesite Si está experimentando o planea someterse a una transición de género, los miembros del equipo pueden crear apoyos personalizados para usted y, si corresponde, su familia.
                        </p>

                        <p>  
                            Siempre informe:

                            Incidentes de intimidación, acoso y discriminación, ya sea dirigido a usted u otro estudiante.
                            Estos serán tomados en serio y manejados de manera consistente con las políticas de la junta y la ley.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default GenderPolicy;