//---- dependencias ------
const Bookshelf = require('../db');

const Servicio_parametro = Bookshelf.Model.extend({
  tableName: 'servicio_parametro',
});

module.exports = Servicio_parametro;