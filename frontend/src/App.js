import React from 'react';    // definir {useState} se for usar o contador. useState é uma variável de Estado
//import Header from './Header.js';   // importando a função Header
import Routes from './routes';    // importa as rotas e dentro dessas rotas já vai ter várias parada tipo o Logon
import './global.css';    // importando o arquivo css global

// JSX JavaScript XML
// Componente --> função que retorna um HTML
function App() {      // função do aplicativo
  // const [counter, setCounter] = useState(0);    //  setar a variável como um Estado com o useState, que retorna um array {valor da variável, função de atualização da variável}

  // function increment() {
  //   //counter++ oucount += 1
  //   setCounter(counter + 1);    // Função para atualizar a variável vai fazer o valor dela subir em 1

  //   console.log(counter);   // Se não fosse usado Estado pra contar, o counter só poderia ser mostrado no console porque a página não iria se atualizar
  // }
  
  return (    // div necessária pra fazer o header e o button. Contador mostra a variável counter e o botão ao ser clicado executa a função increment
    <div>
      <Routes/>      {/* Chama as funções de cada página, tipo o Logon */}

      {/* <Header>Contador: {counter}</Header>    
      <button onClick={increment}>Incrementar</button>
    
  
        <Header title="Semana Omnistack"> 
            <br/>Be The Hero
        </Header>      função Header com propriedade title */}
    </div>
    );
}

export default App;       // exporta a função App
