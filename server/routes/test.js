var express = require('express');
var router = express.Router();
var slackBot = require('slack-bot')(process.env.URL);

router.post('/', function(req, res) {
  slackBot.send({
    channel: '@jon',
    username: 'Test',
    text: 'Sup'
  }, function() {
    console.log(arguments);
    res.sendStatus(201).end();
  });
});

module.exports = router;
