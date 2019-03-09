var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('discussion respond with a resource');
  });
module.exports=router; 

