//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_servicio = Bookshelf.Model.extend({
  tableName: 'tipo_servicio',
});

module.exports = Tipo_servicio;