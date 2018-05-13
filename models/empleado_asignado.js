//---- dependencias ------
const Bookshelf = require('../db');

const Empleado_asignado = Bookshelf.Model.extend({
  tableName: 'empleado_asignado',
});

module.exports = Empleado_asignado;