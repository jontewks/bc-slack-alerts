var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/', function(req, res) {
  if (req.query.secret !== process.env.SECRET) {
    res.sendStatus(404).end();
  } else if (req.body.build.status !== 'testing' && req.body.build.status !== 'success') {
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
          value: 'CodeShip',
          short: 'true'
        }, {
          title: 'Build Failed',
          value: '<' + req.body.build.build_url + '|' + req.body.build.message + '>',
          short: 'true'
        }, {
          title: 'Shame upon',
          value: '<' + req.body.build.commit_url + '|' + req.body.build.committer + '>',
          short: 'true'
        }]
      }]
    };
    
    request({
      url: process.env.URL,
      method: 'POST',
      body: JSON.stringify(payload)
    }, function() {
      res.end();
    });
  } else {
    res.end();
  }
});

module.exports = router;
