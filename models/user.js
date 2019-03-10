var mongoose=require('mongoose');

var userSchema = mongoose.Schema({
firstName:{
    type: String,
  //  required: false
},
lastName:{
    type:String,
  //  required:false
},
username:{
    type:String,
  //  required:false
},
password:{
    type:String,
  //  required:false
},
email:{
    type:String,
    required:false,
    trim:true,
    minlength:1
},
role:{
    type:String,
    enum:['ScrumMaster','DevTeamMember','ProductOwner','HR'],
    required:false
},
telephone:{
    type:String
},
image:{
    type:String
}
});
var User=mongoose.model('User',userSchema,'User');
module.exports=User;