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
                <h3> POLÍTICA DE ALUNOS E ASSÉDIO POR PESSOAL </h3>
                    <div>
                        <p>
                        Princípio Orientador: O Conselho da Providence School acredita que a prevenção do bullying e / ou
                        o assédio é fundamental para criar e manter um clima e uma cultura escolares seguros, seguros e positivos, que apóie o desempenho acadêmico, aumente o engajamento escolar, respeite os direitos de todos os indivíduos e grupos e construa propositadamente a comunidade.
                        </p>

                        <p>
                        Objetivo: Proteger os direitos de todas as pessoas de se envolverem no ensino e na aprendizagem,
                        É proibido o assédio moral e / ou assédio de / por qualquer aluno, professor, administrador, membro da equipe, pai ou parceiro da comunidade, participando de qualquer atividade escolar sancionada (conforme descrito em SCOPE abaixo).
                        Definir claramente o que constitui ações de bullying e / ou assédio, destacar a importância de responder a comportamentos de bullying e / ou assédio e esclarecer até que ponto o Superintendente do Departamento de Escola Pública de Providence (PPSD) é orientado a aplicar medidas disciplinares. ações, conforme especificado nas seguintes Políticas e Procedimentos do Distrito Escolar do Conselho Escolar de Providence: Direitos e Responsabilidades do Estudante, Código de Conduta, Disciplina do Estudante e Plano de Segurança da Escola de Providence.
                        </p>

                        <p>
                        Definições: Bullying é definido como vitimização, intimidação ou maus-tratos por
                        outros na comunidade escolar, baseados em poder físico, psicológico ou social desigual ou poder percebido. O bullying não inclui elementos de viés (conforme definido abaixo em Assédio). O bullying inclui cyber-bullying e trote (conforme definido abaixo).
                        O bullying implica comportamentos que podem causar danos físicos e / ou emocionais, indesejáveis, intencionais, não provocados e geralmente repetidos. O bullying pode ser verbal, físico, direto (face a face) ou indireto (por exemplo, através de outra pessoa, por escrito, etc.).
                        </p>

                        <p>
                        O assédio é definido como um comportamento discriminatório indesejado, intencional e não provocado em relação a um indivíduo ou indivíduos, motivado por preconceitos com base em qualquer uma ou mais das seguintes características reais ou percebidas e / ou categorias legalmente protegidas: raça, cor, religião, etnia / origem natural , deficiência, sexo, orientação sexual, identidade de gênero e idade. O assédio inclui assédio cibernético (conforme definido abaixo).
                        </p>

                        <p>
                        O assédio sexual é definido como assédio sexual em ambiente hostil ou assédio sexual Quid Pro Quo. O assédio sexual pode ocorrer aluno a aluno, adulto a aluno, aluno a adulto, adulto a adulto, homem a mulher, mulher a homem, mulher a mulher e homem a homem.
                        O assédio sexual em ambiente hostil ocorre quando avanços sexuais indesejados, solicitações de favores sexuais ou outra conduta verbal, não verbal ou física de natureza sexual por outro aluno, funcionário da escola ou terceiros na propriedade da escola ou em uma atividade relacionada à escola é suficientemente severo, difundido ou persistente, de modo a interferir ou limitar a capacidade de um aluno de participar ou se beneficiar de programas ou atividades de PPSD, ou interferir ou limitar um indivíduo ou indivíduos '
                        emprego, criando um ambiente educacional ou de trabalho hostil, humilhante, intimidador ou ofensivo. Uma vítima também pode ser alguém razoavelmente afetado por conduta direcionada a outro indivíduo.
                        </p>

                       
