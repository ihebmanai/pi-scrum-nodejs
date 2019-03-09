var mongoose = require('mongoose')
var discussion = require('./discussion')
var examen = require('./exam')
var userschema = mongoose.Schema({
    title:String,
    date:Date,
    note:float,
    exam:exam,
    discussion:discussion,
    sender:user,
})
var evaluation =mongoose.model('evaluation',userschema,'evaluation');
module.exports=evaluation;