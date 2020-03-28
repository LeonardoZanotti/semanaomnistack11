const generateUniqueId = require('../../src/utils/generateuniqueid.js');        // importa  a função que vamo tester

// teste único é um teste mais simples que testa uma parte pequena de código tipo uma única função, como é o caso aqui

describe('Generate Unique ID', () => {      // descrição da função
    it('should generate an unique ID', () => {      // o que a função deve fazer
        //expect(2 + 2).toBe(5);      // eu espero que 2 + 2 seja 5 -> FAIL

        const id = generateUniqueId();      // gera o id únido pela função

        expect(id).toHaveLength(8);         // eu espero que o id tenha 8 caracteres -> PASS
    });
});

// npm test pra executar o teste e ver se PASS or FAIL