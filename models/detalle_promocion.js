//---- dependencias ------
const Bookshelf = require('../db');

const Detalle_promocion = Bookshelf.Model.extend({
  tableName: 'detalle_promocion',
});

module.exports = Detalle_promocion;