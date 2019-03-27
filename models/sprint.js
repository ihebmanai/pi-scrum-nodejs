var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var project = require('../models/project');
var Schema=mongoose.Schema;
var userschema = mongoose.Schema({
    name:String,
    type:{enum:['JAVA','NODEJS']},
    delai:Date,
    project:{type:Schema.Types.ObjectId,ref:'project'}


})
var sprint =mongoose.model('sprint',userschema,sprint);
module.exports=sprint;