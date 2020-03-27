import React, { useState, useEffect } from 'react';      // importa React, useState pra gravar Estados e useEffect que dispara uma função em um determinado momento
import { Link, useHistory } from 'react-router-dom';    // importa Link pra poder referenciar links mais rápido e o useHistory para redirecionar o usuário
import { FiPower, FiTrash2 } from 'react-icons/fi';       // importa ícone FiPower e FiTrash2

import api from '../../services/api.js';    // importa a api pra chegar nas rotas
import logoImg from '../../assets/logo.svg';    // importa a logo
import './style.css';   // importa o css

function Profile() {        // função Profie
    const [incidents, setIncidents] = useState([]);     // useState é um input de text que retorna um array com dois itens: o valor da variável e a função para atualizar ela, como passamos input [] a variável inicial não possui valor pois é um array vazio

    const ongName = localStorage.getItem('ongName');    // pega o nome da ong armazenado no localStorage
    const ongId = localStorage.getItem('ongId');    // pega o id da ong armazenado no localStorage

    const history = useHistory();   // define history como a função useHistory

    useEffect(() => {   
        api.get('profile', {    /* função api vai dar um get na rota profile */
            headers: {          /* no cabeçalho */
                Authorization: ongId   /* seta o Authorization com o id da ong da sessão */
            }
        }).then(response => {       /* então seta os incidentes do profile para os que a própria ong publicou */
            setIncidents(response.data);
        })
    }, [ongId]);    // useEffect recebe dois parâmetros: qual função deve ser executada {} e quando deve ser executada [], quando o elemento do array mudar ele executa a função
        // se o id da ong mudar a função é reexecutada, entretanto isso não acontece sem passar pelo login então tanto faz

    async function handleDeleteIncident(id) {   // função para deletar casos
        try {   // tente
            await api.delete(`incidents/${id}`, {   // esperar a api buscar a rota incidents/id e daí usar o método delete
                headers: {      // no cabeçalho
                    Authorization: ongId    // passa o parâmetro ongId
                }
            });
            
            setIncidents(incidents.filter(incident => incident.id !== id));  // Atualiza a lista de casos, filtrando o caso em que o id dele era igual ao do caso apagado
        } catch (err) { // se der erro
            alert('Erro ao deletar caso, tente novamente', err) // mensagem de erro
        }
    }

    function handleLogout() {   // função de logout
        localStorage.clear();   // limpa o armazenamento local do id e nome da ong

        history.push('/');  // Direciona o usuário para a raíz/página inicial/logon
    }

    return (
        <div className = "profile-container">  {/* div com classe definida */}
            <header>    {/* cabeçalho */}
                <img src = {logoImg} alt = "Be The Hero"/>  {/* imagem da logo com texto alternativo */}
                <span>Bem vinda, {ongName}</span>    {/* mensagem de boas vindas para a ong*/}

                <Link className = "button" to = "/incidents/new">Cadastrar novo caso</Link> {/* texto com link de referência com classe definida para cadastrar novos casos */}

                <button onClick = {handleLogout} type = "button">    {/* botão com tipo definido que ao ser clicado chama a função de logout */}
                    <FiPower size = {18} color = "#E02041"/>    {/* ícone importado */}
                </button>
            </header>

            <h1>Casos cadastrados</h1>  {/* título */}

            <ul>    {/* Unordened list */}
                {incidents.map(incident => (        // mapear os casos e cada caso vai sendo listado como um item
                    <li key = {incident.id}>    {/* list item com id sendo a chave, assim quando precisar apagar é só apagar pelo id*/}
                    <strong>CASO:</strong> {/* propriedade título */}
                    <p>{incident.title}</p> {/* título do caso */}

                    <strong>DESCRIÇÃO:</strong> {/* propriedade título */}
                    <p>{incident.description}</p> {/* descrição do caso */}

                    <strong>VALOR:</strong> {/* propriedade título */}
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>  {/* valor do caso formatado pelo Intl.NumberFormat pro Brasil, no tipo moeda (currency), sendo a moeda BRL (Real) */}

                    <button onClick = {() => handleDeleteIncident(incident.id)} type = "button">    {/* Botão tipo button que quando clicado executa uma arrow function que chama a função de deletar casos com o id do caso, se não tivesse "() =>", todos os casos iam ser deletados quando fossem mostrados, porque a cada novo item registrado pelo map a função de deletar caso estaria sendo chamada e armazenando a resposta da função no onClick */}
                        <FiTrash2 size = {20} color = "#a8a8b3" />      {/* Usa o ícone importado */}
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Profile;    // exporta a função Profile()