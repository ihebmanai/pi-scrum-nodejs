var express = require('express');
var router = express.Router();
var evaluationTeck = require('../models/evaluationTeck')
var examen = require('../models/exam')
var user = require('../models/user')
var cron = require('node-cron');
var nodemailer = require('nodemailer');
var _ = require('lodash');



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'dhiabsdl94@gmail.com',
         pass: 'D58059894'
     }
 });





 


cron.schedule('* * * * *', () => {
  console.log('running a task evaluation every minute');
  let list= [] 
  let ListEvA = []
  let ListEvB = []
  let ListEvC = []
  let ListUserA = [] 
  let ListUserB = [] 
  let ListUserC = []
  var exam ; 
  evaluationTeck.find({},
    
    function (err, ev) {
      if (err) return res.status(404).send("no evaluation reck found")
     else {
       ev.forEach(element => {
         if(element.note<=13 && element.note>11 && element.verfied==false)
         {
          ListEvA.push(element)
         }
         else if(element.note<11 && element.note>8 && element.verfied==false )
         {
          ListEvB.push(element)
         }
         else if(element.note<8 && element.verfied==false){
          ListEvC.push(element)
         }
       
       });
     //  console.log("ListEvA")
      // console.log(ListEvA)

      
//send mail code 
     
      


      ListEvA.forEach(element => {
        
        // fonction du mail pour envoyer l'examen du type A
        user.findById(element.user,
    
          function (err, user) {
            //if (err) return res.send(err)
            ListUserA.push(user);
           // console.log(' element user')
            //console.log(element.user)
            console.log('listUser qui doivent passer lexamen A')
            console.log(ListUserA)

            ListEvA.forEach(element => {
              if(element.verfied==false){
              let query = {"type":element.type,"niveau" : "A"};
              console.log("******************************** examen A")
            // console.log(element.type)
              examen.findOne(query,
    
              function (err, reponses) {
                  exam = reponses
                  
                 console.log(exam)
                 // ici on doit point sur le tableau dev au lieu 

                 // envoyer le lien de l'examen 
    /*          const mailOptions = {
                  from: 'dhiabsdl94@gmail.com', // sender address
                  to: 'dhiaeddine.boussandel@esprit.tn', // list of receivers
                  subject: 'Subject of your email', // Subject line
                  html: '<a href="https://9.109.124.229:9100/"> Click here to begin yourr exam </a>'// plain text body
                };

                 transporter.sendMail(mailOptions, function (err, info) {
                  if(err)
                    console.log(err)
                  else
                    console.log(info);
               });
               */
               

               // now update the database make true = verified

             

            });
            
          console.log('id'+element._id)
          evaluationTeck.findByIdAndUpdate(element._id, {$set: {verfied : true}},
            
            function (err, meetings) {
              //if (err) return res.send(err)
             // res.send('cron evaluation udpated.');
             console.log('cron update ecaluation of type A')
           //  console.log(ListEvC);
          });
          }


            
            });

            ///l'examen au mail pour ceux get exam with type et niveau 
            //mise a jour verified 


        });

        

        // get the exam 
      });

      ListEvB.forEach(element => {
        // fonction du mail pour envoyer l'examen du type A
        user.findById(element.user,
    
          function (err, user) {
            //if (err) return res.send(err)
            ListUserB.push(user);
           // console.log(' element user')
            //console.log(element.user)
            console.log('listUser qui doivent passer lexamen B')
            console.log(ListUserB)
            ListEvB.forEach(element => {
              if(element.verfied==false){
              let query = {"type":element.type,"niveau" : "B"};
              console.log("******************************** examen b")
            // console.log(element.type)
              examen.findOne(query,
    
              function (err, reponses) {
                  exam = reponses
                  
                 console.log(exam)
                 // ici on doit point sur le tableau dev au lieu 

                 // envoyer le lien de l'examen 
        /*        const mailOptions = {
                  from: 'dhiabsdl94@gmail.com', // sender address
                  to: 'dhiaeddine.boussandel@esprit.tn', // list of receivers
                  subject: 'Subject of your email', // Subject line
                  html: '<a href="https://9.109.124.229:9100/"> Click here to begin yourr exam </a>'// plain text body
                };

                 transporter.sendMail(mailOptions, function (err, info) {
                  if(err)
                    console.log(err)
                  else
                    console.log(info);
               });
               */

               // now update the database make true = verified

             

            });
            
          console.log('id'+element._id)
          evaluationTeck.findByIdAndUpdate(element._id, {$set: {verfied : true}},
            
            function (err, meetings) {
              //if (err) return res.send(err)
             // res.send('cron evaluation udpated.');
             console.log('cron update ecaluation of type b')
           //  console.log(ListEvC);
          });
          }


            
            });

            
        });

        

        // get the exam 
      });


      ListEvC.forEach(element => {
        // fonction du mail pour envoyer l'examen du type A
        user.findById(element.user,
    
          function (err, user) {
            //if (err) return res.send(err)
            ListUserC.push(user);
           // console.log(' element user')
            //console.log(element.user)
            console.log('listUser qui doivent passer lexamen C')
            console.log(ListUserC)
            
            ListEvC.forEach(element => {
              if(element.verfied==false){
              let query = {"type":element.type,"niveau" : "C"};
              console.log("******************************** examen c")
            // console.log(element.type)
              examen.findOne(query,
    
              function (err, reponses) {
                  exam = reponses
                  
                 console.log(exam)
                 // ici on doit point sur le tableau dev au lieu 

                 // envoyer le lien de l'examen 
         /*       const mailOptions = {
                  from: 'dhiabsdl94@gmail.com', // sender address
                  to: 'dhiaeddine.boussandel@esprit.tn', // list of receivers
                  subject: 'Subject of your email', // Subject line
                  html: '<a href="http://localhost:3001/#/passerexam"> Click here to begin yourr exam </a>'// plain text body
                };

                 transporter.sendMail(mailOptions, function (err, info) {
                  if(err)
                    console.log(err)
                  else
                    console.log(info);
               });
               */

               // now update the database make true = verified

             

            });
            
          console.log('id'+element._id)
          evaluationTeck.findByIdAndUpdate(element._id, {$set: {verfied : true}},
            
            function (err, meetings) {
              //if (err) return res.send(err)
             // res.send('cron evaluation udpated.');
             console.log('cron update ecaluation of type c')
           //  console.log(ListEvC);
          });
          }


            
            });
          

        });

        

        // get the exam 
      });

     
    
  /*    console.log('listUser B')
      console.log(ListUserB)
      console.log('listUser A')
      console.log(ListUserA)
      console.log('listUser C')
      console.log(ListUserC)
      */
    //send mail email 
   /*   
   transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
     */

   

       
     }
    });

});

