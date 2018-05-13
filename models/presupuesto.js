//---- dependencias ------
const Bookshelf = require('../db');

const Presupuesto = Bookshelf.Model.extend({
  tableName: 'presupuesto',
});

module.exports = Presupuesto;