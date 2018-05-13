const Bookshelf = require('../db');

const v_comentarios = Bookshelf.Model.extend({
    tableName: 'v_comentarios',
});

module.exports = v_comentarios