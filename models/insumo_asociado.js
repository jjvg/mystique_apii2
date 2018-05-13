//---- dependencias ------
const Bookshelf = require('../db');

const Insumo_asociado = Bookshelf.Model.extend({
  tableName: 'insumo_asociado',
});

module.exports = Insumo_asociado;