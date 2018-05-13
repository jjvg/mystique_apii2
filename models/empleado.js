//---- dependencias ------
const Bookshelf = require('../db');

const Empleado = Bookshelf.Model.extend({
  tableName: 'empleado',
});

module.exports = Empleado;