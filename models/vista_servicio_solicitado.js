const Bookshelf = require('../db');

const Vista_servicio_solicitado = Bookshelf.Model.extend({
  tableName: 'vista_servicio_solicitado',
});

module.exports = Vista_servicio_solicitado;