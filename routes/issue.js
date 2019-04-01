var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var project = require('../models/project');
var backlog_projet=require('../models/backlog_projet')
var MyModel = mongoose.model('issue');
// Will just hang until mongoose successfully connects
router.get("/",(req, res) => {
    MyModel.collection.count({}, function(error, numOfDocs){
        if(error) return callback(error);

        callback(null, numOfDocs);
    });
    console.log(numOfDocs)
})

module.exports = router;