<p>
                        O assédio sexual Quid Pro Quo ocorre quando um funcionário da PPSD ou um aluno condiciona explícita ou implicitamente a participação em um programa ou atividade educacional ou baseia uma decisão educacional na submissão do aluno a avanços sexuais, pedidos de favores sexuais ou outra conduta verbal ou física de uma pessoa. natureza sexual, independentemente de o aluno se submeter à conduta. O assédio sexual proporcional também ocorre quando um funcionário da PPSD condiciona o emprego de um funcionário da PPSD à submissão a avanços sexuais, solicitações de favores sexuais ou outra conduta verbal ou física de natureza sexual ou como base para uma decisão de emprego (incluindo, sem limitação) promoção, rebaixamento, alteração de deveres ou horas ou análises de desempenho).
                        </p>
                        <p>
                        O cyberbullying é definido como qualquer dano voluntário e repetido infligido pelo uso de computadores, telefones celulares e outros dispositivos eletrônicos, mas não limitado a ele. A seguir, exemplos de cyberbullying, quando são intencionais e resultam em danos e / ou angústias socioemocionais:
                        • Enviar mensagens de texto pela Internet ou usar um telefone celular ou dispositivo de texto ou mídia
                        • Envio ou postagem de texto, imagens, áudio ou vídeo na ou pela Internet ou por telefone celular ou rede eletrônica (sexting), incluindo sites de redes sociais
                        • Enviar uma foto ou vídeo ameaçador, intimidador, gráfico ou sexualmente explícito pela Internet ou usando um telefone celular ou rede eletrônica, incluindo site de rede social
                        </p>

                        <p>
        O assédio cibernético é definido como qualquer dano doloso infligido pelo uso de computadores, telefones celulares e outros dispositivos eletrônicos, motivado por preconceito com base em qualquer uma ou mais das seguintes características reais ou percebidas e / ou legalmente categorias protegidas: raça, cor, religião, etnia / origem natural, deficiência, sexo, orientação sexual e identidade de gênero.
    </p>
    <p>
    Hazing é definido como qualquer atividade esperada de alguém ingressar em um grupo que humilha, degrada, abusa ou põe em perigo, independentemente da disposição das pessoas em participar.

    </p>
    <p>
    A retaliação é definida como qualquer forma de intimidação, represália ou assédio por um membro da comunidade PPSD direcionado a outro membro da comunidade PPSD por relatar ou registrar uma reclamação, por ajudar ou incentivar a apresentação de um relatório ou reclamação, por cooperar em uma investigação sob esta Política ou por tomar medidas consistentes com esta Política.

    </p>
    <p>
                Escopo Todas as formas de bullying, assédio, cyberbullying e / ou cyber-
                    o assédio é proibido, seja na sala de aula, nas instalações da escola, imediatamente adjacente às instalações da escola, quando um aluno de PPSD estiver viajando para a escola (portal para portal) ou em um evento patrocinado pela escola, realizado ou não nas instalações da escola .
                    Escolas Públicas de Providence Providence, Rhode Island “Viajar para ou da escola (portal para portal)” também inclui, mas não está limitado a (doravante “incluindo”), um ônibus escolar ou outro veículo relacionado à escola (incluindo o uso de passe de ônibus oficial), nas paradas oficiais dos ônibus escolares e caminhando de ou para a escola dentro de um prazo razoável antes ou depois do horário escolar.
                    O bullying ou assédio, incluindo cyberbullying ou assédio cibernético, que não é iniciado em um local definido acima, é coberto por esta política se o incidente resultar em uma interrupção potencialmente substancial do ambiente de aprendizagem escolar para um ou mais indivíduos e / ou o dia em ordem - operações diárias de qualquer escola ou programa escolar.
                </p>

                <p>
                Relatórios e Cada membro da comunidade PPSD é responsável por relatar o conhecimento das Investigações sobre qualquer comportamento coberto nesta Política ou informações credíveis
                    que tal ato ocorreu. Uma pessoa específica responsável por receber e acompanhar esses relatórios para um prédio da escola deve ser identificada pelo superintendente ou por seu representante no início de cada ano escolar, e essa pessoa deve coordenar e relatar oportunamente os resultados da investigação ao Título do Distrito 9. / Coordenador de patrimônio também designado pelo superintendente ou seu designado.
                    Se um relatório de cyberbullying e / ou assédio cibernético referente a um incidente iniciado fora do Escopo (como definido acima), esse relatório será investigado pelo Superintendente para determinar se o (s) incidente (s) resultou em uma interrupção potencialmente substancial do aprendizado escolar ambiente para um ou mais indivíduos e / ou as operações diárias ordenadas de qualquer escola ou programa escolar.

                </p>
               
