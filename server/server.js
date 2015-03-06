var express = require('express');
var app = express();
var logglyRoutes = require('./routes/loggly');
var codeshipRoutes = require('./routes/codeship');

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send('You got it.');
});

app.use('/loggly', logglyRoutes);
app.use('/codeship', codeshipRoutes);

var server = app.listen(app.get('port'));
