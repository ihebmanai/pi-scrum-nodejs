var mongoose = require('mongoose')
var userschema = mongoose.Schema({
    tilte:String,
    startDate:Date,
})
var discussion =mongoose.model('discussion',userschema,'discussion');
module.exports=discussion;