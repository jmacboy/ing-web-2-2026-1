const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const db = require('./models');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!')

})
app.get('/hello', (req, res) => {
    res.sendFile(__dirname + '/hello.html')
})

app.get('/hello-ejs', (req, res) => {
    res.render('prueba-ejs', { name: 'Juan', lastName: 'Perez' });
});
app.get('/form', (req, res) => {
    res.render('form-ejemplo');
});
app.post('/form-submit', (req, res) => {
    const { name, lastName } = req.body;
    res.render('prueba-ejs', { name, lastName });
});
app.get('/personas', async (req, res) => {
    const personas = await db.persona.findAll();
    res.render('personas/list-persona', { personas });
});
app.get('/personas/create', (req, res) => {
    res.render('personas/form-persona', { persona: null });
});
app.post('/personas/create', async (req, res) => {
    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
    const persona = await db.persona.create({
        nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento
    });
    res.redirect('/personas');
});
app.get('/personas/:id', async (req, res) => {
    const { id } = req.params;
    const persona = await db.persona.findByPk(id);
    res.render('personas/form-persona', { persona });
});
app.post('/personas/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
    const persona = await db.persona.findByPk(id);
    persona.nombre = nombre;
    persona.apellido = apellido;
    persona.edad = edad;
    persona.ciudad = ciudad;
    persona.fechaNacimiento = fechaNacimiento;
    await persona.save();
    res.redirect('/personas');
});
app.post('/personas/:id/delete', async (req, res) => {
    const { id } = req.params;
    const persona = await db.persona.findByPk(id);
    await persona.destroy();
    res.redirect('/personas');
});

// Para habilitar la BD
db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
