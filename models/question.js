var mongoose = require('mongoose')
var userschema = mongoose.Schema({
    contenu:String,
    note:Number,
    type:String,

})
var question =mongoose.model('question',userschema,'question');
module.exports=evaluation;