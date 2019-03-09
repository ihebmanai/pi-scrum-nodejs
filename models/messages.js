var mongoose = require('mongoose')
var discussion = require('./discussion')
var userschema = mongoose.Schema({
    contenu:String,
    date:Date,
    discussion:discussion,
    sender:user,
})
var messages =mongoose.model('messages',userschema,'messages');
module.exports=messages;