cron.schedule('0 9 * * *', () => {
  console.log('running a task every day at 09 am ');

evaluationTeck.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         console.log(data)
      })
      .catch((err)=> {
          console.log('erreur');
      })
});




/* GET eva listing. */
router.get('/', function(req, res, next) {
  //var users = null ; 
  evaluationTeck.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
          res.json(data)
      })
      .catch((err)=> {
          console.log('erreur');
      })
      
  });

  router.post('/add',function(req,res){

    var now = new Date()
    m  = new evaluationTeck({
      title : req.body.title,
      type : req.body.type,
      date : now,
      verfied : false,
      note:req.body.note,
      examen : req.body.examen,
      user : req.body.user
   });
   m.save(function(err,evaluationTeck){
       if (err) 
           res.send(err)
       else 
           res.send(evaluationTeck)
   }) 
   console.log(m)
 
})

  router.get('/user',function(req,res){
    let idUser = req.query.iduser 
    console.log(idUser)
    evaluationTeck.find({user:idUser},
    
      function (err, reponses) {
        if (err) return res.status(404).send("no evaluation reck found")
       else res.send(reponses);
    });
  
  })

// calculer score et sum d'un user donne
  router.get('/avg',function(req,res){
   // let typeExam = req.query.type
    let idUser = req.query.iduser
    let sum = 0 ;
    let avg = 0 ; 
    let list  = [];
   // console.log(typeExam)
   
   evaluationTeck.find({user:idUser},{},
    
    function (err, reponses) {
      
      reponses.forEach(element => {
      /*  if(element.type ===typeExam)
         {
           list.push(element)
          }
          */
         sum = sum + element.note
         avg = sum / reponses.length
        console.log(avg)
      });
    
      if (err) return res.status(404).send("no evaluation reck found")
     else res.json(
       {
       "avg_totale " : avg , 
       "Sum " : sum
      });
  });

  })

