import React from 'react';      // importa React
import { BrowserRouter, Route, Switch} from 'react-router-dom'; // importa umas parada pra fazer rotas

import Logon from './pages/logon/index.js';     // importa o Logon()
import Register from './pages/register/index.js';   // importa Register()
import Profile from './pages/profile/index.js'; // importa Profile()
import NewIncident from './pages/newincident/index.js'; // importa NewIncident()

function Routes() {     // Função de rotas
    return (
        <BrowserRouter>
            <Switch>    {/* Garante que apenas uma rota seja executada por vez */}
                <Route path = "/" exact component = {Logon}/>    {/* Seta a primeira rota, destinada à página principal ('/') que é o Logon. O exact define que a rota deva ser exatamente aquele, se não quando a gente tentar acessar outra ia acabar caindo nessa aqui pois ele só verifica se começa com aquilo, e todas começam com a '/' */}
                <Route path = "/register" component = {Register}/> {/* Seta a rota para registro para a função Register */}
                <Route path = "/profile" component = {Profile}/>    {/* Seta a rota para profile para a função Profile */}
                <Route path = "/incidents/new" component = {NewIncident}/>    {/* Seta a rota para incidents/new para a função NewIncident */}
            </Switch>
        </BrowserRouter>
    );
};


export default Routes;      // exporta a função Routes()