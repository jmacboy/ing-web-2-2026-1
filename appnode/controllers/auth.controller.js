module.exports = (app, db) => {

    app.get('/login', (req, res) => {
        res.render('auth/form-login');
    });
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const usuario = await db.usuario.findOne({
            where: {
                email
            }
        });
        if (!usuario) {
            return res.render('auth/form-login', { error: 'Usuario no encontrado' });
        }

    });

}