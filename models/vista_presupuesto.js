const Bookshelf = require('../db');

const Vista_presupuesto = Bookshelf.Model.extend({
  tableName: 'vista_presupuesto',
});

module.exports = Vista_presupuesto