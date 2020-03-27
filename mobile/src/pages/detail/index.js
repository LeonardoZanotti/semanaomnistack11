import React from 'react';      // importa o React
import { Feather } from '@expo/vector-icons';   // importa o pacote de ícones do site FeatherIcons
import { useNavigation, useRoute } from '@react-navigation/native';      // importa função de navegação e useRoute para poder pegar os parâmetros que uma função envia da página atual da aplicação
import { View, Text, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';    // importa View, Text, Image, Touchable que faz as coisas ficarem clicáveis diminuindo a opacidade delas no clck do react native e Linking que é parada pra pegar deep link de aplicativo mobile e por meio dele dá pra enviar mensagem pelo whatsapp, importa ScrollView também pra fazer o scroll nos detalhes
import * as MailComposer from 'expo-mail-composer';     // importa toda a framework de escrever email que a expo tem dentro da variável MailComposer

import logoImg from '../../assets/logo.png' // importa a logo no melhor formato já dependendo do tamanho da tela do celular

import styles from './style.js';    // importa os estilos

export default function Detail() {     // função de detalhes definida e exportada
    const navigation = useNavigation();     // mesma coisa que um useHistory no frontend, é uma função pra fazer redirecionamento de páginas
    const route = useRoute();       // define route como a função useRoute para poder pegar os parâmetros enviados por uma função

    const incident = route.params.incident;     // route.params são todos os parâmetros que estão sendo recebidos quando a função Detail() é lida, e incident define que o parâmetro que se quer é o incident, sendo este armazenado novamente numa variável incident

    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`  // mensagem que será enviado por email ou whatsapp usando o nome da ong o título do caso e o valor formatado para reais: Usa a função Intl.NumberFormat pra formatar o número, define que é pra pt-BR para o estilo de moeda (currency) sendo a moeda o BRL que é o mesmo que real,  passado os parâmetros, formata-se o incident.value com essas características
    
    function navigateBack() {       // função voltar
        navigation.goBack();        // goBack é uma função de dentro do próprio navigation que traça as rotas para a rota anterior (ou seja, a página inicial com todos os casos)
    };

    function sendMail() {       // função para enviar email
        if (incident.email.length === 0) {      // se não tiver um email cadastrado
            alert('A ONG não possui contato via email');        // avisa que a ong n tem email
            return;     // voltar
        };

        MailComposer.composeAsync({     // chama todo o pacote importado no MailComposer e pega a função composeAsync para escrever um email
            subject: `Herói do caso: ${incident.title}`,  // título do email referenciando o título do caso
            recipients: [incident.email],      // array com o destinatário do email sendo o email da ong
            body: message       // corpo do email sendo a mensagem da variável message
        });
    };

    function sendWhatsapp() {       // função pra enviar um zap
        if (incident.whatsapp.length === 0) {       // se a ONG n tiver zap
            alert('A ONG não possui contato via whatsapp');     // avisa que n tem zap n
            return;     // voltar
        };

        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`); // função Linking consegue pegar a URL do aplicativo whatsapp, setando dois parâmetros: 'phone' que é o telefone da ong pra enviar a mensagem e 'text' que é a mensagem a ser enviada que é a própria variável message
    };

    return (    // o que o usuário vai ver
        <ScrollView>
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Image source = {logoImg}/>
                    
                    <TouchableOpacity onPress = {navigateBack}>
                        <Feather name = "arrow-left" size = {28} color = "#e02041"/>
                    </TouchableOpacity>
                </View>

                <View style = {styles.incident}>
                    <Text style = {[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                    <Text style = {styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
                    
                    <Text style = {styles.incidentProperty}>CASO:</Text>
                    <Text style = {styles.incidentValue}>{incident.title}</Text>

                    <Text style = {styles.incidentProperty}>DESCRIÇÃO:</Text>
                    <Text style = {styles.incidentValue}>{incident.description}</Text>

                    <Text style = {styles.incidentProperty}>VALOR:</Text>
                    <Text style = {styles.incidentValue}>
                        {Intl.NumberFormat(
                            'pt-BR', 
                            { style: 'currency',
                            currency: 'BRL'
                            }).format(incident.value)}
                    </Text> 
                </View>

                <View style = {styles.contactBox}>
                    <Text style = {styles.heroTitle}>Salve o dia!</Text>
                    <Text style = {styles.heroTitle}>Seja o herói desse caso.</Text>

                    <Text style = {styles.heroDescription}>Entre em contato:</Text>

                    <View style = {styles.actions}>
                        <TouchableOpacity style = {styles.action} onPress = {sendWhatsapp}>
                            <Text style = {styles.actionText}>WhatsApp</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style = {styles.action} onPress = {sendMail}>
                            <Text style = {styles.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

// ScrollView cria uma área scrollável, como tá em volta de tudo, tudo pode sofrer scroll
// View container
// View do cabeçalho
// Image para a logo
// Área clicável com o efeito de reduzir opacidade que aquela função lá e quando clicar faz a pessoa voltar pra página inicial com todos os casos
// Abre o pacote Feather que tem os ícones do site e pega o "arrow-left" naquele tamanho e cor
// View que mostra os dados do caso
// 4 incidentProperty e 4 incidentValue pra definir os 4 campos padrão de cada caso e as 4 variantes dos campos dos casos, sendo que os value estão chamando os dados da variável incident que são os dados fornecidos pela ONG sobre o caso. No incidentValue para o valor do caso foi usada a mesma função do frontend para transformar o valor em moeda brasileira, ou seja, em reais: Usa a função Intl.NumberFormat pra formatar o número, define que é pra pt-BR para o estilo de moeda (currency) sendo a moeda o BRL que é o mesmo que real,  passado os parâmetros, formata-se o incident.value com essas características
// O primeiro IncidentProperty possui um array no style, onde sua estilização é definida pelos dois itens, sendo que a estilização do objeto na segunda posição sobrepôs à estilização do StyleSheet. Isso aí foi feito pra poder tirar uma margem do topo desse primeiro título que tava feião, daí não afeta os outros 
// 3 Texts com os dados que a ONG informou no caso incidentValue
// View para a parte de contatos
// 2 Text title
// Descrição para entrar em contato
// View para as ações de contato
// Texto clicável para entrar em contato por zap e outro pro email que chamam as funções de enviar um email ou um whatsapp