<p>
                Procedimentos Distritais O Superintendente definirá “Diretrizes e Procedimentos para
                    Implemente a política de bullying e assédio e a política de violência no namoro. ”
                    O Superintendente deve fornecer diretrizes apropriadas à idade de cada escola para relatar e investigar incidentes de bullying ou assédio. Pessoas específicas responsáveis ​​pelo recebimento e acompanhamento dos relatórios serão identificadas nesses procedimentos. Tais diretrizes incluirão um formulário de relatório padronizado para ser usado por qualquer membro da comunidade PPSD. O objetivo desse formulário de denúncia é desencadear uma investigação que proteja a segurança do alvo, espectadores e / ou familiares / responsáveis ​​/ membros da comunidade.
                    Essas diretrizes devem incluir diretrizes claras sobre quando e como os relatórios sobre bullying ou assédio devem ser feitos à polícia para investigação de possíveis acusações criminais.
                    Dentro dos requisitos da FERPA, as Diretrizes e Procedimentos para Implementar a Política de Bullying e Assédio e a Política de Violência no Namoro devem incluir um período específico de tempo dentro do qual os pais serão informados de uma reclamação e um período específico de tempo para as investigações serem concluídas.
                    Além disso, as Diretrizes e Procedimentos para Implementar a Política de Bullying e Assédio e a Política de Violência no Namoro também devem incluir um plano de comunicação com os pais / responsáveis, desenvolvimento profissional
                    Escolas Públicas de Providence Providence, Rhode Island para todos os funcionários e instruções para estudantes de todos os níveis escolares em aprendizado socioemocional e prevenção da violência.
                </p>
                    

                <p>
                    Conseqüências: Conseqüências e ação corretiva apropriada para os alunos que cometem
                    os atos de bullying ou assédio podem variar de intervenções comportamentais positivas, incluindo suspensão ou exclusão, conforme descrito no "Código de Conduta para todo o Distrito, Notas PK-12".
                    A retaliação ou ameaças de retaliação, sob qualquer forma, destinadas a intimidar a vítima de bullying ou assédio, aqueles que são testemunhas ou que investigam um incidente de bullying ou assédio estarão sujeitos ao Nível Dois ou Três do “Código de Conduta para todo o Distrito, grau PK-12.
                    Atos de bullying ou assédio alegadamente cometidos por membros adultos (incluindo professores, administradores, funcionários, outros funcionários da escola, pais, parceiros da comunidade ou outros visitantes da escola) da comunidade escolar serão relatados aos administradores da escola e / ou ao designado escritório do PPSD para investigação e consequências, de acordo com os procedimentos aplicáveis, incluindo as ações legais apropriadas.
                    Retaliação ou ameaças de retaliação por membros adultos (incluindo professores, administradores, funcionários, outros funcionários da escola, pais, parceiros da comunidade ou outros visitantes da escola) da comunidade PPSD de qualquer forma projetada para intimidar a vítima, testemunhas, ou aqueles que investigam bullying ou assédio estarão sujeitos a consequências adicionais, de acordo com os procedimentos apropriados.

                    </p>
                    
                    <p>
                    Prestação de Contas Anualmente, o Superintendente também se reportará à Escola
                    Conselho antes do início de cada ano escolar, sobre o número de reclamações, investigações, atos verificados e tendências de bullying, assédio, cyberbullying e cyber-assédio.
                    </p>

                    <p>
                Apoio ao alvo Como o assédio moral e o assédio colocam em risco a saúde mental do alvo, será feita uma referência apropriada aos serviços de suporte.
                    A escola deve manter suporte e comunicação contínuos com o alvo para garantir que a retaliação pela denúncia de qualquer comportamento coberto nesta política seja tratada imediatamente. O alvo e o pai do alvo devem ter várias opções para garantir a segurança emocional e física dessa pessoa.
                </p>

                <p>
                Outros assuntos legais Qualquer membro da comunidade PPSD também pode buscar soluções legais ou outros meios de recurso, incluindo, entre outros, o registro de uma reclamação
                    com: Departamento de Educação de Rhode Island, (401) 222-4600; o Gabinete do Procurador Geral de Rhode Island, Divisão de Direitos Civis, (401) 274-4400; o Escritório de Direitos Civis do Departamento de Educação dos Estados Unidos, no (617) 289-0111, e / ou Comissão de Igualdade de Oportunidades de Emprego, no (800) 669-4000; entrar com uma ação civil; ou perseguir um processo criminal.
                </p>

                   
<p>
                    Referências legais R.I.G.L. seção 16-21-24 (Segurança escolar)
                    R.I.G.L. seção 16-21-26 (Bullying / Assédio)
                    R.I.G.L. seção 6-38-1.1 (Discriminação sexual) R.I. Gen. Laws seção 42-112-1 e segs. (Lei de Direitos Civis de Rhode Island, de 1990) RI 28-5-1 e segs. (Práticas de emprego no trabalho; Emprego justo no estado
                    Práticas) RI 42-28-1 e segs. (Crimes de ódio) (raciais, religiosos, étnicos, sexuais
                    orientação, preconceito de gênero ou deficiência R.I.G.L. seção 16-38-1 e segs. e 16-38-1.1 e segs. (Em relação à idade,
                    discriminação racial e sexual na educação) R.I.G.L. seções 42-87-1 e segs .; (Os direitos civis das pessoas com
                    Lei das Deficiências) R.I.G.L. seção 42-80.1-1 e segs. (A Restauração da Liberdade Religiosa
                    Lei) R .I. G. L. seção 11-52-4.2, § 11-52-4.3 (estatutos criminais relativos a
                    crimes cibernéticos) R.I.G.L seção 11-21-1 (RI Hazing Law) Lei de Direitos Civis dos EUA de 1964, Título VI (Discriminação na Educação baseada em
                    Lei de Direitos Civis dos EUA, de raça, cor ou origem nacional), de 1964, título VII (discriminação baseada no emprego)
                    Raça, Cor, Religião, Sexo, Origem Nacional) Título IX das Emendas Educacionais de 1972 (Equidade de Gênero, incluindo
                    Assédio Sexual) Seção 504 da Lei de Reabilitação de 1973 (Deficiência) Lei dos Americanos com Deficiência de 1990
                    </p>
                    
                   
<p>
                    Histórico aprovado _______
                    Escolas Públicas de Providence Providence, Rhode Island

                    </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bully;