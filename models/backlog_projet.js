var mongoose = require('mongoose')
var project=require('./project')
var userschema = mongoose.Schema({
userstories: [  
     {type:Schema.Types.ObjectId,ref:'project_userstories'}
    ],
project:project,

});
var backlog_projet =mongoose.model('backlog_projet',userschema,'backlog_projet');
module.exports=backlog_projet;