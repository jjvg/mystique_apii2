//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_reclamo = Bookshelf.Model.extend({
  tableName: 'tipo_reclamo',
});

module.exports = Tipo_reclamo;