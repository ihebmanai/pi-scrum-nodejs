var mongoose = require('mongoose')
var projets = require('../models/project')

var userschema = mongoose.Schema({
    name:String,
    type:{enum:['JAVA','NODEJS']},
    delai:Date,
    project:projets






})
var sprint =mongoose.model('sprint',userschema,'sprint');
module.exports=sprint;