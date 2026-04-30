const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const { isJsonRequestValid } = require("../middlewares/isJsonRequestValid.middleware.js");
const schemaValidation = require("../middlewares/schemaValidation.middleware.js");
const requireAuth = require("../middlewares/user.middleware.js");
const personaService = require("../services/personas.service.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/persona.controller.js");
    router.get("/", requireAuth, controller.getPersonas);
    router.get("/:id", getObjectOr404(personaService), controller.getPersonaById);

    app.use('/personas', router);
};