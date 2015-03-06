var express = require('express');
var app = express();
var request = require('request');
var logglyRoutes = require('./routes/loggly');

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send('You got it.');
});

app.use('/loggly', logglyRoutes);

var server = app.listen(app.get('port'));
