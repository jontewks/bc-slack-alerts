var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
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
    username: 'DoomGuy',
    icon_emoji: ':godmode:',
    attachments: [{
      fallback: 'Alert',
      color: 'danger',
      text: '<!channel>',
      fields: [{
        title: 'Alert From',
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
