const Joi = require("joi");

const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    edad: Joi.number().integer().min(1).max(120).required(),
    ciudad: Joi.string().required(),
    fechaNacimiento: Joi.date().required()
});
const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
module.exports = {
    registerUserSchema,
    loginUserSchema
};