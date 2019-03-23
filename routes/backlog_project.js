var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var backlog_projet = require('../models/backlog_projet');
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
        res.send(b)
        b.save()
    }
 
});
module.exports=router; 