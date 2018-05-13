//---- dependencias ------
const Bookshelf = require('../db');

const Rol = Bookshelf.Model.extend({
  tableName: 'rol',
});

module.exports = Rol;