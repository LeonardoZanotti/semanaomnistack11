const connection = require('../database/connections.js') // Requerindo o banco de dados mesmo, daí é só inserir os dados nessa variável dale
const crypto = require('crypto');     // gerador de caracteres aleatórios juntos

module.exports = {
    async list(request, response) {         // listagem das ongs
        const ongs = await connection('ongs').select('*');      // Mostrar toda a tabela

        return response.json(ongs);         // retorna um array com todos os dados de todas as ongs cadastradas na tabela
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;       // dados que a ong vai inserir serão armazenados nessas 5 variáveis
        // console.log(data);                                      // se quiser testar o json que ele retorna
    
        const id = crypto.randomBytes(4).toString('HEX');       // id da ong sendo gerada pelo crypto num código de 4 bytes e depois convertido em hexadecimal
        
        await connection('ongs').insert({             // inserindo esses valores aí na tabela ongs
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
    
        return response.json({ id });       // Estamos usando esse id que geramos como um cnpj da ong, sendo este o meio de login dela    
    }
}