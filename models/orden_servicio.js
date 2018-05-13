//---- dependencias ------
const Bookshelf = require('../db');

const Orden_servicio = Bookshelf.Model.extend({
  tableName: 'orden_servicio',
});

module.exports = Orden_servicio;