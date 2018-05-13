//---- dependencias ------
const Bookshelf = require('../db');

const Criterio = Bookshelf.Model.extend({
  tableName: 'criterio',
});

module.exports = Criterio;