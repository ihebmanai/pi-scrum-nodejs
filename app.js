var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
bcrypt   = require('bcrypt-nodejs');
var socket = require('socket.io');
// Import the library:
var cors = require('cors');
const Pusher = require('pusher');


//var expressMail = require('express-mail');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//dhia module
var meetingsRouter =require('./routes/meetings')
var discussionRouter = require('./routes/discussion')
var evaluationTechRouter=require('./routes/evaluatuin_tech')
var examRouter = require('./routes/exams')
var questionRouter =require('./routes/question')
var reponseRouter =require('./routes/reponse')
var messageRouter = require('./routes/message')


var backlogSprintRouter =require('./routes/backlog_sprint')
var backlogProjectRouter =require('./routes/backlog_project')
var sprintPlanningRouter = require('./routes/sprint_planning')
var scrum_tableRouter=require('./routes/scrum_table')

var evaluationHRRouter=require('./routes/evalution_RH')
var cvManagmentRouter=require('./routes/cv_managment')









var mongoose= require('mongoose');
var usersList = require('./routes/user');
var projectRouter = require('./routes/project');
const url="mongodb://127.0.0.1:27017/pi-scrum";
mongoose.connect(url,{useNewUrlParser: true });
var mongo=mongoose.connection;
mongo.on('connected',()=>{
  console.log('ouv connexion');
});
mongo.on('open',()=>{
  console.log('connexion etablie');
});
mongo.on('error',(err)=>{
  console.log(err);
});

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// cors
/*app.use((req,res)=>{
    res.header =("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,Content-Type,Accept,Authorization");
    if(req.method==='OPTIONS'){
      res.header('Access-Allow-Origin-Methods','PUT','POST','PATCH','DELETE','GET')
      return res.status(200).json({

      })
    }
    
})*/

// Then use it before your routes are set up:
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', usersList);
app.use('/project', projectRouter);

//partie  Dhia 
app.use('/meetings', meetingsRouter);
app.use('/discussion', discussionRouter);
app.use('/question', questionRouter);
app.use('/exams', examRouter);
app.use('/reponses', reponseRouter);
app.use('/evaluations', evaluationTechRouter);
app.use('/messages', messageRouter);

/*
var server = app.listen(3000, function(){
  console.log('listening for requests on port 4000,');
});
*/

// Static files
app.use(express.static('public'));

// Provide access to node_modules folder from the client-side
app.use('/scripts', express.static(`${__dirname}/node_modules/`));


// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));



// Socket setup & pass server
/*
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
        console.log(data)
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
*/
/*
expressMail.extend(app, {
  transport: 'SMTP',
  config: {
    service: 'Gmail',
    auth: {
      user: 'dhiabsdl94@gmail.com',
      pass: 'D58059894'
    }
  },
  defaults: {
    from: 'gmail.user@gmail.com'
  }
});
*/

//const io = socket(server);




var pusher = new Pusher({
  appId: '767754',
  key: 'dc228fe9baaec0233807',
  secret: 'b9e9b31d13212baa5763',
  cluster: 'eu',
  encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
