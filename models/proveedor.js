//---- dependencias ------
const Bookshelf = require('../db');

const Proveedor = Bookshelf.Model.extend({
  tableName: 'proveedor',
});

module.exports = Proveedor;