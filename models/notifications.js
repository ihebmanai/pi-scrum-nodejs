var mongoose = require('mongoose')
var sprint = require('./sprint')
var userschema = mongoose.Schema({
    type:String,
    date:Date,
    contenu:String,
    users:user[any],
})
var notifications =mongoose.model('notifications',userschema,'notifications');
module.exports=notifications;