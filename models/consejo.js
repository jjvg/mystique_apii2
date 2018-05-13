//---- dependencias ------
const Bookshelf = require('../db');

const Consejo = Bookshelf.Model.extend({
  tableName: 'consejo',
});

module.exports = Consejo;