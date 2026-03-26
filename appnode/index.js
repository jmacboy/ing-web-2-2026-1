const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const db = require('./models');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers')(app, db);

// Para habilitar la BD
db.sequelize.sync({
    // force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
