//---- dependencias ------
const Bookshelf = require('../db');

const Detalle_servicio = Bookshelf.Model.extend({
  tableName: 'detalle_servicio',
});

module.exports = Detalle_servicio;