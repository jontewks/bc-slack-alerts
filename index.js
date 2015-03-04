var express = require('express');
var app = express();
var request = require('request');

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send('You got it.');
});

app.post('/', function(req, res) {
  var payload = {
    channel: '#hackers',
    username: 'Doom Guy',
    text: 'Alert from Loggly: something something something',
    icon_emoji: ':godmode:'
  };
  
  var type = req.query.type;

  switch(type) {
    case 'boxerror':
      payload.text = '@channel Alert from Loggly: Box Error';
      break;
    case 'elevatedclientalerts':
      payload.text = '@channel Alert from Loggly: Elevated Client Alerts';
      break;
    case 'elevatedserveralerts':
      payload.text = '@channel Alert from Loggly: Elevated Server Alerts';
      break;
    case 'jobfailed':
      payload.text = '@channel Alert from Loggly: Job Failed';
      break;
    case 'memoryquotaexceeded':
      payload.text = '@channel Alert from Loggly: Memory Quota Exceeded';
      break;
    case 'requesttimeouts':
      payload.text = '@channel Alert from Loggly: Request Timeouts';
      break;
    case 'slowrequests':
      payload.text = '@channel Alert from Loggly: Slow Requests';
      break;
  }

  request({
    url: process.env.URL,
    method: 'POST',
    body: JSON.stringify(payload)
  }, function() {
    res.sendStatus(201);
  });
});

var server = app.listen(app.get('port'));
