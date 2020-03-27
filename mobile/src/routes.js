import React from 'react';  // define React
import { createStackNavigator } from '@react-navigation/stack'; // define a função de navegação de páginas que vai ser tipo clicar num texto e ir pra uma página
import { NavigationContainer } from '@react-navigation/native'; // define a função que é tipo o BrowserRouter

const AppStack = createStackNavigator();    // define AppStack como a função pra fazer a navegação de páginas 

import Incidents from './pages/incidents/index.js';     // importa a função Incidents
import Detail from './pages/detail/index.js';       // importa a função Detail

export default function Routes() { // função de rotas definida e exportada
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions = {{ headerShown: false }}>
                <AppStack.Screen name = "Incidents" component = {Incidents}/>
                <AppStack.Screen name = "Detail" component = {Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

//  NavigationContainer é tipo o BrowserRouter do frontend pra fazer as rotas de lá
//  AppStack.Navigator pra definir as rotas com opções de tela de não mostrar o cabeçalho -- duas chaves uma pra definir espaço javascript e outra pra definir o objeto
//  AppStack.Screen component define a rota e o componente da rota, que são as funções de cada rota