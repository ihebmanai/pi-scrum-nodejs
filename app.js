var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//dhia module
var meetingsRouter =require('./routes/meetings')
var discussionRouter = require('./routes/discussion')
var messageRouter = require('./routes/message')
var evaluationTechRouter=require('./routes/evaluatuin_tech')
var examRouter = require('./routes/exams')
var questionRouter =require('./routes/question')
var reponseRouter =require('./routes/reponse')


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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', usersList);
app.use('/project', projectRouter);

app.use('/meetings', meetingsRouter);




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
