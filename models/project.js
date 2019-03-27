var mongoose=require('mongoose');
var User=require('./user');
var release=require('./releases');
var Schema=mongoose.Schema;
var userSchema = mongoose.Schema({
    projectName:{
        type:String
    },
    key:{
        type:String
    },
    startingDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    description:{
        type:String
    },
    productOwner:{type:Schema.Types.ObjectId,ref:'User'},
    scrumMaster:{type:Schema.Types.ObjectId,ref:'User'},
    devTeam:[
        {type:Schema.Types.ObjectId,ref:'User'}
    ],
    releases:[release]
});

var Project=mongoose.model('Project',userSchema,"project");
module.exports=Project;