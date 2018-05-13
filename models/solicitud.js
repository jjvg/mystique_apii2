//---- dependencias ------
const Bookshelf = require('../db');

const Solicitud = Bookshelf.Model.extend({
    tableName: 'solicitud',
});

module.exports = Solicitud;