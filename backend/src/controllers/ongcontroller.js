const connection = require('../database/connections.js') // Requerindo o banco de dados mesmo, daí é só inserir os dados nessa variável dale
const generateUniqueId = require('../utils/generateuniqueid');  // importa a função de gerar id único

module.exports = {
    async list(request, response) {         // listagem das ongs
        const ongs = await connection('ongs').select('*');      // Mostrar toda a tabela

        return response.json(ongs);         // retorna um array com todos os dados de todas as ongs cadastradas na tabela
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;       // dados que a ong vai inserir serão armazenados nessas 5 variáveis
        // console.log(data);                                      // se quiser testar o json que ele retorna
    
        const id = generateUniqueId();  // o id é igual a função de gerar id único, ou seja, a função vai gerar um id único que será armazenado no 'id'
        
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