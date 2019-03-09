var mongoose = require('mongoose')
var sprint = require('./sprint')
var user=require('./user')
var userschema = mongoose.Schema({
taskname:String,
descritpion:String,
estimation:Number,
complexité:String,
state:String,
devoloper:user,
sprint:sprint

});
var backlog_sprint =mongoose.model('backlog_sprint',userschema,'backlog_sprint');
module.exports=backlog_sprint;