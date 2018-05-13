//---- dependencias ------
const Bookshelf = require('../db');

const Auditoria = Bookshelf.Model.extend({
    tableName: 'auditoria',
});

module.exports = Auditoria;