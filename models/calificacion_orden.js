//---- dependencias ------
const Bookshelf = require('../db');

const Calificacion_orden = Bookshelf.Model.extend({
  tableName: 'calificacion_orden',
});

module.exports = Calificacion_orden;