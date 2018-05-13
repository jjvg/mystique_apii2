//---- dependencias ------
const Bookshelf = require('../db');

const Tipo_notificacion = Bookshelf.Model.extend({
  tableName: 'tipo_notificacion',
});

module.exports = Tipo_notificacion;