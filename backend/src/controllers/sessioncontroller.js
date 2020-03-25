const connection = require('../database/connections.js');       // Declarando connection como o banco de dados lá

module.exports = {          // Verificar se a ong realmente existe
    async create(request, response) {       // Criando login
        const { id } = request.body;        // Pegando o id da sessão que tá sendo postado pelo json

        const ong = await connection('ongs')     // verificando a ong no banco de dados 'ong'
            .where('id', id)                // procurando pelo id da sessão
            .select('name')                 // seleciona o nome da ong encontrada
            .first();                       // como só tem 1 id igual ao da sessão só pode ter uma ong com esse id, então é o primeiro que achar

            if(!ong) {      // se a ong não existir
                return response.status(400).json({ error: "No ONG found with this id." })         // retorna resposta com status 400 (bad request - algo deu errado) e a mensagem de erro
            };

            return response.json(ong);  // se tudo tá bala, retorna os dados da ong (apenas o nome)
    }
}