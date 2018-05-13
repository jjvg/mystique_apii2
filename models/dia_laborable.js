//---- dependencias ------
const Bookshelf = require('../db');

const Dia_laborable = Bookshelf.Model.extend({
  tableName: 'dia_laborable',
});

module.exports = Dia_laborable;