import React, { useState } from 'react';      // Importa framework React
import { FiLogIn } from 'react-icons/fi';   // react-icons é framework pra pegar ícones. Tamo pegando o icone LogIn do site fi, que se refere a feathericons, mas dá pra usar outros sites para pegar ícones: https://feathericons.com; https://material.io/resources/icons/?style=baseline; https://fontawesome.com;
import { Link, useHistory } from 'react-router-dom';        // importa link para termos a propriedade de SPA que o react possui de não ter que gerar todo o html denovo ao trocar de rota, apenas gerar um json com os dados do request e o useHistory pra poder devolver o usuário pra outra página

import api from '../../services/api.js';

import './styles.css';          // importa o css styles

import logoImg from '../../assets/logo.svg';        // importa a logo
import heroesImg from '../../assets/heroes.png';    // importa imagem do logon

function Logon() {      // função logon
    const [id, setId] = useState('');   // useState é um input de text que retorna um array com dois itens: o valor da variável e a função para atualizar ela, como passamos input '' a variável inicial não possui valor
    const history = useHistory();   // seta history como a função useHistory

    async function handleLogin(e) {    // função responsável pelo login do usuário que recebe um evento e
        e.preventDefault()    // previne que a página recarregue depois do login

        try {   // tente
            const response = await api.post('sessions', { id }) // conectar a rota /sessions enviando o id da ong e postando ele
            // o servidor responde com o nome da ong que é armazenado no response
            //console.log(response.data.name)     // mostra o nome da ong da responsta

            localStorage.setItem('ongId', id);  // armazena a ongId no id
            localStorage.setItem('ongName', response.data.name);    // armazena a ongName no response.data.name
            
            history.push('/profile');   // feito login, o usuário é direcionado para os casos
        } catch (err) {     // se der erro
            alert('Falha no login, tente novamente.', err)     // mensagem de erro
        };
    };

    return (
        <div className = "logon-container">     {/* divisão com ClassName definida */}
            <section className = "form">            {/* Sessão com ClassName definida */}
                <img src = {logoImg} alt = "Be The Hero"/>          {/* Imagem da logo com texto alternativo "Be The Hero" */}

                <form onSubmit = {handleLogin}>          {/* Formulário de logon que ao dar submit executa a função handleLogin */}
                    <h1>Faça seu logon</h1>
                    
                    <input
                        placeholder = "Sua ID"
                        value = {id}            /* Valor que se pega aqui é o id, por enquanto value é o '' do useState */
                        onChange = {e => setId(e.target.value)}     /* quando value mudar, chama o evento e numa arrow function que usa a função setId, que por sua vez seta id como value que é o id da ONG */
                    />         {/* Input para as ongs colocarem a ID pra logon onde quando tá vazio aparece "Sua ID" */}
                    
                    <button className = "button" type = "submit">Entrar</button>     {/* Botão para entrar com tipo definido */}

                    <Link className = "back-link" to = "/register">        {/* Link to deve ser tipo um 'a href' só que melhor. Link de referência para /register */}
                        <FiLogIn size = {16} color = "#e02041"/>          {/* ícone de login importado */}
                        Não tenho cadastro  {/* Texto clicável que referencia o link para registro*/}
                    </Link>     {/* Link faz as routas só carregarem um json e não todo o html denovo */}
                </form>
            </section>

            <img src = {heroesImg} alt = "Heroes"/>     {/* Imagem da tela de logon com texto alternativo "Heroes" */}
        </div>
    );
}

export default Logon    // exporta função Logon