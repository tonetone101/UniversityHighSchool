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
                <h3> Perguntas freqüentes do aluno: política para estudantes transgêneros e com amplo gênero </h3>
                    <div>
                        <p>
                            O que significa o termo "Transgênero"?
                            "Transgênero" é um adjetivo que descreve uma pessoa cuja identidade ou expressão de gênero difere do gênero listado na pessoa dessa pessoa.
                            certidão de nascimento original. “Identidade de gênero” é exatamente o que parece - que termos de gênero (masculino, feminino, uma combinação de sexos ou nenhum gênero) que uma pessoa usa para se identificar. "Expressão de gênero" é como essa pessoa expressa seu próprio gênero para outras pessoas,
                            seja através de roupas, comportamento ou outras atividades.
                        </p>

                        <p>
                            Por que existe uma política específica para estudantes transgêneros e de gênero amplo?
                            As Escolas Públicas de Providence estão comprometidas em criar um ambiente seguro e inclusivo para todos os alunos. Esta política descreve maneiras pelas quais a escola pode criar
                            um ambiente no qual os alunos transgêneros e com gênero amplo se sentem confortáveis ​​e apoiados.
                        </p>

                        <p>
                            Qual é a abordagem do distrito para os estudantes trans que usam banheiros e vestiários da escola?
                            As Escolas Públicas de Providence permitem que os estudantes transexuais escolham seu banheiro ou vestiários, com base no sexo
                            com os quais eles se identificam ou se expressam. Alunos que não se identificam com o sexo atribuído a eles no nascimento e que se sentem desconfortáveis ​​ao escolher um grupo segregado por homens ou por mulheres
                            banheiros podem solicitar o uso de banheiros privativos. Da mesma forma, eles podem solicitar acomodações de vestiários, como particionamento ou um horário de troca separado.
                        </p>

                        <p>
                            Em quais equipes esportivas os alunos transgêneros jogam?
                            Os estudantes transgêneros podem escolher em quais equipes de educação física e intramural desejam ingressar, com base em sua identidade e expressão de gênero. Alunos envolvidos em esportes interescolásticos
                            siga as regras da Rhode Island Interscholastic League: http://www.riil.org/index.php/resources/rules-and-regulations/.
                        </p>

                        <p>
                            Como posso dar suporte a alunos transgêneros e de gênero amplo?

                            Honre suas escolhas, incluindo a identidade e a expressão de gênero que escolherem.
                            Siga a liderança deles. Consulte alunos transgêneros e de gênero amplo com os mesmos nomes e pronomes que eles escolherem para se identificar.
                            Aponte-os para apoiar. Se você conhece um aluno que está passando ou está considerando uma transição de gênero, verifique se eles sabem que adultos treinados e atenciosos, conhecidos como Equipe de Transgêneros e Pontos de Estudante com Expansão de Gênero, existem para eles em sua própria escola.
                        </p>


                        <p>
                            Se você é um estudante transgênero ou de gênero, matriculado nas Escolas Públicas de Providence,
                            <h3> Você decide: </h3>
                            Com quem você deseja compartilhar sua identidade e status de gênero.
                            Qual nome você deve ser chamado e qual pronome usar para si mesmo. O nome que você escolher para se chamar não precisa corresponder ao que está na sua certidão de nascimento.
                            Qual banheiro ou vestiário você deseja usar. Você também pode solicitar uma alternativa confortável, como uma partição ou agendamento de alteração separado ou acesso a um banheiro privado.
                            Em quais equipes de educação física e intramurais você deseja ingressar, independentemente do sexo. Se você estiver envolvido em esportes interescolásticos, siga as regras da Liga Interescolástica da R.I: http://www.riil.org/index.php/resources/rules-and-regulations/.
                        </p>
                        <p>
                            Você pode perguntar:
                            Para obter suporte da equipe de alunos transgêneros e de expansivos em gênero das escolas, sempre que precisar Se você está passando ou planeja passar por uma transição de gênero, os membros da equipe podem criar suportes personalizados para você e, se apropriado, para sua família.
                        </p>

                       
<p>
                            Sempre relate:

                            Incidentes de bullying, assédio e discriminação, sejam direcionados a você ou a outro aluno.
                            Estes serão levados a sério e tratados de maneira consistente com as políticas da diretoria e a lei.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default GenderPolicy;