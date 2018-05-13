const Bookshelf = require('../db');

const vista_reclamos_realizados = Bookshelf.Model.extend({
  tableName: 'vista_reclamos_realizados',
});

module.exports = vista_reclamos_realizados;