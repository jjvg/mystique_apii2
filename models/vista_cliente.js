const Bookshelf = require('../db');

const Cliente = Bookshelf.Model.extend({
  tableName: 'clientes',
});

module.exports = Cliente;