/*
  users.js
  Michael Courneya
  301106259
  10/25/2020
*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
