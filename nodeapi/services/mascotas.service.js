const db = require("../models");
const mascotaService = {
    getObjectList: async () => {
        return db.mascota.findAll();
    },
    createObject: async ({ nombre, tipo, personaId }) => {
        return await db.mascota.create({
            nombre,
            tipo,
            personaId
        });
    },
    getById: async (id) => {
        return await db.mascota.findByPk(id);
    },
    updateObject: async (id, { nombre, tipo, personaId }) => {
        const mascota = await mascotaService.getById(id);
        mascota.nombre = nombre;
        mascota.tipo = tipo;
        mascota.personaId = personaId;
        return await mascota.save();
    },
    deleteObject: async (id) => {
        const mascota = await mascotaService.getById(id);
        return await mascota.destroy();
    }
}
module.exports = mascotaService;



