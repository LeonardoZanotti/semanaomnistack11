exports.up = function(knex) {               // knex é uma ferramenta usada para manuseio de banco de dados, o migrations é pra criar tabelas nos bancos de dados, então esse arquivo aqui é só pra criar uma tabela no banco de dados que a gente declarou no sqlite
    return knex.schema.createTable('ongs', function(table) {        // Função para envio de nova tabela 'ongs' destinada ao cadastro de novas ongs
        table.string('id').primary();                   // Chave primária id
        table.string('name').notNullable();             // Nome não nulo
        table.string('email').notNullable();            // email não nulo
        table.string('whatsapp').notNullable();         // whatsapp não nulo
        table.string('city').notNullable();             // cidade não nula
        table.string('uf', 2).notNullable();            // unidade federativa não nula com duas casas
    });
};

exports.down = function(knex) {             // se não der certo de upar a tabela:
  knex.schema.dropTable('ongs');            // apaga tudo da tabela
};
