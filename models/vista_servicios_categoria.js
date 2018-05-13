const Bookshelf = require('../db');

const Vista_servicios_categoria = Bookshelf.Model.extend({
  tableName: 'vista_servicios_categoria',
});

module.exports = Vista_servicios_categoria