const connection = require('../database/connections.js');

module.exports = {
    async list(request, response) {         // listagem de casos
        const { page = 1 } = request.query;         // Busca o valor da página (page) no query ('?page=xxx') e se não existir page passa a ser igual a 1

        const [count] = await connection('incidents').count();    // connection('incidents') devolve um array do banco de dados incidents, count conta quantos elementos esse array tem e devolve num array com um item só: o total de elementos do primeiro array
        //console.log(count)              // count foi definido como o primeiro e único elemento do array, sendo este igual ao array que possui o total de elementos
        response.header('X-Total-Count', count['count(*)']);    // A quantidade de casos vai ser enviada como resposta ao cabeçalho na linha 'X-Total-Count'. Note que 'count' é um json, e estamos enviando as propriedades do objeto 'count(*)', que é o total de casos

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')   // Comparação de dados entre a tabela ongs e incidents. Com isso vai mostrar dados da tabela ongs da parte onde ong_id é igual nas duas tabelas
            .limit(5)                                       // limita a cinco registros por vez
            .offset((page - 1) * 5)                         // onde começa a contar as 5 páginas --> na page = 1, vai começar em 0, na page = 2 começa em 5 e assim vai
            .select([
                "incidents.*", 
                "ongs.name",
                "ongs.email",
                "ongs.whatsapp",
                "ongs.city",
                "ongs.uf"
            ]);   // seleciona para enviar tudo da tabela incidents, e apenas o nome, email, zap, cidade e uf da tabela ongs

        return response.json(incidents);        // mostra todos os casos num json
    },
    
    async create(request, response) {
        const { title, description, value } = request.body;     // declara essas variáveis como dados que a ong vai inserir
        const ong_id = request.headers.authorization;           // pega o id da ong no cabeçalho na parte de autorização

        const [id] = await connection('incidents').insert({      // como tem o id lá com auto_increment, isso retorna um array com uma única posição, então pra pegar esse id é só declarar ele como sendo o primeiro (e único) elemento de um array
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });       // retorna o id que pegamos ali em cima pra enumerar os casos
    },

    async delete(request, response) {       // apagar casos
        const { id } = request.params;              // id do caso que vai vir no link 'incidents/:id'
        const ong_id = request.headers.authorization;       // id da ong pra poder checar se o caso foi publicado pela ong mesmo pra não deixar uma ong apagar a de outra

        const incident = await connection('incidents')          // procurando o caso de acordo com o id fornecido
            .where('id', id)
            .select('ong_id')           // seleciona apenas o id da ong
            .first();   // como só vai ter um registro com o id, você pega o primeiro

        if(incident.ong_id != ong_id) {     // checagem se o id da ong que tá tentando apagar o caso é o mesmo que publicou o caso
            return response.status(401).json({ error: "Operation not permited." });    // se não for, ele altera o status do link pra 401 (não autorizado), o normal é 200 (autorizado), e emite a mensagem de erro
        }

        await connection('incidents').where('id', id).delete();     // Se tudo der certo, ele busca na tabela incidents o id do caso e apaga ele

        return response.status(204).send();     // Retorna o status 204 (Resposta que não possui conteúdo mas foi bem sucedida)
    }   
};