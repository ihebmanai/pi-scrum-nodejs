var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user');
var jwt = require('jsonwebtoken')
const cors = require('cors')
var app = express()
app.use(function(req, res, next) {
    console.log('options');
    res.header("Access-Control-Allow-Origin", "*");
    next(); 
  });
  router.get("/:idU",(req,res)=>{
    user.findById(req.params.idU, (err, user) => {
        if(!user){
            res.status(404).json('User not found!')
        }
        res.status(200).json(user)
    })
})
router.get("/",(req, res) => {
    user.find({}, (err, users) => {
        if(!users)
        res.status(404).json('no projects found')
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json(users)
    })  
})
router.post('/login', (req,res)=> {
    
  //  user.insertMany({firstName:"ddddd"});
    //console.log("hnhgn");

    let query = {"email":req.body.email};
    console.log(req.body.email)
    console.log(req.body.password)
    user.findOne(query,(err,user)=>{
       if(err){
            res.send(err);
        if(!user)
            res.status(401).json(user)
            console.log(user)
        }else{
            if(bcrypt.compareSync(req.body.password,user.password))
                {
                    console.log('user found',user)
                    var token = jwt.sign({email:user.email},'s3cr3t',{expiresIn:3600})
                    console.log('token'+token)
                    res.status(200).json({success:true,token:token})
                }
                else{
                    res.status(401).json('Unauthorised')
                }
                
               //console.log(user)
             }
                    
            })

   // console.log('password'+req.body.password)
   
});

router.post('/register',function(req,res){
     u  = new user ({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        password : bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)),
        email : req.body.email
    });
    u.save(function(err,user){
        if (err) 
            res.send(err)
        else 
            res.send(user)
    }) 
    console.log(u)
    //console.log(email)
})



module.exports = router