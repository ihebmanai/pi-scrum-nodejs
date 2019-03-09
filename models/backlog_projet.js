var mongoose = require('mongoose')
var project=require('./project')
var userschema = mongoose.Schema({
task:String,
descritpion:String,
complexite:Number,
timeestimation:Number,
project:project,




});
var backlog_projet =mongoose.model('backlog_projet',userschema,'backlog_projet');
module.exports=backlog_projet;