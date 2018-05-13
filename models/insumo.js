//---- dependencias ------
const Bookshelf = require('../db');

const Insumo = Bookshelf.Model.extend({
  tableName: 'insumo',
});

module.exports = Insumo;