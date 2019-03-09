var mongoose = require('mongoose')
var userschema = mongoose.Schema({
    name:String,
    type:{enum:['JAVA','NODEJS']},
    delai:Date,
    project:project






})
var sprint =mongoose.model('sprint',userschema,sprint);
module.exports=sprint;