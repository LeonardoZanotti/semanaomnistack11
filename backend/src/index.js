const express = require('express');     // chama a framework express
const cors = require('cors');           // chama a framework cors

const app = express();      // Criando um aplicavo web
const routes = require('./routes.js');      // importar a variável routes

app.use(cors());            // o aplicativo vai usar cors('site que a aplicação tá hospedada') daí é meio q uma segurança pra só dar pra acessar pelo site, mas por enquanto não precisa
app.use(express.json());    // Faz com que as requisições que retornam .json sejam entendíveis pelo javascript, daí dá pra fazer o POST/PUT sem retornar undefined
app.use(routes);            // Usar as rotas declaradas em routes.js

/*
    Métodos HTTP (app.[método]):

    GET: Buscar/listar uma informação do back-end;
    POST: Criar uma informação no back-end;
    PUT: Alterar uma informação no back-end;
    DELETE: Apagar uma informação do back-end;
*/

/*
    Tipos de parâmetros:

    Query Params: Parâmetros nomeados enviados na rota após o símbolo de interrogação (?) (filtros, paginação -- users?name=Diego, users?page=2, users?page=2&name=Diego&idade=25) (GET);
    Route Params: Parâmetros utilizados para identificar recursos (Se você usar app.get('/users/:id') e no site o link for /users/1, você vai buscar o usuário com id = 1) (GET);
    Request Body: Corpo da requisição, utilizado para criar ou alterar recursos (POST/PUT);
*/

/*
    Bancos de dados:
    
    SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server...
    NoSQL: MongoDB, CounchDB ...

    Driver: select * from users;
    Query Builder: table('users').select('*').where()   --> knex 
*/





app.listen(3333);                               // o aplicativo vai ouvir a porta 3333, que pode ser acessada pelo navegador no link: 'localhost:3333'