const { sequelize } = require('../config/db.config');

const persona = require('./persona.model')(sequelize);
const usuario = require('./usuario.model')(sequelize);
module.exports = {
    persona,
    usuario,
    sequelize,
    Sequelize: sequelize.Sequelize
}