var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var project = require('../models/project');
var user=require('../models/user');
const safeJsonStringify = require('safe-json-stringify');
router.get("/",(req, res) => {
        project.find({}, (err, projects) => {
            if(!projects)
            res.status(404).json('no projects found')
            res.json(projects)
        })  
    })
  
router.get("/:id",(req,res)=>{
        project.findById(req.params.id, (err, project) => {
            if(!project){
                res.status(404).json('Project not found!')
            }
            res.json(project)
        })
    })
router.post('/add', (req,res)=> {
    p  = new project ({
        projectName : req.body.projectName,
        description : req.body.description,
        startingDate : req.body.startingDate,
        endDate : req.body.endDate,
        description : req.body.description,
        productOwner : req.params.productOwner,
        scrumMaster: req.body.scrumMaster
    });
    if(p.scrumMaster===undefined)
    { 
        res.status(401).json('plz verify scrum master infos')
        return
    }
    else{
        res.send(p)
        p.save()
    }
    console.log("scrum "+p.devTeam)
 
});
router.put("/update/:id",(req,res) => {
    project.findById(req.params.id, (err, project) => {
        if(!req.body.content) {
            return res.status(400).send({
                message: "project content can not be empty"
            });
        }
        if(err){
            console.log(err);
            return;
        }
        else{
        project.projectName = req.body.projectName,
        project.description = req.body.description,
        project.startingDate = req.body.startingDate,
        project.endDate = req.body.endDate,
        project.description = req.body.description,
        project.scrumMaster=req.body.scrumMaster
        project.save()
        res.json(project)
        res.status(200).json('project updated')
        
    }
    }) 
})
router.update =('/update/:projectId',(req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "project content can not be empty"
        });
    }

    // Find note and update it with the request body
    project.findByIdAndUpdate(req.params.projectId, {
        projectName : req.body.projectName,
        description : req.body.description,
        startingDate : req.body.startingDate,
        endDate : req.body.endDate,
        description : req.body.description,
        scrumMaster: req.body.scrumMaster
    }, {new: true})
    .then(project => {
        if(!project) {
         
            return res.status(404).send({
              
                message: "project not found with id " + req.params.projectId
            });
        }
        res.send(project);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
              console.log("not found")
            return res.status(404).send({
                message: "project not found with id " + req.params.projectId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.projectId
        });
    });
});
router.delete('/delete/:id',(req,res)=>{
    let query= {"_id":req.params.id};
    project.remove(query,(err)=>{
        if(err){
            console.log(err);
            return;
        }
        else{
            res.status(200).json('project deleted')
            return;
        }
    });
});
module.exports = router;