//---- dependencias ------
const Bookshelf = require('../db');

const Calificacion_servicio = Bookshelf.Model.extend({
  tableName: 'calificacion_servicio',
});

module.exports = Calificacion_servicio;