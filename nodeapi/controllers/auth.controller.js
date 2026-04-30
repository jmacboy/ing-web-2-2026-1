const { generateToken } = require("../utils/jwt.utils");
const { sha1Encode } = require("../utils/text.utils");
const userService = require("../services/user.service");
const personaService = require("../services/personas.service");

exports.postRegister = async (req, res) => {
    const { email, password, nombre, apellido, ciudad, edad, fechaNacimiento } = req.body;
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: "El correo electrónico ya está registrado" });
    }
    const encodedPassword = sha1Encode(password);
    const usuario = await userService.createUser(email, encodedPassword);
    await personaService.createObject({
        nombre,
        apellido,
        ciudad,
        edad,
        fechaNacimiento,
        usuarioId: usuario.id
    });
    res.status(201).json({ message: "Usuario registrado exitosamente" });
};
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await userService.findUserByEmail(email);
    if (!usuario) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectas" });
    }
    const encodedPassword = sha1Encode(password);

    if (encodedPassword !== usuario.password) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectas" });
    }
    const token = generateToken({
        id: usuario.id,
    });
    res.status(200).json({ token });
}