var mongoose = require('mongoose')
var sprint = require('./sprint')
var userschema = mongoose.Schema({
    type:String,
    date:Date,
    users:user[any],
    scummaster:user,
})
var meetings =mongoose.model('meetings',userschema,'meetings');
module.exports=meetings;