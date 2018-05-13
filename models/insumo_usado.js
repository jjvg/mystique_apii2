//---- dependencias ------
const Bookshelf = require('../db');

const Insumo_usado = Bookshelf.Model.extend({
  tableName: 'insumo_usado',
});

module.exports = Insumo_usado;