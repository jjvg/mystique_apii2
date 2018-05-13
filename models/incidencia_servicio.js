//---- dependencias ------
const Bookshelf = require('../db');

const Incidencia_servicio = Bookshelf.Model.extend({
  tableName: 'incidencia_servicio',
});

module.exports = Incidencia_servicio;