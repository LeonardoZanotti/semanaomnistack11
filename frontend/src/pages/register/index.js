import React, { useState } from 'react';  // importa React e o useState que é parada de Estado
import { Link, useHistory } from 'react-router-dom';    // importa Link que tá sendo usado pra chamar as rotas e o useHistory que é usado pra devolver o usuário pro logon
import { FiArrowLeft } from 'react-icons/fi';       // importa o ícone que tamo usando

import './style.css';       // importa o css
import logoImg from '../../assets/logo.svg';        // importa a logo
import api from '../../services/api.js';        // importa a api http

function Register() {       // função Register
    const [name, setName] = useState('')    // useState é um input de text que retorna um array com dois itens: o valor da variável e a função para atualizar ela, como passamos input '' a variável inicial não possui valor
    const [email, setEmail] = useState('')    // useState é um input de text que retorna um array com dois itens: o valor da variável e a função para atualizar ela, como passamos input '' a variável inicial não possui valor
    const [whatsapp, setWhatsapp] = useState('')    // useState é um input de text que retorna um array com dois itens: o valor da variável e a função para atualizar ela, como passamos input '' a variável inicial não possui valor
    const [city, setCity] = useState('')    // useState é um input de text que retorna um array com dois itens: o valor da variável e a função para atualizar ela, como passamos input '' a variável inicial não possui valor
    const [uf, setUf] = useState('')    // useState é um input de text que retorna um array com dois itens: o valor da variável e a função para atualizar ela, como passamos input '' a variável inicial não possui valor
    
    const history = useHistory();   // define history como a função useHistory

    async function handleRegister(e) {     // função responsável pelo cadastro do usuário que recebe um evento e
        e.preventDefault();     // impede a página de recarregar quando der o submit

        const data = {      /* Define o array data que vai armazenar as cinco variáveis do cadastro de ongs */
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {       // tente
            const response = await api.post('ongs', data);  // envia os dados do cadastro que tão no array data em um json lá pra rota /ongs (na função api já setamos a URL base) pra dar um post e criar a ong
            // dentro de response vai ter todo o array data, que retornou o id da ong
            alert(`Cadastro realizado! Seu id de acesso é: ${response.data.id}`);   // emite um alerta para o usuário saber que deu certo e o id de acesso dele
            
            history.push('/');  // devolve o usuário para a raíz/página inicial/logon
        } catch (err) {     // se der ruim
            alert('Erro no cadastro, tente novamente.', err)    // mensagem de erro
        }
    };

    return (
        <div className = "register-container">  {/* div com className*/}
            <div className = "content">     {/* div com className*/}
                <section>       
                    <img src = {logoImg} alt = "Be The Hero"/>      {/* logo do projeto com texto alternativo Be The Hero */}

                    <h1>Cadastro</h1>       {/* Título Cadastro */}
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>                 {/* Parágrafo*/}

                    <Link className = "back-link" to = "/">        {/* Link to deve ser tipo um 'a href' só que melhor. Link de referência para '/' = página inicial de logon */}
                        <FiArrowLeft size = {16} color = "#e02041"/>          {/* ícone de voltar importado */}
                        Voltar para logon  {/* Texto clicável que referencia o link para logon, página inicial */}
                    </Link>     {/* Link faz as routas só carregarem um json e não todo o html denovo */}
                </section>

                <form onSubmit = {handleRegister}>  {/* Formulário de cadastro que quando der o submit chama a função handleRegister */}
                    
                    <input 
                        placeholder = "Nome da ONG"
                        value = {name}          /* Valor que se pega aqui é o name, por enquanto value é o '' do useState */
                        onChange = {e => setName(e.target.value)}   /* quando value mudar, chama o evento e numa arrow function que usa a função setName, que por sua vez seta name como value que é o nome da ONG */
                    />    {/* Input do nome da ong com o texto no fundo */}
                    
                    <input 
                        type = "email"
                        placeholder = "E-mail"
                        value = {email}          /* Valor que se pega aqui é o email, por enquanto value é o '' do useState */
                        onChange = {e => setEmail(e.target.value)}   /* quando value mudar, chama o evento e numa arrow function que usa a função setEmail, que por sua vez seta email como value que é o email da ONG */
                    />   {/* input de email com tipo email e o texto de fundo */}
                    
                    <input 
                        placeholder = "Whastapp"
                        value = {whatsapp}          /* Valor que se pega aqui é o whatsapp, por enquanto value é o '' do useState */
                        onChange = {e => setWhatsapp(e.target.value)}   /* quando value mudar, chama o evento e numa arrow function que usa a função setWhatsapp, que por sua vez seta whatsapp como value que é o zap da ONG */
                    
                    />    {/* Input pra zap com texto Whatsapp de fundo*/}
                    
                    <div className = "input-group">     {/* Divisóriazinha pra cidade e uf ficarem na mesma linha */}
                        <input 
                            placeholder = "Cidade"
                            value = {city}          /* Valor que se pega aqui é a city, por enquanto value é o '' do useState */
                            onChange = {e => setCity(e.target.value)}   /* quando value mudar, chama o evento e numa arrow function que usa a função setCity, que por sua vez seta city como value que é a cidade da ONG */
                        />      {/* input de cidade com texto no fundo Cidade */}
                        
                        <input 
                            placeholder = "UF"
                            style = {{ width: 80 }}
                            value = {uf}          /* Valor que se pega aqui é a uf, por enquanto value é o '' do useState */
                            onChange = {e => setUf(e.target.value)}   /* quando value mudar, chama o evento e numa arrow function que usa a função setUf, que por sua vez seta uf como value que é a unidade federativa da ONG */
                        />  {/* Input da UF com texto padrão. Style abre espaço pra css. Tem duas chaves pra definir a largura, a primeira é pra definir que é um espaço de JavaScript e a segunda é pra dizer que é um objeto JavaScript */}
                    </div>

                    <button className = "button" type = "submit">Cadastrar</button>     {/* Botão para se cadastrar com classe, tipo e texto no meio */}
                </form>
            </div>
        </div>
    );
}

export default Register;    /* exporta a função Register() */