import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import Header from '../header/Header'

class Bully extends Component {
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
                    <h3>ESTUDIANTES Y POLÍTICA DE ACOSO Y ACOSO DE PERSONAL</h3>
                    <div>
                        <p>
                        Principio rector: La Junta Escolar de Providence cree que prevenir el acoso escolar y / o
                        El acoso es crítico para crear y mantener un clima y cultura escolar seguros y positivos, que respalden el rendimiento académico, aumenten la participación escolar, respeten los derechos de todas las personas y grupos, y construyan una comunidad a propósito.
                        </p>

                        <p>
                        Propósito: proteger los derechos de todas las personas a participar en la enseñanza y el aprendizaje,
                        Se prohíbe la intimidación y / o el acoso de / por cualquier estudiante, maestro, administrador, miembro del personal, padre o socio de la comunidad, que participe en cualquier actividad escolar autorizada (como se describe en el ALCANCE a continuación).
                        Para definir claramente qué constituyen acciones de intimidación y / o acoso, para resaltar la importancia de responder a las conductas de intimidación y / o acoso, y para aclarar en qué medida el Superintendente del Departamento de Escuelas Públicas de Providence (PPSD) debe aplicar medidas disciplinarias. acciones, como se especifica en las siguientes Políticas de la Junta Escolar de Providence y los Procedimientos del Distrito Escolar: Derechos y Responsabilidades de los Estudiantes, Código de Conducta, Disciplina del Estudiante y el Plan de Seguridad Escolar de Providence.
                        </p>

                        <p>
                        Definiciones: La intimidación se define como la victimización, intimidación o maltrato por parte de
                        otros en la comunidad escolar, basados ​​en desigual poder físico, psicológico o social o poder percibido. La intimidación no incluye elementos de parcialidad (como se define a continuación en Acoso). La intimidación incluye el acoso cibernético y las novatadas (como se define a continuación).
                        La intimidación implica comportamientos que pueden causar daño físico y / o emocional, no son bienvenidos, intencionales, no provocados y generalmente se repiten. La intimidación puede ser verbal, física, directa (cara a cara) o indirecta (por ejemplo, a través de otra persona, por escrito, etc.).
                        </p>

                        <p>
                        El acoso se define como un comportamiento discriminatorio no deseado, intencional y no provocado hacia una persona o personas, motivado por prejuicios basados ​​en una o más de las siguientes características reales o percibidas y / o categorías legalmente protegidas: raza, color, religión, origen étnico / origen natural , discapacidad, sexo, orientación sexual, identidad de género y edad. El acoso incluye el acoso cibernético (como se define a continuación).
                        </p>

                        <p>
                        El acoso sexual se define como acoso sexual en un entorno hostil o acoso sexual Quid Pro Quo. El acoso sexual puede ocurrir de estudiante a estudiante, de adulto a estudiante, de estudiante a adulto, de adulto a adulto, de hombre a mujer, de mujer a hombre, de mujer a mujer y de hombre a hombre.
                        El hostigamiento sexual en un entorno hostil se produce cuando avances sexuales no deseados, solicitudes de favores sexuales u otra conducta verbal, no verbal o física de naturaleza sexual por parte de otro estudiante, un empleado de la escuela o un tercero en la propiedad escolar o en una actividad relacionada con la escuela. suficientemente grave, generalizado o persistente para interferir o limitar la capacidad de un estudiante para participar o beneficiarse de los programas o actividades del PPSD, o para interferir o limitar el individuo o los individuos '
                        empleo, creando un ambiente educativo o laboral hostil, humillante, intimidante u ofensivo. Una víctima también puede ser alguien razonablemente afectado por una conducta dirigida hacia otra persona.
                        </p>

