//---- dependencias ------
const Bookshelf = require('../db');

const Notificacion = Bookshelf.Model.extend({
  tableName: 'notificacion',
});

module.exports = Notificacion;