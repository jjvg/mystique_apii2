//---- dependencias ------
const Bookshelf = require('../db');

const Promocion = Bookshelf.Model.extend({
  tableName: 'promocion',
});

module.exports = Promocion;