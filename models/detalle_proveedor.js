//---- dependencias ------
const Bookshelf = require('../db');

const Detalle_proveedor = Bookshelf.Model.extend({
  tableName: 'detalle_proveedor',
});

module.exports = Detalle_proveedor;