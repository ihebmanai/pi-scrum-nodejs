var mongoose = require('mongoose')
var question = require('./question')
var reponse = require('./reponse')
var user=require('./user')
var userschema = mongoose.Schema({
    title:String,
    date:Date,
    question:question,
    reponse:response,
    user:user
})
var question =mongoose.model('question',userschema,'question');
module.exports=evaluation;