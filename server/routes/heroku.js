var express = require('express');
var router = express.Router();
var request = require('request');
var slackBot = require('slack-bot')(process.env.URL);

router.get('/', function(req, res) {
  if (req.query.secret !== process.env.SECRET) {
    res.sendStatus(404).end();
  } else {
    request({
      url: 'https://status.heroku.com/api/v3/current-status',
      method: 'GET'
    }, function(error, response, body) {
      var result = JSON.parse(body);
      var color;

      if (result.status.Production === 'green' && result.status.Development === 'green') {
        color = 'good';
      } else {
        color = 'danger';
      }

      slackBot.send({
        channel: '#hackers',
        username: 'Heroku',
        icon_emoji: ':heroku:',
        attachments: [{
          fallback: 'Heroku Status',
          color: color,
          title: 'Heroku Status',
          title_link: 'https://status.heroku.com/',
          fields: [{
            title: 'Production',
            value: result.status.Production === 'green' ? 'Operational' : 'Experiencing issues',
            short: 'true'
          }, {
            title: 'Issues',
            value: result.issues.length ? issues : 'No issues',
            short: 'true'
          }, {
            title: 'Development',
            value: result.status.Development === 'green' ? 'Operational' : 'Experiencing issues',
            short: 'true'
          }]
        }]
      }, function() {
        res.end();
      });
    });
  }
});

module.exports = router;
