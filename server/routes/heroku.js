var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
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

    var payload = {
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
          title: 'Development',
          value: result.status.Development === 'green' ? 'Operational' : 'Experiencing issues',
          short: 'true'
        }, {
          title: 'Issues',
          value: result.issues.length ? issues : 'No issues'
        }]
      }]
    };
    
    request({
      url: process.env.URL,
      method: 'POST',
      body: JSON.stringify(payload)
    }, function() {
      res.sendStatus(200).end();
    });
  });
});

module.exports = router;
