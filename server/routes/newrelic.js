var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
  res.sendStatus(200).end();
});

router.post('/', function(req, res) {

  console.log(req.body);
  // if (req.query.secret !== process.env.SECRET) {
  //   res.sendStatus(404).end();
  // } else if (req.body.build.status !== 'testing' && req.body.build.status !== 'success') {
  //   var payload = {
  //     channel: '#hackers',
  //     username: 'Codeship',
  //     icon_emoji: ':codeship:',
  //     attachments: [{
  //       fallback: 'Alert',
  //       color: 'danger',
  //       title: 'Build Failed',
  //       title_link: req.body.build.build_url,
  //       fields: [{
  //         title: 'Branch',
  //         value: req.body.build.branch,
  //         short: 'true'
  //       }, {
  //         title: 'Shame upon',
  //         value: '<' + req.body.build.commit_url + '|' + req.body.build.committer + '>',
  //         short: 'true'
  //       }]
  //     }]
  //   };
    
  //   request({
  //     url: process.env.URL,
  //     method: 'POST',
  //     body: JSON.stringify(payload)
  //   }, function() {
  //     res.sendStatus(201).end();
  //   });
  // } else {
  //   res.sendStatus(201).end();
  // }
});

module.exports = router;
