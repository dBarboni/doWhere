// dependencies
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
var db               = require('./config/db');

const app            = express();

//Init server
const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)

  db = database.db("dowhere")
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('Server running on port ' + port + '.');
  });
})
