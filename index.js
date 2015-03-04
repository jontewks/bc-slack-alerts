var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000))

app.post('/', function(req, res) {
  console.log(req);
});

var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
  console.log('Example app listening at http://:%s', port);
});
