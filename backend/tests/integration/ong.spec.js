const request = require('supertest');   // define request como os pacotes de supertest
const app = require('../../src/app.js');    // importa o app
const connection = require('../../src/database/connections.js');    // importa conexão com banco de dados

// teste de integração é um teste mais amplo que busca rotas e testa uma grande parte de códigos

describe('ONG', () => {     // descreve a função como ONG
    beforeEach(async () => {        // antes de cada test
        await connection.migrate.latest();      // espera conectar com o banco de dados (que como isso é um teste, é o banco de dados de teste)
    });

    afterAll(async () => {  // depois de todos os testes serem feitos
        await connection.migrate.rollback();      // espera desfazer todas as conexões com o banco de dados (que como isso é um teste, é o banco de dados de teste), isso aqui apaga os dados do banco de dados mesmo pra n ficar ocupando espaço com arquivo de teste, então toma cuidado pra n dar ruim e vc usar o de desenvolvimento ao invés do de teste
        await connection.destroy();     // espere destruir a conexão com o banco de dados pra daí n ficar rodando mais coisa sem sentido e encerra os testes
    });

    it('should be able to create a new ONG', async () => {    // a função deveria criar uma nova ONG
        const response = await request(app)       // variável response vai esperar requisitar o aplicativo
            .post('/ongs')      // tentar postar na rota '/ongs'
            //.set('Authorization', 'id')      se precisar definir authorization em outro teste
            .send({             // enviando os dados seguintes
                name: "Yasuo",
                email: "yasuo@solo.com",
                whatsapp: "4745645847",
                city: "Ionia",
                uf: "X1"
            });

        //console.log(response.body); // console vai msotrar a resposta que é o id

        expect(response.body).toHaveProperty('id');     // eu espero que no corpo da resposta haja uma propriedade chamada 'id'
        expect(response.body.id).toHaveLength(8);   // e eu espero que essa propriedade id tenha 8 caracteres
    });
});