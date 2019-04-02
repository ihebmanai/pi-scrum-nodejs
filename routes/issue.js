var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var project = require('../models/project');
var backlog_projet=require('../models/backlog_projet')
var issue = require('../models/issue')
//********get number not solved issue by project*****

  /* ******* not solved project ****** 
  router.get("/notsolved/:idP",(req, res) => {
    issue.countDocuments({status:"not solved","project":req.params.idP},(error, numOfDocs)=>{
        
        if(error)  
            console.log(error)

 
     console.log(numOfDocs)
       
    });
}) */
router.get("/maxIssues",(req, res) => {
    var date=req.query.createdDate+"T00:00:00.0Z"
    issue.aggregate(
        [
            {$match: {createdDate: {$gte: new Date(date)}}
            },
            {"$group" : 
        {_id:{createdBy:"$createdBy"}, 
        
         count:{$sum:1}}
	}, 
	{$sort:{"count":-1}}
        ],function(err, result) {
           
            res.json(result);
})


})
/* get the average solved time */
router.get("/avgSolvedTime",(req, res) => {
    issue.aggregate(
        [
            [{ $match :
                { status : "solved" } 
                },
                {
                  $group:
                    {
                      _id: null,
                      avgSolvedTime: { $avg: {$divide : [{$subtract: ["$solvedDate","$createdDate"]},86400000]}}
                  }
                }
              ]
        ],function(err, result) {
            /* divide the result by 1000 *60 *60 *24 */
            res.json(result);
})


})
    /*****************Get % of solved/not solved issues created on specific date**** */
router.get("/date",(req, res) => {

    var s="not solved"
   if (req.query.status=="solved" )
    s="solved"

   if (req.query.createdDate){
        issue.countDocuments({createdDate:{'$gte':req.query.createdDate},status:s},(error, numOfDocs)=>{    
            if(error)  
                console.log(error)
                issue.countDocuments({createdDate:{'$gte':req.query.createdDate}},(error, allIssues)=>{    
                    if(error)  
                        console.log(error)
                        res.json(numOfDocs*100/allIssues)
                }) 
   
          }) 
    } 
    else
    res.json("please enter a date")

})
    
 /*****************Get number of issues of  **** */
router.get("/",(req, res) => {
    /*****************Get issues of userstories **** */
    if (req.query.idU && req.query.idP==undefined && req.query.release==undefined){
        issue.countDocuments({userstory:req.query.idU,status:req.query.status},(error, numOfDocs)=>{    
            if(error)  
                console.log(error)
                res.json(numOfDocs)
        
        })
    }
    /*****************Get issues of project **** */
    else if (req.query.idP && req.query.idU==undefined && req.query.release==undefined){
        issue.countDocuments({project:req.query.idP,status:req.query.status},(error, numOfDocs)=>{    
            if(error)  
                console.log(error)
        res.json(numOfDocs)
        
        })
    }
    /*****************Get issues of release **** */
    else if (req.query.idR && req.query.idU==undefined && req.query.idP==undefined){
    issue.countDocuments({release:req.query.idR,status:req.query.status},(error, numOfDocs)=>{    
        if(error)  
            console.log(error)
            res.json(numOfDocs)
    
    }) }
    /*****************Get issues by status **** */
    else {
        issue.countDocuments({status:req.query.status},(error, numOfDocs)=>{    
            if(error)  
                console.log(error)
                res.json(numOfDocs)
        
        })
    }
})
//********get number solved issue by project********

//********get issue by id*****
router.get("/:id",(req,res)=>{
    issue.findById(req.params.id, (err, issue) => {
        if(!issue){
            res.status(404).json('issue not found!')
        }
        res.status(200).json(issue)
    })
})
router.get("/release/:id",(req,res)=>{
    issue.find({"release":req.params.id}, (err, issues) => {
        if(!issues){
            res.status(404).json('this release doesn"t have issues')
        }
        res.status(200).json(issues)
    })
})
router.get("/project/:id",(req,res)=>{
    issue.find({"project":req.params.id}, (err, issues) => {
        if(!issues){
            res.status(404).json('this project doesn"t have issues')
        }
        res.status(200).json(issues)
    })
})
router.post('/add/:id', (req,res)=> {
    i  = new issue ({
        title : req.body.title,
        type:req.body.type,
        createdDate : req.body.createdDate,
        solvedDate : req.body.solvedDate,
        description : req.body.description,
        priority : req.body.priority,
        status: req.body.status,
        createdBy:req.params.id,
        userstory:req.body.userstory,
        release:req.body.release,
        project:req.body.project
    }) 
           i.save()
           res.status(200).json(i)
        })
module.exports = router;