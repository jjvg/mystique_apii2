//---- dependencias ------
const Bookshelf = require('../db');

const Sistema = Bookshelf.Model.extend({
  tableName: 'sistema',
});

module.exports = Sistema;