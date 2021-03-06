const express = require('express')
const morgan = require('morgan')
const app = express()
const path = require('path');
const cors = require('cors');

const taskApi = require('./routers/taskRouter');
const subjectApi = require('./routers/subjectRouter');
const companyApi = require('./routers/companyRouter');
const userApi = require('./routers/userRouter');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(
 (req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods' ,'GET, POST, PUT, PATCH, DELETE, OPTIONS')
   res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  //  res.header('Access-Control-Allow-Credentials', "true");
   res.set('Content-Type', 'application/json');

   next();
 });


// routes for all api services
app.use(cors())
app.use('/Help4U/task', taskApi);
app.use('/Help4U/subjects', subjectApi);
app.use('/Help4U/companies', companyApi);
app.use('/Help4U/user', userApi);
app.get('*', (req, res) => {
  res.status(404).json({
      status:404,
      message: "Wrong routeeeeee",
      action: "Unknown",
      data: null
  })
});

module.exports = app;