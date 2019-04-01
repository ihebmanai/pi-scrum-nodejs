var express = require('express');
var router = express.Router();
var project=require('../models/project')
var mongoose = require('mongoose')
var backlog_projet = require('../models/backlog_projet');
var project_userstories=require('../models/project_userstories')

router.get("/getProject/:id",(req,res)=>{
    backlog_projet.findById(req.params.id, (err, backlog_projet ) => {
        if(!backlog_projet ){
            res.status(404).json('backlog not found!')
        }
       else{
        project.findById(backlog_projet.project, (err, project ) => {
            if(!project ){
                res.status(404).json('project not found!')
            }
            res.json(project)
        })
       }
    })
})
router.get("/userstories/:id",(req,res)=>{
    backlog_projet.findById(req.params.id, (err, backlog_projet ) => {
        if(!backlog_projet ){
            res.status(404).json('backlog not found!')
        }
        res.json(backlog_projet.userstories)
    })
})
router.post('/addBacklog/:project', (req,res)=> {
    b  = new  backlog_projet ({
        project : req.params.project,
        userstories : req.body.userstories
    });
    if(b.project===undefined)
    { 
        res.status(401).json('plz verify ')
        return
    }
    else{
        
        (b.userstories).forEach(element => {
            u =new project_userstories({
                userStory: element.userStory,
                priority: element.priority,
                timeestimation:element.timeestimation,
                backlog_projet:b.id
            })
            console.log("uuu"+u+"iiid"+b.id)
            u.save()
        });
        res.send(b)
        b.save()
    }
 
});
module.exports=router; 