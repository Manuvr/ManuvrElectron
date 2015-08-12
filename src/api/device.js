'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  try {

    console.log('hit device api!');
    res.json({ message: 'api is up' });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
