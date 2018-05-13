//---- dependencias ------
const Bookshelf = require('../db');

const Ciudad = Bookshelf.Model.extend({
  tableName: 'ciudad',
});

module.exports = Ciudad;