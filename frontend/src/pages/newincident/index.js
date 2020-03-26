import React, { useState } from 'react';      // importa o React e o useState para definir Estados
import { Link, useHistory } from 'react-router-dom';    // importa o Link que é tipo um a href só que melhor e o useHistory para poder redirecionar o usuário
import { FiArrowLeft } from 'react-icons/fi';    // importa o ícone de voltar

import api from '../../services/api.js';    // importa a api pra pegar as rotas
import './style.css';   // importa o css

import logoImg from '../../assets/logo.svg';    /* importa a logo */

function NewIncident () {   /* função de novo incidente */
    const [title, setTitle] = useState('');            // useState é um input de text que retorna um array com dois itens: o valor da variável e a função para atualizar ela, como passamos input '' a variável inicial não possui valor
    const [description, setDescription] = useState('');            // useState é um input de text que retorna um array com dois itens: o valor da variável e a função para atualizar ela, como passamos input '' a variável inicial não possui valor
    const [value, setValue] = useState('');            // useState é um input de text que retorna um array com dois itens: o valor da variável e a função para atualizar ela, como passamos input '' a variável inicial não possui valor

    const ongId = localStorage.getItem('ongId');        // pega o ongId do localStorage

    const history = useHistory();       // define history como a função useHistory

    async function handleNewIncident(e) {     // função para cadastrar novos incidentes
        e.preventDefault();     // evento para prevenir o comportamento padrão de recarregar a página após o submit
        
        const data = {  // define data como um json com os dados do caso a ser cadastrado
            title,
            description,
            value
        };

        try {   // tente
            await api.post('incidents', data, { // espera a api acessar a rota incidents e postar os dados que tão na variável data como um json
                headers: {      // passando terceiro parâmetro no cabeçalho:
                    Authorization: ongId    // seta Authorization com a ongId da sessão
                }
            });

            history.push('/profile');   // ao final do cadastro direciona o usuário para a listagem de casos
        } catch (err) {   // se der erro
            alert('Erro ao cadastrar novo caso, tente novamente.', err) // mensagem de erro
        };
    };

    return (
        <div className = "new-incident-container">  {/* div com className*/}
            <div className = "content">     {/* div com className*/}
                <section>       
                    <img src = {logoImg} alt = "Be The Hero"/>      {/* logo do projeto com texto alternativo Be The Hero */}

                    <h1>Cadastrar novo caso</h1>       {/* Título Cadastro */}
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>                 {/* Parágrafo*/}

                    <Link className = "back-link" to = "/profile">        {/* Link to deve ser tipo um 'a href' só que melhor. Link de referência para '/profile' = página inicial de casos */}
                        <FiArrowLeft size = {16} color = "#e02041"/>          {/* ícone de voltar importado */}
                        Voltar para os casos  {/* Texto clicável que referencia o link para os casos */}
                    </Link>     {/* Link faz as routas só carregarem um json e não todo o html denovo */}
                </section>

                <form>  {/* Formulário de cadastro */}
                    <input
                        placeholder = "Título do caso"
                        value = {title}     /* Valor que se pega aqui é o title, por enquanto value é o '' do useState */
                        onChange = {e => setTitle(e.target.value)}      /* quando value mudar, chama o evento e numa arrow function que usa a função setTitle, que por sua vez seta title como value que é o título do caso */
                    />   {/* Input do título do caso com texto no fundo "Título do caso" */}
                    
                    <textarea
                        placeholder = "Descrição"
                        value = {description}       /* Valor que se pega aqui é o description, por enquanto value é o '' do useState */
                        onChange = {e => setDescription(e.target.value)}    /* quando value mudar, chama o evento e numa arrow function que usa a função setDescription, que por sua vez seta description como value que é a descrição do caso */
                    />   {/* Área de texto para descrever o caso com texto no fundo "Descrição */}
                    
                    <input
                        placeholder = "Valor em reais"
                        value = {value}         /* Valor que se pega aqui é o value, por enquanto value é o '' do useState */
                        onChange = {e => setValue(e.target.value)}             /* quando value mudar, chama o evento e numa arrow function que usa a função setValue, que por sua vez seta value como value que é o valor do caso */
                    />   {/* input do valor com texto no fundo "Valor em reais" */}

                    <button onClick = {handleNewIncident} className = "button" type = "submit">Cadastrar</button>     {/* Botão para se cadastrar com classe, tipo e texto no meio que ao ser clicado executa a função de cadastrar novo caso */}
                </form>
            </div>
        </div>
    );
}
export default NewIncident;    /* exporta a função NewIncident() */