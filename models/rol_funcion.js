//---- dependencias ------
const Bookshelf = require('../db');

const Rol_funcion = Bookshelf.Model.extend({
  tableName: 'rol_funcion',
});

module.exports = Rol_funcion;