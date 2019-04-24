var mongoose = require('mongoose')
var User = require('./user')
var Schema=mongoose.Schema;
var userschema = mongoose.Schema({
    title:String,
    type:String,
    date:Date,
    startDate : String,
    duree : Number,
    feedback : String,
    scrumMaster:{type:Schema.Types.ObjectId,ref:'User'},
    devTeam:[
        {type:Schema.Types.ObjectId,ref:'User'}
    ]
})
var meetings =mongoose.model('meetings',userschema,'meetings');
module.exports=meetings;