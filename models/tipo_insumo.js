//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_insumo = Bookshelf.Model.extend({
  tableName: 'tipo_insumo',
});

module.exports = Tipo_insumo;