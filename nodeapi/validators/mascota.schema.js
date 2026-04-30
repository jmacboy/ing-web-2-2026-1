const Joi = require("joi");

const mascotaSchema = Joi.object({
    nombre: Joi.string().required(),
    tipo: Joi.string().required(),
    personaId: Joi.number().integer().required()
});
module.exports = {
    mascotaSchema
};