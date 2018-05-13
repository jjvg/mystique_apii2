//---- dependencias ------
const Bookshelf = require('../db');

const Horario = Bookshelf.Model.extend({
  tableName: 'horario',
});

module.exports = Horario;