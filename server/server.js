var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var herokuRoutes = require('./routes/heroku');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use('/heroku', herokuRoutes);

var server = app.listen(app.get('port'));
