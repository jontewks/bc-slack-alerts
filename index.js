var express = require('express');
var app = express();
var request = require('request');

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send('You got it.');
});

app.post('/', function(req, res) {
  var payload = {
    channel: "#hackers",
    username: "Doom Guy",
    text: "Test Post",
    icon_emoji: ":godmode:"
  };
  
  var type = req.query.type;

  switch(type) {
    case 'boxerror':
      payload.text = 'Box Error';
      break;
    case 'elevatedclientalerts':
      payload.text = 'Elevated Client Alerts';
      break;
    case 'elevatedserveralerts':
      payload.text = 'Elevated Server Alerts';
      break;
    case 'jobfailed':
      payload.text = 'Job Failed';
      break;
    case 'memoryquotaexceeded':
      payload.text = 'Memory Quota Exceeded';
      break;
    case 'requesttimeouts':
      payload.text = 'Request Timeouts';
      break;
    case 'slowrequests':
      payload.text = 'Slow Requests';
      break;
    default:
      break;
  }

  request({
    url: process.env.WEBSITE,
    method: 'POST',
    body: JSON.stringify(payload)
  }, function() {
    res.sendStatus(201);
  });
});

var server = app.listen(app.get('port'));
