//---- dependencias ------
const Bookshelf = require('../db');

const Servicio = Bookshelf.Model.extend({
  tableName: 'servicio',
});

module.exports = Servicio;