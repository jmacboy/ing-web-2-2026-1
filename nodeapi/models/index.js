const { sequelize } = require('../config/db.config');

const persona = require('./persona.model')(sequelize);
const usuario = require('./usuario.model')(sequelize);
const mascota = require('./mascota.model')(sequelize);

usuario.hasOne(persona, { foreignKey: 'usuarioId', as: 'persona' });
persona.belongsTo(usuario, { foreignKey: 'usuarioId', as: 'usuario', onDelete: 'CASCADE' });

persona.hasMany(mascota, { foreignKey: 'personaId' });
mascota.belongsTo(persona, { foreignKey: 'personaId' });

module.exports = {
    persona,
    usuario,
    mascota,
    sequelize,
    Sequelize: sequelize.Sequelize
}