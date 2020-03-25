exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {   // Função para envio de uma tabela de incidentes para cadastras novos casos
        table.increments();             // cada caso vai ter numeração automática auto_increment

        table.string('title').notNullable();            // título não nulo
        table.string('description').notNullable();      // descrição não nula
        table.decimal('value').notNullable();           // valor não nulo

        table.string('ong_id').notNullable();           // id da ong (da tabela 'ongs') que postou o caso
        table.foreign('ong_id').references('id').inTable('ongs');   // referenciando ong_id pro id da tabela ongs
    });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
