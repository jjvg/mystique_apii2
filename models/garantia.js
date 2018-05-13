//---- dependencias ------
const Bookshelf = require('../db');

const Garantia = Bookshelf.Model.extend({
  tableName: 'garantia',
});

module.exports = Garantia;