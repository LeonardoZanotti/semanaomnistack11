import { StyleSheet } from 'react-native';  // define StyleSheet que é a função do react-native pra poder fazer as estilização, como se fosse uma framework inteira pra fazer papel de css só q faz no js
import Constants from 'expo-constants'; // importa umas constantes do celular para ajudar a definir o tamanho das parada, tipo o tamanho da barra de status

export default StyleSheet.create({  // Cria uma área pra poder estilizar as parada e exporta as estilização
    container: {        // View geral de tudo
        flex: 1,        // ocupa a tela toda
        paddingHorizontal: 24,      // espaçamento interno apenas nas laterais (tipo um padding: 0, 24)
        paddingTop: Constants.statusBarHeight + 20   // espaçamento interno superior usando a constante da altura da status bar mais 20 pixels, basicamente vai ficar 20 pixels longe da status bar
    },

    header: {       // view do cabeçalho
        flexDirection: 'row',       // por padrão vem column (itens um em baixo do outro), assim fica um do lado do outro
        justifyContent: 'space-between',        // itens com alinhamento horizontal dando um espaço entre cada um
        alignItems: 'center'        // centralização vertical
    },

    incident: {     // view dos casos
        padding: 24,    // espaçamento interno em todos os lados
        borderRadius: 8,        // bordas arredondadas
        backgroundColor: '#ffffff',     // fundo branco
        marginBottom: 16,        // espaçamento inferior
        marginTop: 20       // margem superior
    },

    incidentProperty: {     // estilização dos títulos dos campos do caso
        fontSize: 14,       // tamanho da fonte
        color: '#41414d',       // cor do texto
        fontWeight: '700',         // grossura do texto - bold
        marginTop: 24           // espaçamento superior
    },

    incidentValue: {    // estilização dos dados que a ONG insere no caso
        marginTop: 8,       // espaçamento superior
        fontSize: 15,       // tamanho da fonte
        color: '#737380'        // cor do texto
    },

    contactBox: {       // estilização da parte dos contatos
        padding: 24,    // espaçamento interno em todos os lados
        borderRadius: 8,        // bordas arredondadas
        backgroundColor: '#ffffff',     // fundo branco
        marginBottom: 16,        // espaçamento inferior
    },

    heroTitle: {    // Umas mensagem que tem dentro do contato
        fontWeight: '700',      // grossura da fonte - bold
        fontSize: 20,       // tamanho da fonte
        color: '#13131a',       // cor da fonte
        lineHeight: 30          // altura da linha
    },

    heroDescription: {      // descrição dentro do contato
        fontSize: 15,       // tamanho da fonte
        color: '#737380',       // cor da fonte
        marginTop: 16       // margem superior
    },

    actions: {      // Os dois botões para contato
        marginTop: 16,      // margem superior
        flexDirection: 'row',       // se organizarão um do lado do outro, por padrão vem "column" que faz eles ficarem um em baixo do outro
        justifyContent: 'space-between'     // alinhamento horizontal dando um espaço entre os dois itens
    },

    action: {       // parte clicável (cada botão)
        backgroundColor: '#e02041',     // fundo vermelho
        borderRadius: 8,        // bordas arredondadas
        height: 50,     // altura
        width: '48%',       // largura de 48% significa que vai ter 1% da largura em branco, o botão, 2% da largura em branco, outro botão, e mais 1% da largura em branco no espaço, isso aqui é pra n importar muito o tamanho do display
        justifyContent: "center",   // era pra centralizar horizontalmente mas por algum motivo no celular isso aqui não tá funcionando direito, o texto tá todo pra esquerda, daí tem uns margin que eu coloquei nos texto mas que não precisaria
        alignContent: "center"      // centraliza verticalmente
    },

    actionText: {       // textos dentro dos botões
        color: '#ffffff',       // cor branca
        fontSize: 15,       // tamanho da fonte
        fontWeight: '700',      // grossura da fonte - bold
        marginLeft: 'auto',     // margem esquerda automática, joga o texto o máximo possível pra direita, e como o espaço que o texto tem é o próprio botão, colocando as margens esquerda e direita como auto faz o texto ficar centralizado
        marginRight: 'auto'     // margem direita automática joga o texto o máximo possível pra esquerda, e como o espaço que o texto tem é o próprio botão, colocando as margens esquerda e direita como auto faz o texto ficar centralizado
    }
});