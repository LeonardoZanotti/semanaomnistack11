import { StyleSheet } from 'react-native';  // define StyleSheet que é a função do react-native pra poder fazer as estilização, como se fosse uma framework inteira pra fazer papel de css só q faz no js
import Constants from 'expo-constants';     // esse pacote permite adquirir algumas informações fixas tipo o tamanho da status bar, daí ajuda a dimensionar as parada

export default StyleSheet.create({  // Cria uma área pra poder estilizar as parada e exporta as estilização
    container: {        // estilização das parada com estilo container
        flex: 1,        // faz ocupar a tela toda e não só um pedacinho
        paddingHorizontal: 24,  // padding horizontal, igual ao padding: 0, 24; que é um espaço interno na direita e esquerda
        paddingTop: Constants.statusBarHeight + 20  // vai pegar o tamanho da barra de status que é a parte de cima do cel onde tem a hora e vai dar um paddind do tamanho dela + 20 pixels, basicamente a parada fica 20 pixels longe da status bar
    },

    header: {       // estilização do view cabeçalho
        flexDirection: 'row',   // por padrão vem column, que faz os itens ficarem um em baixo do outro, assim eles ficam um do lado do outro
        justifyContent: 'space-between',    // alinhamento horizontal dando espaço entre os items
        alignItems: 'center'        // centralização vertical
    },

    headerText: {       // estilização do texto do cabeçalho
        fontSize: 15,       // tamanho da fonte
        color: '#737380'    // cor da fonte
    },

    headerTextBold: {       // estilização do texto que vai ser em negrito que tá dentro do texto do cabeçalho
        fontWeight: '700'     // grossura da fonte 700 - negrito (bold)
    },

    title: {    // estilização do título Bem-vindo!
        fontSize: 30,   // tamanho da fonte
        marginBottom: 16,   // margem inferior
        marginTop: 48,      // margem superior
        color: "#13131a",    // cor do texto
        fontWeight: '700'   // grossura da fonte 700 - 'bold'
    },

    description: {      // estilização da descrição
        fontSize: 16,       // tamanho da fonte
        lineHeight: 24,     // altura da linha
        color: '#737380'        // cor do texto
    },

    incidentList: {     // estilizar a lista de casos lá
        marginTop: 32   // margem superior
    },

    incident: {         // estilização de cada caso
        padding: 24,        // margem interna em todos os lados
        borderRadius: 8,        // bordas arredondadas
        backgroundColor: '#ffffff',     // fundo branco
        marginBottom: 16        // margem inferior
    },

    incidentProperty: {     // os títulos dos campos dos casos
        fontSize: 14,       // tamanho da fonte
        color: '#41414d',       // cor do texto
        fontWeight: '700'       // grossura do texto - bold
    },

    incidentValue: {        // estilização dos textos que as ONGs inserem
        marginTop: 8,       // margem superior
        fontSize: 15,       // tamanho da fonte
        marginBottom: 24,       // margem inferior
        color: '#737380'        // cor do texto
    },

    detailsButton: {        // estilização da parte clicável
        flexDirection: 'row',      // por padrão vem column, que faz os itens ficarem um em baixo do outro, assim eles ficam um do lado do outro
        justifyContent: 'space-between',    // alinhamento horizontal espaçando entre os itens
        alignItems: 'center'        // centralização vertical
    },

    detailButtonText: {     // estilização do texto da parte clicável
        color: "#e02041",       // cor vermelha bonitinha
        fontSize: 15,       // tamanho da fonte
        fontWeight: '700'       // grossura da fonte bold
    }
});