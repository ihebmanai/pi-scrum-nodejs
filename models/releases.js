var mongoose = require('mongoose')
var project=require('./project')
var sprint=require('./sprint')
var Schema=mongoose.Schema;
var userStory = mongoose.Schema({
    userStory:String,
    priority:Number,
    timeestimation:Number
    });
var releaseschema = mongoose.Schema({
goals:{
    type:String
},
status:{
    type:String,
    enum:['unstarted','inProgress','released','unreleased'],
},
startingDate:{
    type:Date
},
releaseDate:{
    type:Date
},
numberSprint:{
    type:Number
},
userstories: [userStory],
sprints:[ {type:Schema.Types.ObjectId,ref:'sprint'}],
project:{type:Schema.Types.ObjectId,ref:'project'}
});
var release =mongoose.model('release',releaseschema,'release');
module.exports=release;