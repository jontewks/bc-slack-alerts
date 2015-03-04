var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('You got it.');
});

app.post('/', function(req, res) {
  console.log(req.body);
});

var server = app.listen(app.get('port'));
