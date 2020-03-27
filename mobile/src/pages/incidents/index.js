import React, { useState, useEffect } from 'react';      // importa o React, o useState pra declarar estado e o useEffect que é uma função que dispara outra função quando algo é carregado em tela
import { Feather } from '@expo/vector-icons';   // importando os pacotes daquele site de ícones FeatherIcons
import { useNavigation } from '@react-navigation/native'        // importa função pra usar a navegação
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';        // importa View, Image e Text que são as parada pra compor a visualização do usuário além do TouchableOpacity que é parada pra tornar as coisas clicáveis e que quando clica ele diminui a opacidada padrão que é tipo as parada que foi feita no css dos frontend mt pogchamp e do FlatList que é pra fazer uma lista que dá pra dar scroll

import api from '../services/api.js';    // importa a api pra poder fazer a conexão com backend

import logoImg from '../../assets/logo.png' // importa a logo no melhor formato já dependendo do tamanho da tela do celular

import styles from './style.js';      // importa os estilos

export default function Incidents() {      // função dos casos definida e exportada
    const [incidents, setIncidents] = useState([]);     // declara variável incidents como um array vazio (estado inicial) e a função setIncidents que é a função de atualização da variável
    const [total, setTotal] = useState(0);   // declara a variável total como sendo inicialmente 0 e sua função de atualização setTotal que modificará seu estado
    const [page, setPage]   = useState(1);  // declara a variável page como sendo inicialmente 1 e sua função de atualização setPage que modificará seu estado
    const [loading, setLoading] = useState(false);   // declara a variável loading como sendo inicialmente false e sua função de atualização setLoading que modificará seu estado
    
    const navigation = useNavigation();     // parecido com o useHistory para fazer o direcionamento do usuário

    function navigateToDetail(incident) {       // função para navegar para detalhes com o parâmetro incident
        navigation.navigate('Detail', { incident });       // tipo o history.push redirecionando para a rota Detail enviando o parâmetro incident que possui todas as informações do caso selecionado
    };

    async function loadIncidents() {        // função para carregar os casos no mobile
        if (loading) {      // se loading for true, ou seja, já tiver executando o carregamento de mais casos
            return;      // voltar, se não tivesse isso o loading ia ficar executando várias vezes quando o usuário ficasse puxando a tela
        };

        if (total > 0 && incidents.length == total) {   // se o total não for zero e a quantidade de casos já carregados for igual ao total
            return; // volte, pois não há mais nada para se ver
        };

        setLoading(true);   // loading = true

        const response = await api.get('incidents', {
            params: { page }
        });    // espera a api se conectar ao backend na rota dos casos e envia o parâmetro page pra rota saber que número de página estamos

        setIncidents([...incidents, ...response.data]);        // função para atualizar a variável incidents define a variável como os dados dos casos (isso só adiciona os casos ao array, não sobrepõe uns aos outros), desse modo os casos da página 1 ficam e os das páginas seguintes são adicionados
        setTotal(response.headers['x-total-count']);        // chama a função de atualização de total e define ela como sendo o parâmetro 'X-Total-Count' localizado no cabeçalho da resposta
        setLoading(false);  // loading = false
        setPage(page + 1);     // variável page recebe +1
    };

    useEffect(() => {
        loadIncidents()
    }, []);     // useEffect é uma função que executa a função dentro das chaves (loadIncidents) quando as variáveis que estão dentro do array mudarem de valor, como é um array vazio, não vai mudar então vai chamar a função só uma vez no momento de definição da condição pra chamar a função

    return (    // o que o usuário vai ver 
        <View style = {styles.container}>  
            <View style = {styles.header}>
                <Image source = {logoImg}/>
                <Text style = {styles.headerText}>
                    Total de <Text style = {styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style = {styles.title}>Bem-vindo!</Text>
            <Text style = {styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style = {styles.incidentList}
                keyExtractor = {incident => String(incident.id)}
                // showsVerticalScrollIndicator = {false} deixando true pra rapaziada perceber que carregou mais
                onEndReached = {loadIncidents}  // Quando chegar no fim da lista execute a função de carregar mais casos
                onEndReachedThreshold = {0.4}   // Quando estiver a 40% do fim da lista na real vc deve carregar mais casos
                data = {incidents}  
                renderItem = {({ item: incident }) => (
                    <View style = {styles.incident}>
                        <Text style = {styles.incidentProperty}>ONG:</Text>
                        <Text style = {styles.incidentValue}>{incident.name}</Text>
                        
                        <Text style = {styles.incidentProperty}>CASO:</Text>
                        <Text style = {styles.incidentValue}>{incident.title}</Text>

                        <Text style = {styles.incidentProperty}>VALOR:</Text>
                        <Text style = {styles.incidentValue}>
                            {Intl.NumberFormat(
                                'pt-BR', 
                                { style: 'currency',
                                currency: 'BRL'
                                }).format(incident.value)}
                        </Text> 

                        <TouchableOpacity
                            style = {styles.detailsButton}
                            onPress = {() => navigateToDetail(incident)}
                        >
                            <Text style = {styles.detailButtonText}>Ver mais detalhes</Text>
                            <Feather name = "arrow-right" size = {20} color = "#e02041"/>
                        </TouchableOpacity>
                     </View>
                )}
            />
        </View>
    );
};

// style indica onde está definida a estilização do campo
// styles.algumacoisa se refere à estilização da 'classe' algumacoisa no arquivo styles.js
// Primeira view com style definido pra container
// Segunda view pra definir uma imagem e um text dos casos totais
// Image da logo
// Text com o total de casos e outro Text definido com um style diferente pra fazer o negrito em no número de casos que tá chamando a variável total pra indicar esse valor
// Título e descrição
// FlatList para fazer lista de casos mais geral scrollable. Data define um array que diz quandos itens tem a sua lista (nesse caso é o array incidents, que possui os dados de todos os casos cadastrados e cada caso vai ser um item na lista), renderItem é a função responsável por carregar esses itens
// renderItem está como uma arrow function ({ item: incident }) => (), diferente das que usamos até agora () = {}, isto se deve pois até agora usávamos as arrows functions para executar outras funções que estavam numa variável (sendo chamadas através de {})
// nesse caso estamos chamando uma lista de items JSX (JavaScript XML), por isso usa-se () para cada item. Desse modo para cada item (para cada caso, que está na variável incident) vamos retornar o JSX dele com seus dados
// keyExtractor é tipo a key que foi usada na ul do profile no frontend pra identificar cada item da lista com algo que seja único, aqui para cada caso do array incidents ele tá pegando o id do caso como key
// showVerticalScrollIndicator false remove a barra de rolagem (apenas oculta ela, ainda é possível scrollar)
// View para cada caso individual
// 3 incidentProperty e 3 incidentValue pra definir os 3 campos padrão de cada caso e as 3 variantes dos campos dos casos, sendo que os value estão chamando os dados da variável incident que são os dados fornecidos pela ONG sobre o caso. No incidentValue para o valor do caso foi usada a mesma função do frontend para transformar o valor em moeda brasileira, ou seja, em reais: Usa a função Intl.NumberFormat pra formatar o número, define que é pra pt-BR para o estilo de moeda (currency) sendo a moeda o BRL que é o mesmo que real,  passado os parâmetros, formata-se o incident.value com essas características
// TouchableOpacity abre espaço para Text clicável que diminui a opacidada ao ser clicado e executa a função de navegar para detalhes, redirecionando o usuário. Se usa uma arrow function aqui para que a função de navegar para detalhes só seja executada ao clicar no botão, caso contrário o simples fato de função estar acompanhada do () faz ela ser executada assim que o botão é carregado (isso faria com que assim que os casos fossem exibidos ia travar td pq ia pros detalhes de todos os casos e BUUUMM)
// Feather abre o pacote de ícones e pega o "arrow-right" naquele tamanho e cor ali, esse ícone tá dentro da parte clicável junto com o texto
