/**
 * Created by matthew on 26/12/2017.
 */
const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();

const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.url, (err, database) => {

    if (err) return console.log(err)
    var myDB=database.db('crookac')
    require('./app/routes')(app, myDB);
    var myDB=database.db('crookac')
    app.listen(PORT, () => {
        console.log('We are live on port ' + PORT);
    });
})