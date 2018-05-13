const Bookshelf = require('../db');

const Vista_respuesta_presupuesto = Bookshelf.Model.extend({
  tableName: 'vista_respuesta_presupuesto',
});

module.exports = Vista_respuesta_presupuesto