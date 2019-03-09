var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var project = require('../models/project');


router.get('/add', (req,res)=> {
    
    project.insertMany({projectName:"regregerg",scrumMaster:"5c7fc059cf7f4c364c9a306e"});
    console.log("project");
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