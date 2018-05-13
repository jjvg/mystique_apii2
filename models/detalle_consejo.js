//---- dependencias ------
const Bookshelf = require('../db');

const Detalle_consejo = Bookshelf.Model.extend({
  tableName: 'detalle_consejo',
});

module.exports = Detalle_consejo;