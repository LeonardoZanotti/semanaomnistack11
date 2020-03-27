import React from 'react';      // importa o React
import 'intl';    // importa a parada pra fazer as moeda ser mostra com R$
import 'intl/locale-data/jsonp/pt-BR';  // importa a biblioteca de internacionalização de moedas para o Brasil

import Routes from './src/routes.js'; // importa a função de rotas

export default function App() {     // Função aplicativa sendo definida e exportada
  return (  // Função de rotas
    <Routes />
  );  
}


/*
import { StyleSheet, Text, View } from 'react-native';    // importa StyleSheet pra fazer o css, Text pra mandar um texto dale e View que deve ser o que a pessoa vê na tela mesmo

export default function App() {   // exporta  afunção App (que é a mesma coisa que tá feito no frontend só que escrito numa linha só)
  return (
    <View style = {styles.container}>    
      <Text style = {styles.title}>Para os cavalheiros um bom dia, para muié apenas dia</Text>
    </View>
  );
} // O que a pessoa vai ver sendo estilizado pela parte 'container' no styles e Texto estilizado pela parte 'title' do styles


const styles = StyleSheet.create({    // o css no react nativa é feito através desses styles ae q pode ser feito num arquivo separado ou no próprio arquivo, como tá aqui
  container: {    // edição do View 
    flex: 1,  // faz ele ocupar a tela toda e não só um pedacinho
    backgroundColor: '#7159c1',   // tudo que não for número tem que ter aspas em volta
    alignItems: 'center',      // todos os elementos no react-nativa já vem por padrão com display: flex
    justifyContent: 'center',
  },

  // nesse 'css' do react native, as parada que tinha hífen vira tudo uma só, tipo align-items vira alignItems (letra maíscula na segunda palavra)

  title: {    // estilização do Text
    color: '#FFFFFF',   // cor branca no texto
    fontSize: 46,     // tamanho da fonte
    alignItems: 'center',     // centraliza verticalmente
    justifyContent: 'center',   // centraliza horizontalmente
    fontWeight: '700',    // fontWeight tem que ter aspas também mesmo sendo número, é a grossura do texto que se refere a uma palavra, tipo 700 é bold
  }
});
*/