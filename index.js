var express = require('express');
var app = express();
var request = require('request');

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send('You got it.');
});

app.post('/', function(req, res) {
  var alertMessage = 'Some alert message';
  var type = req.query.type;

  switch(type) {
    case 'boxerror':
      alertMessage = 'Box Error';
      break;
    case 'elevatedclientalerts':
      alertMessage = 'Elevated Client Alerts';
      break;
    case 'elevatedserveralerts':
      alertMessage = 'Elevated Server Alerts';
      break;
    case 'jobfailed':
      alertMessage = 'Job Failed';
      break;
    case 'memoryquotaexceeded':
      alertMessage = 'Memory Quota Exceeded';
      break;
    case 'requesttimeouts':
      alertMessage = 'Request Timeouts';
      break;
    case 'slowrequests':
      alertMessage = 'Slow Requests';
      break;
  }

  var payload = {
    channel: '#hackers',
    username: 'DustinChompyBot',
    icon_emoji: ':dustinchompy:',
    attachments: [{
      fallback: 'Alert',
      color: 'danger',
      title: '<!channel>: Alert',
      fields: [{
        title: 'From',
        value: 'Loggly',
        short: 'true'
      }, {
        title: 'Type',
        value: alertMessage,
        short: 'true'
      }]
    }]
  };
  
  request({
    url: process.env.URL,
    method: 'POST',
    body: JSON.stringify(payload)
  }, function() {
    res.sendStatus(201);
  });
});

var server = app.listen(app.get('port'));
