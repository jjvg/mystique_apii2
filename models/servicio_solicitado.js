//---- dependencias ------
const Bookshelf = require('../db');

const Servicio_solicitado = Bookshelf.Model.extend({
  tableName: 'servicio_solicitado',
});

module.exports = Servicio_solicitado;