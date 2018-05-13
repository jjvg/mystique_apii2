//---- dependencias ------
const Bookshelf = require('../db');

const Reclamo = Bookshelf.Model.extend({
  tableName: 'reclamo',
});

module.exports = Reclamo;