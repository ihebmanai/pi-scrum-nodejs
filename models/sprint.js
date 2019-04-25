var mongoose = require('mongoose')
var userschema = mongoose.Schema({
    name:String,
    type:{enum:['JAVA','NODEJS']},
    delai:Date,






})
var sprint =mongoose.model('sprint',userschema,sprint);
module.exports=sprint;