var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var logglyRoutes = require('./routes/loggly');
var codeshipRoutes = require('./routes/codeship');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use('/loggly', logglyRoutes);
app.use('/codeship', codeshipRoutes);

app.get('/', function(req, res) {
  res.send('You got it.');
});


var server = app.listen(app.get('port'));
