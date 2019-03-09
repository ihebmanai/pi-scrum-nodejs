var mongoose = require('mongoose')
var question = require('./question')
var user=require('./user')
var userschema = mongoose.Schema({
    contenu:String,
    valeur:boolean,
    question:question,
    user:user
})
var reponse =mongoose.model('question',userschema,'reponse');
module.exports=evaluation;