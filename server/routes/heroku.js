var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
  request({
    url: 'https://status.heroku.com/api/v3/current-status',
    method: 'GET'
  }, function(error, response, body) {
    console.log(body); // {"status":{"Production":"green","Development":"green"},"issues":[]}
    res.sendStatus(200).end();
  });
});

module.exports = router;
