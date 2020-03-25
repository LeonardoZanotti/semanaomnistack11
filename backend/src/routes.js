const express = require('express');

const ongcontroller = require('./controllers/ongcontroller.js');    // Requerindo o controlador das ongs
const incidentcontroller = require('./controllers/incidentcontroller.js');  // Requerindo o controlador dos casos
const profilecontroller = require('./controllers/profilecontroller.js');    // Requerindo o controlador do perfil das ongs
const sessioncontroller = require('./controllers/sessioncontroller.js');    // Requerindo o controlador de sessão

const routes = express.Router()     // Sistema de rotas do express foi acoplado a uma variável

// Query Params                                       // localhost:3333/alguma-coisa é a rota
routes.get('/users', (request, response) => {           // '/' é o diretório principal do aplicatiovo, o que vem depois da '/' se chama recursos, então se você tenta acessar por exemplo locahost:3333/users você está tentando acessar o recurso usuários, daí passamos os parâmetros request e response
    const params = request.query;               // Requisição dos parâmetros Query --> params = "name=Diego"
    console.log(params);                        // app.get('/users') e no Insomnia "http://localhost:3333/users?name=Diego&idade=25" retorna { name: 'Diego', idade: '25' }

    // return response.send('Hello World!');    // resposta Hello World
    return response.json({                      // resposta como se fosse um json
        evento: 'Semana Omnistack 11.0',        // memes do json
        aluno: 'Zanotto'
    });
});


// Route Params
routes.get('/users/:id', (request, response) => {       
    const id = request.params;                  // app.get('/users/:id') e no Insomnia http://localhost:3333/users/1 retorna { id: '1' }
    console.log(id);

    return response.json({                      // resposta como se fosse um json
        evento: 'Semana Omnistack 11.0',        // memes do json
        aluno: 'Zanotto'
    });
})


// Request Body
routes.post('/users', (request, response) => {       
    const body = request.body;                  // app.post('/users') e no Insomnia http://localhost:3333/users com o json feito lá retorna undefined sem o app.use lá de cima, se tiver o app.use retorna { name: 'Leonardo Zanotto', idade: 18 }
    console.log(body); 
    
    return response.json({                      // resposta como se fosse um json
        evento: 'Semana Omnistack 11.0',        // memes do json
        aluno: 'Zanotto'
    });
})


// Listar casos
routes.get('/incidents', incidentcontroller.list);

// Cadastro de casos
routes.post('/incidents', incidentcontroller.create);

// Apagar casos
routes.delete('/incidents/:id', incidentcontroller.delete);

// Listar casos que eu (uma ong querendo ver os casos que ela mesma publicou) publiquei
routes.get('/profile', profilecontroller.list);

// Listar a tabela ongs
routes.get('/ongs', ongcontroller.list);

// Cadastro de ongs 
routes.post('/ongs', ongcontroller.create);

// Login de ongs
routes.post('/sessions', sessioncontroller.create);


module.exports = routes;        // exportar a variável routes