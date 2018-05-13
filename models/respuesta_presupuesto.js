//---- dependencias ------
const Bookshelf = require('../db');

const Respuesta_presupuesto = Bookshelf.Model.extend({
  tableName: 'respuesta_presupuesto',
});

module.exports = Respuesta_presupuesto;