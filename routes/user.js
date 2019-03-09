var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user');


router.get('/login', (req,res)=> {
    
    user.insertMany({firstName:"regregerg"});
    console.log("hnhgn");
   /* let query = {"_id":req.params.id};
    user.findById(query,(err,data)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.render('index.twig',{data:data});
        }
    })*/
});
module.exports = router;