//---- dependencias ------
const Bookshelf = require('../db');

const Imagen = Bookshelf.Model.extend({
  tableName: 'imagen',
});

module.exports = Imagen;