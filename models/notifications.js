var mongoose = require('mongoose')
var user = require('./user')
var Schema=mongoose.Schema;
var userschema = mongoose.Schema({
    title:String,
    date:Date,
    content:String,
    createdBy:{type:Schema.Types.ObjectId,ref:'user'},
    to:[ {type:Schema.Types.ObjectId,ref:'user'}]
})
var notifications =mongoose.model('notifications',userschema,'notifications')

module.exports=notifications

