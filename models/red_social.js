//---- dependencias ------
const Bookshelf = require('../db');

const Red_social = Bookshelf.Model.extend({
  tableName: 'red_social',
});

module.exports = Red_social;