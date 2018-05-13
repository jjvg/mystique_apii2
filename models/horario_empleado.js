//---- dependencias ------
const Bookshelf = require('../db');

const Horario_empleado = Bookshelf.Model.extend({
  tableName: 'horario_empleado',
});

module.exports = Horario_empleado;