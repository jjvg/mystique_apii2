//----Configuracion------
const { db } = require('../config');

//----Knex------ 
const Knex = require('knex')(db);

//----Booksehlf------ 
const Bookshelf = require('bookshelf')(Knex);

module.exports = Bookshelf;