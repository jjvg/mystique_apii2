//---- dependencias ------
const Bookshelf = require('../db');

const Unidad = Bookshelf.Model.extend({
  tableName: 'unidad',
});

module.exports = Unidad;