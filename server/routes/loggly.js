var express = require('express');
var router = express.Router();
var slackBot = require('slack-bot')(process.env.URL);

router.post('/', function(req, res) {
  // Cheap security
  if (req.query.secret !== process.env.SECRET) {
    res.sendStatus(404).end();
    return;
  }

  var alertMessage = req.query.alert || 'Some alert message';
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

  slackBot.send({
    channel: '#hackers',
    username: 'Loggly',
    icon_emoji: ':loggly:',
    attachments: [{
      fallback: 'Alert',
      color: 'danger',
      text: '<!channel>',
      fields: [{
        title: 'Type',
        value: alertMessage
      }]
    }]
  }, function() {
    res.sendStatus(201).end();
  });
});

module.exports = router;
