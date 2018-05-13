//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_respuesta_presupuesto = Bookshelf.Model.extend({
  tableName: 'tipo_respuesta_presupuesto',
});

module.exports = Tipo_respuesta_presupuesto;