const db = require("../models");
const userService = {
    getById: async (id) => {
        return await db.usuario.findByPk(id, {
            include: ["persona"]
        });
    },
    findUserByEmail: async (email) => {
        return await db.usuario.scope('withPassword').findOne({
            where: {
                email
            }
        });
    },
    createUser: async (email, password) => {
        return await db.usuario.create({
            email,
            password: password

        });
    },
    updateObject: async (id, email) => {
        const user = await userService.getById(id);
        user.email = email;
        return await user.save();
    },
    deleteObject: async (id) => {
        const user = await userService.getById(id);
        return await user.destroy();
    }
};
module.exports = userService;