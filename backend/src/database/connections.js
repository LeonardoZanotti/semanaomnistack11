const knex = require('knex');   // importa o knex
const configuration = require('../../knexfile');    // define configuration

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;
// define config como uma variável ambiente, se for (?) 'test' ele vai acessar o banco de dados de teste se não (:) vai acessar o de desenvolvimento mesmo

const connection = knex(config); // define connection como a função knex com o parâmetro config pra poder acessar os bancos de dados

module.exports = connection;    // exporta connection