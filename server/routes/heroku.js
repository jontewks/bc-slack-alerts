var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
  request({
    url: 'https://status.heroku.com/api/v3/current-status',
    method: 'GET'
  }, function(err, res, body) {
    console.log(body);
    res.sendStatus(200).end();
  });
});

module.exports = router;
