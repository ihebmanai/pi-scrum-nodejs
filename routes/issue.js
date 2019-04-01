var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var project = require('../models/project');
var backlog_projet=require('../models/backlog_projet')
var MyModel = require('../models/issue')
// Will just hang until mongoose successfully connects
router.get("/count",(req, res) => {
    MyModel.collection.count({}, function(error, numOfDocs){
        if(error)  console.log(error);
        console.log("couuunt"+numOfDocs)
        
    });
   
})

module.exports = router;