var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var json2xls = require('json2xls')
var project = require('../models/project');
var release = require('../models/releases');
var backlog_projet=require('../models/backlog_projet')
var user=require('../models/user');
var port=3001;
var  path = require('path');
var async=require("async")
const Nexmo = require('nexmo');
var app = express()


const nexmo = new Nexmo({
    apiKey: "9e005905",
    apiSecret: "rbSgmwmSxqu4Nh9o"
  });
  var jsonArr = [{
    "foo": 'bar',
    "qux": 'moo',
    "poo": 123,
    "stux": new Date()
},
{
    "foo": 'bar',
    "qux": 'moo',
    "poo": 345,
    "stux": new Date()
}];

app.use(json2xls.middleware);
var fs = require('fs');
router.get('/toExcel',function(req, res) {
    console.log("aaaaaa")
var file = fs.createWriteStream('file.csv', {'flags': 'w', autoClose: true});
var result = '';
for (var hashkey in jsonArr) {
    console.log("aaaaaa")
    result += hashkey + ';' + jsonArr[hashkey].foo + ';' + jsonArr[hashkey].qux + '\n';
    console.log(result)
}
    result += hashkey + ';' + jsonArr[hashkey].foo + ';' + jsonArr[hashkey].qux + '\n';
file.write(result); 
res.status(200).json("ok")
});
app.listen(port)
var nodeMailer = require('nodemailer');
    var bodyParser = require('body-parser');
    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

const safeJsonStringify = require('safe-json-stringify');
//get backlog project
router.get("/getBacklog/:id",(req,res)=>{
    backlog_projet.find({"project":req.params.id}, (err, p ) => {
        if(!p ){
            res.status(404).json('backlog not found!')
        }
       else{
        
            res.json(p)
     
       }
    })
})
//get all projects
router.get("/",(req, res) => {
        project.find({}, (err, projects) => {
            if(!projects)
            res.status(404).json('no projects found')
            res.json(projects)
        })  
    })
// get project releases
   router.get("/releases/:id",(req, res) => {
      
         project.findById(req.params.id, (err, project) => {
            if(!project)
                res.status(404).json('Project not found!')
                else{
                   
                    res.json(project.releases)
                } 
          /*(project.releases).forEach( function(element) {
               
                release.findById(element,(err, release ) => {
                      if(err)
                      console.log("errrreeeeeeu")
                      else{
                      if (release){
                          console.log(release)
                      r[i]=release
                      i++
                      }
                    }
                   
                  })    
               
        }) */ 
       
    })
})
//get project by id
router.get("/:id",(req,res)=>{
        project.findById(req.params.id, (err, project) => {
            if(!project){
                res.status(404).json('Project not found!')
            }
            res.json(project)
        })
    })
    //add project
router.post('/add/:idP', (req,res)=> {
    p  = new project ({
        projectName : req.body.projectName,
        description : req.body.description,
        startingDate : req.body.startingDate,
        endDate : req.body.endDate,
        status:req.body.status,
        description : req.body.description,
        productOwner : req.params.idP,
        scrumMaster: req.body.scrumMaster,
        releases:req.body.releases
    });
    if(p.scrumMaster===undefined)
    { 
        res.status(401).json('plz verify scrum master infos')
        return
    }
    else{
        var tel='';
        console.log("scrummm"+p.scrumMaster)
        user.findById(p.scrumMaster, (err, u) => {
            if(err)
            console.log(err)
            tel=u.telephone
        console.log("teeel"+tel)
           nexmo.message.sendSms(
           '21627749998',tel,'A new project has been added on SCRUM Manager Platform and you are the scrum master.', {type: 'unicode'},
            (err, responseData) => {if (responseData) {console.log(responseData)}}
          )
        })
        res.status(201).json(p)
        p.save()

        let transporter = nodeMailer.createTransport({ 
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'epionemedical711@gmail.com',
                pass: '22053202'
            }
        });
        let mailOptions = {
            from: 'epionemedical711@gmail.com', // sender address
            to: "oumayma.habouri@esprit.tn", // list of receivers
            subject: "New project ", // Subject line
            text: "", // plain text body
            html: '<b>New project has been added on SCRUM Platform</b>' // html body
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            });
        
            app.listen(port, function(){
              console.log('Server is running at port: ',port);
            });
        
    }
   
 
});
//update project
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
        if(req.body.projectName) roject.projectName = req.body.projectName
        if(req.body.description) project.description = req.body.description
        if(req.body.startingDate) project.startingDate = req.body.startingDate
        if(req.body.endDate) project.endDate = req.body.endDate
        if(req.body.scrumMaster) project.description = req.body.scrumMaster
        if(req.body.productOwner) project.description = req.body.productOwner
        project.save()
        res.status(200).json(project)
        
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
//delete project
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