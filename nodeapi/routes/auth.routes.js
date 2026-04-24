const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const { isJsonRequestValid } = require("../middlewares/isJsonRequestValid.middleware.js");
const schemaValidation = require("../middlewares/schemaValidation.middleware.js");
const personaService = require("../services/personas.service.js");
const { registerUserSchema, loginUserSchema } = require("../validators/user.schema.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/auth.controller.js");
    router.post('/register', isJsonRequestValid, schemaValidation(registerUserSchema), controller.postRegister);
    router.post('/login', isJsonRequestValid, schemaValidation(loginUserSchema), controller.postLogin);
    app.use('/auth', router);
};