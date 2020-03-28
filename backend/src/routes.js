const express = require('express');     // importa a framework principal do projet
const { celebrate, Segments, Joi } = require('celebrate');       // importa framework pra fazer validação: celebrate é pra fazer do express e o Joi é o de validar geral

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
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({       // busca lá no query params os objetos e faz validação das keys deles, usa os [] por que o object vai vir com {} daí já tem {} ali também pra identificar área javascript
        page: Joi.number()      // valida as páginas como sendo números apenas
    })
}), incidentcontroller.list);       // fazer validação das páginas serem um número

// Cadastro de casos
routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({        // validação das keys do object que tá no BODY, usa-se colchetes ali porque o objeto vem com {} daí já tem {} ali pra identificar espaço js
        title: Joi.string().required(),     // título obrigatório string
        description: Joi.string().required(),       // descrição obrigatória string
        value: Joi.number().required()      // valor obrigatório número
    }),

    [Segments.HEADERS]: Joi.object({        // vai pegar informações do cabeçalho validando os objetos, lembre-se que isso vem entre chaves, por isso se usa os colchetes aqui (já que tem chaves ali pra identificar área js)
        authorization: Joi.string().required()  // vai pegar o authorization lá do cabeçalho pra validar como string, daí se n tiver o authorization ele nem vai carregar
    }).unknown()        // os demais objetos que vem no cabeçalho que eu não especifiquei só serão descartados sem validação  
}), incidentcontroller.create);   // validar os dados de criação de caso

// Apagar casos
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({      // vai pegar informação dos parâmetros, validando as keys dos objetos que vão vir entre {} por isso se usa [] já que já há ali as {} pra definir área js
        id: Joi.number().required()         // validando o parâmetro id como um número obrigatório
    })
}), incidentcontroller.delete);     // função celebrate pra validar o id do delete

// Listar casos que eu (uma ong querendo ver os casos que ela mesma publicou) publiquei
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({    // vai pegar informações do cabeçalho validando os objetos, lembre-se que isso vem entre chaves, por isso se usa os colchetes aqui (já que tem chaves ali pra identificar área js)
        authorization: Joi.string().required()  // vai pegar o authorization lá do cabeçalho pra validar como string, daí se n tiver o authorization ele nem vai carregar
    }).unknown()        // os demais objetos que vem no cabeçalho que eu não especifiquei só serão descartados sem validação    
}), profilecontroller.list);        // função celebrate para validar o authorization

// Listar a tabela ongs
routes.get('/ongs', ongcontroller.list);

// Cadastro de ongs 
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({    // Vai pegar informações do body, validando as chaves do objeto (lembre-se que lá vc definiu o body usando {} então usa-se conchetes aqui pra definir o objeto dentro da área javascript)
        name: Joi.string().required(),      // obrigatório nome da ong deve ser uma string
        email: Joi.string().required().email(), // Mesmo sem o required() isso aqui tá sendo obrigatório, daí tive que fazer mó corre pra poder não ter email, mas email deve ser string tendo formato de email com @ terminando em . alguma coisa
        whatsapp: Joi.number().required(),   // Mesmo sem o required() isso aqui tá sendo obrigatório, daí tive que fazer mó corre pra poder não ter zap, mas isso valida o zap como sendo um número; .mix() e .max() não funciona não, isso ai limita o número msm, tipo max(10) permite apenas de 0 a 9, esse min max só funciona do jeito que se espera se fosse tipo string, mas como eu fiz a boa lá no frontend já n tem pq se preocupar
        city: Joi.string().required(),      // obrigatório cidade tem q ser string
        uf: Joi.string().required().length(2)   // obrgatório uf deve ser uma string com 2 caracteres
    })
}), ongcontroller.create);    // função celebrate para validação dos dados da ong

// Login de ongs
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({    // Vai pegar informação do body, validando as chaves do objeto. Como objeto usa {}, ali tem [] pra poder fazer essa boa além de {} pra declarar área js
        id: Joi.string().required()         // id tem que ser string e é obrigatório
    })
}), sessioncontroller.create);      // validar o id que tá sendo enviado


module.exports = routes;        // exportar a variável routes