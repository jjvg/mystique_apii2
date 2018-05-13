//---- dependencias ------
const Bookshelf = require('../db');

const Agenda = Bookshelf.Model.extend({
  tableName: 'agenda',
});

module.exports = Agenda;