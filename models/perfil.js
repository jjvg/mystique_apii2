//---- dependencias ------
const Bookshelf = require('../db');

const Perfil = Bookshelf.Model.extend({
  tableName: 'perfil',
});

module.exports = Perfil;