                        <p>
                        El acoso sexual Quid Pro Quo ocurre cuando un empleado del PPSD o un estudiante condiciona explícita o implícitamente la participación en un programa o actividad educativa o basa una decisión educativa en la sumisión del estudiante a avances sexuales, solicitudes de favores sexuales u otra conducta verbal o física de un naturaleza sexual, ya sea que el alumno se someta o no a la conducta. El acoso sexual quid pro quo también ocurre cuando un empleado de PPSD condiciona el empleo de un empleado de PPSD al someterse a avances sexuales, solicitudes de favores sexuales u otra conducta verbal o física de naturaleza sexual o como base para una decisión de empleo (incluyendo, entre otros) a promoción, degradación, alteración de deberes u horarios, o revisiones de desempeño).
                        El hostigamiento sexual en un entorno hostil se produce cuando avances sexuales no deseados, solicitudes de favores sexuales u otra conducta verbal, no verbal o física de naturaleza sexual por parte de otro estudiante, un empleado de la escuela o un tercero en la propiedad escolar o en una actividad relacionada con la escuela. suficientemente grave, generalizado o persistente para interferir o limitar la capacidad de un estudiante para participar o beneficiarse de los programas o actividades del PPSD, o para interferir o limitar el individuo o los individuos '
                        empleo, creando un ambiente educativo o laboral hostil, humillante, intimidante u ofensivo. Una víctima también puede ser alguien razonablemente afectado por una conducta dirigida hacia otra persona.
                        </p>
                        <p>
                        El acoso cibernético se define como cualquier daño intencional y reiterado infligido, entre otros, mediante el uso de computadoras, teléfonos celulares y otros dispositivos electrónicos. Los siguientes son ejemplos de acoso cibernético, cuando son intencionales y resultan en daño y / o angustia socioemocional:
                        • Enviar mensajes de texto a través de Internet o usar un teléfono celular o un dispositivo o medio de mensajes de texto
                        • Enviar o publicar texto, imágenes, audio o video en Internet o por Internet, a través de un teléfono celular o una red electrónica (sexting), incluidos los sitios de redes sociales
                        • Enviar una imagen o video amenazante, intimidante, gráfico o sexualmente explícito a través de Internet o utilizando un teléfono celular o una red electrónica, incluido un sitio de redes sociales
                        </p>

    <p>                
    El acoso cibernético se define como cualquier daño intencional causado, entre otros, por el uso de computadoras, teléfonos celulares y otros dispositivos electrónicos, motivado por prejuicios basados ​​en una o más de las siguientes características reales o percibidas y / o legalmente categorías protegidas: raza, color, religión, origen étnico / natural, discapacidad, sexo, orientación sexual e identidad de género.</p>
    <p>
    La novatada se define como cualquier actividad esperada de alguien que se une a un grupo que humilla, degrada, abusa o pone en peligro independientemente de la voluntad de las personas de participar.

    </p>
    <p>
    Las represalias se definen como cualquier forma de intimidación, represalia o acoso por parte de un miembro de la comunidad del PPSD dirigido contra otro miembro de la comunidad del PPSD por informar o presentar una queja, por ayudar o alentar la presentación de un informe o una queja, por cooperar en una investigación bajo este Política, o por tomar medidas consistentes con esta Política.
    </p>
                <p>
                Alcance Toda forma de intimidación, acoso, acoso cibernético y / o ciber-
                    Se prohíbe el acoso, ya sea en el aula, en las instalaciones de la escuela, inmediatamente adyacente a las instalaciones de la escuela, cuando un estudiante de PPSD viaja hacia o desde la escuela (portal a portal), o en un evento patrocinado por la escuela, ya sea que se realice o no en las instalaciones de la escuela. .
                    Providence Public Schools Providence, Rhode Island "Viajar hacia o desde la escuela (portal a portal)" también incluye, pero no se limita a (en adelante "incluido"), en un autobús escolar u otro vehículo relacionado con la escuela (incluido el uso de un distrito- pase de autobús emitido), en las paradas oficiales del autobús escolar y caminando hacia o desde la escuela dentro de un tiempo razonable antes o después del horario escolar.
                    La intimidación o el acoso, incluido el acoso cibernético o el acoso cibernético, que no se inicie en un lugar definido anteriormente está cubierto por esta política si el incidente resulta en una interrupción potencialmente sustancial del entorno de aprendizaje escolar para una o más personas y / o el día ordenado - operaciones diarias de cualquier escuela o programa escolar.
                </p>

                <p>
                Informar y Cada miembro de la comunidad de PPSD es responsable de informar a las Investigaciones el conocimiento de cualquier comportamiento cubierto en esta Política o información creíble
                    que tal acto ha tenido lugar. El superintendente o su designado identificará a una persona específica responsable de recibir y dar seguimiento a dichos informes para un edificio escolar al comienzo de cada año escolar, y dicha persona deberá coordinar e informar oportunamente los resultados de la investigación al Título 9 de todo el Distrito / Coordinador de equidad también designado por el superintendente o su designado.
                    Si un informe de acoso cibernético y / o acoso cibernético con respecto a un incidente iniciado fuera del alcance (como se define anteriormente), el superintendente investigará dicho informe para determinar si el incidente (s) resultó en una interrupción potencialmente sustancial del aprendizaje escolar entorno para uno o más individuos y / o las operaciones diarias ordenadas de cualquier escuela o programa escolar.

                </p>
                <p>
                    Procedimientos del Distrito El Superintendente deberá definir "Directrices y Procedimientos para
                    Implemente la Política de intimidación y acoso y la Política de violencia de pareja ".
                    El Superintendente deberá proporcionar pautas apropiadas para la edad de cada escuela para informar e investigar incidentes de intimidación o acoso. Las personas específicas responsables de recibir y dar seguimiento a los informes se identificarán en estos procedimientos. Dichas pautas incluirán un formulario de informe estandarizado para ser utilizado por cualquier miembro de la comunidad de PPSD. El propósito de dicho formulario de informe es desencadenar una investigación, que protege la seguridad del objetivo, los espectadores y / o los familiares / tutores / miembros de la comunidad interesados.
                    Estas pautas incluirán pautas claras sobre cuándo y cómo se deben hacer informes sobre acoso o hostigamiento a las fuerzas del orden público para la investigación de posibles cargos penales.
                    Dentro de los requisitos de FERPA, las Pautas y procedimientos para implementar la Política de intimidación y acoso y la Política de violencia de pareja incluirán una cantidad específica de tiempo dentro del cual los padres serán informados de una queja y una cantidad específica de tiempo para completar las investigaciones.
                    Además, las Pautas y procedimientos para implementar la Política de acoso y hostigamiento y la Política de violencia de pareja también incluirán un plan para comunicarse con los padres / tutores, desarrollo profesional
                    Providence Public Schools Providence, Rhode Island para todo el personal e instrucción para estudiantes de todos los niveles escolares sobre aprendizaje socioemocional y prevención de la violencia.
                </p>
                    

                    <p>
                    Consecuencias: consecuencias y medidas correctivas apropiadas para los estudiantes que se comprometen
                    los actos de acoso o hostigamiento pueden variar desde intervenciones conductuales positivas hasta la suspensión o exclusión, como se describe en el "Código de Conducta del Distrito, Grados PK-12".
                    Represalias o amenazas de represalias en cualquier forma diseñada para intimidar a la víctima de hostigamiento o acoso, aquellos que son testigos o quienes investigan un incidente de hostigamiento o hostigamiento estarán sujetos al Nivel Dos o Tres en el "Código de Conducta del Distrito, Grado PK-12 ".
                    Los actos de intimidación o acoso presuntamente cometidos por miembros adultos (incluidos maestros, administradores, miembros del personal, otro personal escolar, padres, socios de la comunidad u otros visitantes a la escuela) de la comunidad escolar se informarán a los administradores escolares y / o al designado oficina del PPSD para investigación y consecuencias, de acuerdo con los procedimientos aplicables, incluidas las acciones legales apropiadas.
                    Represalias o amenazas de represalias por parte de miembros adultos (incluidos maestros, administradores, miembros del personal, otro personal de la escuela, padres, socios de la comunidad u otros visitantes a la escuela) de la comunidad del PPSD en cualquier forma diseñada para intimidar a la víctima de, testigos de, o aquellos que investigan la intimidación o el acoso estarán sujetos a consecuencias adicionales, de acuerdo con los procedimientos apropiados.
                    </p>
                    
                    <p>
                    Rendición de cuentas Anualmente, el Superintendente también deberá informar a la Escuela
                    Junta antes del comienzo de cada año escolar sobre el número de quejas, investigaciones, actos verificados y tendencias de acoso, acoso cibernético y acoso cibernético.
                    </p>

                <p>
                Apoyo para el Puesto que la intimidación y el acoso ponen en riesgo la salud mental del objetivo, se realizará una derivación adecuada para los servicios de apoyo.
                    La escuela deberá mantener el apoyo y la comunicación continuos con el objetivo para garantizar que las represalias por informar cualquier comportamiento cubierto en esta política se aborden con prontitud. El objetivo y el padre del objetivo deben tener una variedad de opciones para garantizar la seguridad física y emocional de esa persona.
                </p>

                <p>
                Otros aspectos legales Cualquier miembro de la comunidad de PPSD también puede buscar soluciones legales o remediar otras vías de recurso, que incluyen pero no se limitan a presentar una queja
                    con: el Departamento de Educación de Rhode Island, al (401) 222-4600; la Oficina del Fiscal General de Rhode Island, División de Derechos Civiles, al (401) 274-4400; la Oficina de Derechos Civiles del Departamento de Educación de los Estados Unidos, al (617) 289-0111, y / o la Comisión de Igualdad de Oportunidades de Empleo, al (800) 669-4000; presentar una demanda civil; o perseguir el enjuiciamiento penal.
                </p>

                    <p>
                    Referencias legales R.I.G.L. sección 16-21-24 (seguridad escolar)
                    R.I.G.L. sección 16-21-26 (intimidación / acoso)
                    R.I.G.L. sección 6-38-1.1 (Discriminación sexual) R.I. Gen. Laws sección 42-112-1 et seq. (Ley de Derechos Civiles de Rhode Island de 1990) RI 28-5-1 et seq. (Prácticas laborales de empleo; Empleo justo del estado
                    Prácticas) RI 42-28-1 et seq. (Crímenes de odio) (raciales, religiosos, étnicos, sexuales
                    orientación, género o prejuicio por discapacidad R.I.G.L. sección 16-38-1 y siguientes. y 16-38-1.1 y siguientes. (Relacionado con la edad,
                    discriminación racial y sexual en la educación) R.I.G.L. sección 42-87-1 y siguientes; (Los derechos civiles de las personas con
                    Ley de Discapacidades) R.I.G.L. sección 42-80.1-1 y siguientes. (La restauración de la libertad religiosa
                    Ley) R .I. G. L. sección 11-52-4.2, § 11-52-4.3 (estatutos penales relacionados con
                    delitos cibernéticos) R.I.G.L sección 11-21-1 (Ley de novatadas de RI) Ley de Derechos Civiles de EE. UU. de 1964, Título VI (Discriminación en la educación basada
                    sobre raza, color u origen nacional) Ley de Derechos Civiles de EE. UU. de 1964, Título VII (Basado en discriminación laboral
                    sobre raza, color, religión, sexo, origen nacional) Título IX de las enmiendas de educación de 1972 (equidad de género, incluyendo
                    Acoso Sexual) Sección 504 de la Ley de Rehabilitación de 1973 (Discapacidad) Ley de Estadounidenses con Discapacidades de 1990
                    </p>
                    
                    <p>
                    Historia aprobada _______
                    Escuelas públicas de Providence Providence, Rhode Island

                    </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bully;