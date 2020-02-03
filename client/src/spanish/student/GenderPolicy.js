import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import Header from '../header/Header'

class GenderPolicy extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
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