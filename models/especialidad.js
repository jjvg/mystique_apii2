//---- dependencias ------
const Bookshelf = require('../db');

const Especialidad = Bookshelf.Model.extend({
  tableName: 'especialidad',
});

module.exports = Especialidad;