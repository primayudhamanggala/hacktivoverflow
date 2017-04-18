const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

var dbURI = 'mongodb://localhost/hacktivoverflow'
// var dbURI = 'mongodb://admin:admin123@ds161960.mlab.com:61960/hacktivoverflow'

const mongoose = require('mongoose')
mongoose.connect(dbURI)

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

const user = require('./routes/user')
const question = require('./routes/question')
const answer = require('./routes/answer')

app.use('/users', user)
app.use('/questions', question)
app.use('/answers', answer)

app.listen(process.env.PORT || 3000)
