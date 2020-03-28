const crypto = require('crypto')      // define o crypto que é um gerador de caracteres aleatórios juntos

module.exports = function generateUniqueId() {     // cria e exporta função de gerar id único
    return crypto.randomBytes(4).toString('HEX');       // id da ong sendo gerada pelo crypto num código de 4 bytes e depois convertido em hexadecimal
};

// com isso se precisar de um id único em qualquer lugar só chamar isso aqui dale