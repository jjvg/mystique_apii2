//---- dependencias ------
const Bookshelf = require('../db');
const Solicitudes = require('./vista_solicitudes');

const cliente_solicitudes = Bookshelf.Model.extend({
    tableName: 'cliente',
    solicitudes: function() {
        return this.hasMany(Solicitudes, 'id_cliente');
    }
});

module.exports = cliente_solicitudes;