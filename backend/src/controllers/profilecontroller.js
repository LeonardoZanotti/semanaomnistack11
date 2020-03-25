const connection = require('../database/connections.js');       // definindo connection

module.exports = {
    async list(request, response) {     // listagem dos incidentes publicados pela ong que está acessando a página
        const ong_id = request.headers.authorization;       // ong_id da sua ong

        const incidents = await connection('incidents')     // busca pelos incidentes publicados por mim mesmo
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);        // retorna os casos que publiquei
    }
}