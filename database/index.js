/**const express = require('express');
const port = 3000;
const cors = require('cors');
const fs = require('fs');
const pg = require('pg');

const app = express();

app.use(cors());
app.use(express.json())

async function setupApp() {
    const pgClient = new pg.Client({
        host: 'localhost',
        database: 'movietheater',
        password: '1234' ,
        user: 'postgres',
        port: 5432
    });
    await pgClient.connect();

    app.get('/movies', function(res) {
        res.set('Content-Type', 'application/json')
        pgClient.query('SELECT * FROM movies;').then((result) => {
            res.send(result.rows);
        })
    })

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}
**/
const port = 3001;
const express = require('express');
const fs = require('fs');
const pg = require('pg')
const cors = require('cors');

const app = express();
app.use(cors())

async function setupApp() {
    const pgClient = new pg.Client({
        host: 'localhost',
        database: 'movietheater',
        user: 'postgres',
        password: '1234' ,
        port: 5432
    });
    await pgClient.connect();

    app.get('/movies', (req, res) => {
        pgClient.query('SELECT * FROM movies;').then((data) => {
            return res.json(data)
        })
    })

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

setupApp();