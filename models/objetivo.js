//---- dependencias ------
const Bookshelf = require('../db');

const Objetivo = Bookshelf.Model.extend({
  tableName: 'objetivo',
});

module.exports = Objetivo;