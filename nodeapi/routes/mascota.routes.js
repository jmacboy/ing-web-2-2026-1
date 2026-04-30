const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const { isJsonRequestValid } = require("../middlewares/isJsonRequestValid.middleware.js");
const schemaValidation = require("../middlewares/schemaValidation.middleware.js");
const requireAuth = require("../middlewares/user.middleware.js");
const mascotaService = require("../services/mascotas.service.js");
const { mascotaSchema } = require("../validators/mascota.schema.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/mascota.controller.js");
    router.get("/", requireAuth, controller.getMascotas);
    router.get("/:id", getObjectOr404(mascotaService), controller.getMascotaById);
    router.post("/", requireAuth, isJsonRequestValid, schemaValidation(mascotaSchema), controller.postMascotaCreate);
    router.put("/:id", requireAuth, getObjectOr404(mascotaService), isJsonRequestValid, schemaValidation(mascotaSchema), controller.putMascotaUpdate);
    router.delete("/:id", requireAuth, getObjectOr404(mascotaService), controller.deleteMascota);

    app.use('/mascotas', router);
};