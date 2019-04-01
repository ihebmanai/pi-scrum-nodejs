var mongoose=require('mongoose');
var User=require('./user');
var userstory=require('./project_userstories')
var Schema=mongoose.Schema;
var issueSchema = mongoose.Schema({
    title:{
        type:String
    },
    createdDate:{
        type:Date
    },
    solvedDate:{
        type:Date
    },
    description:{
        type:String
    },
    priority:{
        type:Number
    },
    status:
    {   type:String,
        enum:['solved','in progress','not solved']},

    userstory:{type:Schema.Types.ObjectId,ref:'userstory'},
    createdBy:{type:Schema.Types.ObjectId,ref:'User'},
    technology:{
        type:String
    }
});

var Issue=mongoose.model('issue',issueSchema,"issue");
module.exports=Issue;