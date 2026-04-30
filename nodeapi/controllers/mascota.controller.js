const mascotaService = require("../services/mascotas.service");

exports.getMascotas = async (req, res) => {
    const mascotas = await mascotaService.getObjectList();
    res.json(mascotas);
};
exports.getMascotaById = async (req, res) => {
    res.json(req.obj);
};

exports.postMascotaCreate = async (req, res) => {
    const mascota = await mascotaService.createObject(req.body);
    res.json(mascota);
};
exports.putMascotaUpdate = async (req, res) => {
    const { id } = req.params;
    const mascota = await mascotaService.updateObject(id, req.body);
    res.json(mascota);
};
exports.deleteMascota = async (req, res) => {
    const { id } = req.params;
    await mascotaService.deleteObject(id);
    res.json({ message: "Mascota eliminada correctamente" });
};