// calculer score  d'un user donné et dans un examen donnée soit java / .Net
  router.get('/avgType',function(req,res){
     let typeExam = req.query.type
     let idUser = req.query.iduser
     let sum = 0 ;
     let avg = 0 ; 
     let count = 0 ;
     let list  = [];
     console.log(typeExam)
    
    evaluationTeck.find({user:idUser},{},
     
     function (err, reponses) {
       
       reponses.forEach(element => {
        console.log(" type"+element.type)
        console.log("element type"+element.type)
         if(element.type ==typeExam)
          {
            count = count +1 
            sum = sum + element.note
            avg = sum / count
           }
           
          
         console.log(avg)
       });
     
       if (err) return res.status(404).send("no evaluation"+ typeExam +  " reck found pour le user " + idUser)
      else res.json(
        {
        "avg_totale " : avg , 
        "Sum " : sum,
        "count" : count

       });
   });
 
   })


   router.get('/meilleurMoyenne',function(req,res){
    let typeExam = req.query.type
    let idUser = req.query.iduser
    let sum = 0 ;
    let avg = 0 ; 
    let avgMeilleur = 0 ; 
    let count = 0 ;
    let meilleur ; 
    let list  = [];
    console.log(typeExam)
   
   evaluationTeck.find({user:idUser},{},
    
    function (err, reponses) {
      
      reponses.forEach(element => {
       console.log(" type"+element.type)
       console.log("element type"+element.type)
       // if(element.type ==typeExam)
      //   {
           count = count +1 
           sum = sum + element.note
           avg = sum / count
           
           if(avg > avgMeilleur){
             avgMeilleur = avg ; 
             meilleur = element
           }
        //  }
          
         
        console.log("meilleur avg :"+avgMeilleur)
        console.log("meilleur :"+meilleur)
      });
    
      if (err) return res.status(404).send("no evaluation"+ typeExam +  " reck found pour le user " + idUser)
     else res.json(
       {
       "meilleur_evaluation " : meilleur , 
       "avg " : avgMeilleur,

      });
  });

  })


  router.get('/meilleurMoyenneType',function(req,res){
    let typeExam = req.query.type
    let idUser = req.query.iduser
    let sum = 0 ;
    let avg = 0 ; 
    let avgMeilleur = 0 ; 
    let count = 0 ;
    let meilleur ; 
    let list  = [];
    console.log(typeExam)
   
   evaluationTeck.find({user:idUser},{},
    
    function (err, reponses) {
      
      reponses.forEach(element => {
       console.log(" type"+element.type)
       console.log("element type"+element.type)
        if(element.type ==typeExam)
         {
           count = count +1 
           sum = sum + element.note
           avg = sum / count
           
           if(avg > avgMeilleur){
             avgMeilleur = avg ; 
             meilleur = element
           }
          }
          
         
        console.log("meilleur avg :"+avgMeilleur)
        console.log("meilleur :"+meilleur)
      });
    
      if (err) return res.status(404).send("no evaluation"+ typeExam +  " reck found pour le user " + idUser)
     else res.json(
       {
       "meilleur_evaluation " : meilleur , 
       "avg " : avgMeilleur,

      });
  });

  })


  router.get('/min',function(req,res){
    let typeExam = req.query.type
    let idUser = req.query.iduser
    let sum = 0 ;
    let avg = 0 ; 
    let avgMauvais = 100 ; 
    let count = 0 ;
    let mauvais ; 
    let list  = [];
    console.log(typeExam)
   
   evaluationTeck.find({user:idUser},{},
    
    function (err, reponses) {
      
      reponses.forEach(element => {
       console.log(" type"+element.type)
       console.log("element type"+element.type)
     //   if(element.type ==typeExam)
      //   {
       // avgMauvais = Math.max(reponses.note)
           count = count +1 
           sum = sum + element.note
           avg = sum / count
           
           if(avg < avgMauvais){
            avgMauvais = avg ; 
             mauvais = element
           }
       //   }
          
         
        console.log("mauvaus avg :"+avgMauvais)
        console.log("mauvais elment :"+mauvais)
      });
    
      if (err) return res.status(404).send("no evaluation"+ typeExam +  " reck found pour le user " + idUser)
     else res.json(
       {
       "min_evaluation " : mauvais , 
       "avg " : avgMauvais,

      });
  });

  })


  router.get('/minType',function(req,res){
    let typeExam = req.query.type
    let idUser = req.query.iduser
    let sum = 0 ;
    let avg = 0 ; 
    let avgMauvais = 100 ; 
    let count = 0 ;
    let mauvais ; 
    let list  = [];
    console.log(typeExam)
   
   evaluationTeck.find({user:idUser},{},
    
    function (err, reponses) {
      if(reponses.length!=0){
      reponses.forEach(element => {
       console.log(" type"+element.type)
       console.log("element type"+element.type)
       if(element.type ==typeExam)
       {
        //avgMauvais = Math.max(reponses.note)
           count = count +1 
           sum = sum + element.note
           avg = sum / count
           
           if(avg < avgMauvais){
            avgMauvais = avg ; 
             mauvais = element
           }
          }
          
         
        console.log("mauvaus avg :"+avgMauvais)
        console.log("mauvais elment :"+mauvais)
      }

      
      );
    
      if ((err)) return res.status(404).send("no evaluation"+ typeExam +  " reck found pour le user " + idUser)
     else res.json(
       {
       "min_evaluation " : mauvais , 
       "avg " : avgMauvais,

      });
  }});

  })


  
  router.get('/machine',function(req,res){

    
var calculate_shannon_entropy=function(data){
  // init the shannon Entropy
  var shannon_entropy = 0;
  // we get the number of entries in the array
  var length_of_data = data.length;
  // create an empty array to keep track of different labels
  var labels_counter = {}
  // we iterate through the array
  _.forEach(data, function(value, key) {
    // extract the label from the one data element
    var label_extracted = value.label;
    // check if this label is inside our label counter array
    if (label_extracted in labels_counter){
      // the element is inside our object increment its value
      labels_counter[label_extracted] +=1
    } else {
      labels_counter[label_extracted] = 1
    }
  });
  // We then iterate through our label counter object
  _.forEach(labels_counter, function(value, key) {
    // we get the frequency of the number of time a label occurs
    var p = parseFloat(value/length_of_data)
    // Caculate the entropy of a class and add it to the shannon_entropy variable
    shannon_entropy -= p * getBaseLog(2,p)
  })
  return shannon_entropy
}
/**
* This function return the log of Y in base X
* @method getBaseLog
* @param  {Number}   x base
* @param  {Number}   y number
* @return {Number}     the log of Y in base X
*/
var getBaseLog=function(x, y) {
  return Math.log(y) / Math.log(x);
}
var b = []
evaluationTeck.find()
      .then((data)=>{
         // res.setHeader("Access-Control-Allow-Origin", "*"),
         // res.statusCode=200,
          //res.contentType('application/json'),
         b=data
      })
      .catch((err)=> {
          console.log('erreur');
      })
      /*
var a = [
  {"has_a_car":1, "has_a_house":1, "has_children":1,"label":"bon_emprunteur"},
  {"has_a_car":1, "has_a_house":1, "has_children":0,"label":"bon_emprunteur"},
  {"has_a_car":1, "has_a_house":0, "has_children":1,"label":"bon_emprunteur"},
  {"has_a_car":0, "has_a_house":0, "has_children":0,"label":"mauvais_emprunteur"},
  {"has_a_car":0, "has_a_house":0, "has_children":1,"label":"mauvais_emprunteur"}
]
*/
var a = [
  {"java":1, "node js":0, ".net":0,"label":"java"},
  {"java":1, "node js":0, ".net":0,"label":"java"},
  {"java":0, "node js":1, ".net":1,"label":"Nodejs"},
  {"java":1, "node js":0, ".net":1,"label":".net"},
  {"java":0, "node js":0, ".net":1,"label":".Net"}
]
calculate_shannon_entropy(b)

//De manière opposée si dans un set de données tous 
//les objets ont la même classe, il n’y aura pas de désordre l’entropie sera nulle.
/*

On prend donc la fréquence d’apparition de la classe bon_emprunteur 
et son log en base 2 auquel on va ajouter moins la fréquence d’apparition de 
la classe mauvais_emprunteur et son log en base 2 !

Il va falloir ensuite que l’on puisse éliminer des features au fur et à mesure 
que l’on split notre données au fil des blocs de décision
. C’est l’objet de la partie suivante :
*/

 res.json(calculate_shannon_entropy(a));
    
  })



module.exports=router; 
