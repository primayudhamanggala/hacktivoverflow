const dbAnswer = require('../models/answer')
const dbQuestion = require('../models/question')
const dbUser = require('../models/user')

module.exports = {
  create: (req, res) => {
    req.body.user = req.params.userId
    req.body.question = req.params.questionId
    dbAnswer.create(req.body, (err, answer) => {
      if(err) {
        res.send(err.message)
      } else {
        dbQuestion.findByIdAndUpdate(req.params.questionId,
        {$push: {answer: answer}},{safe: true, upsert:true},(err, question) => {
          if (err) {
            console.log(err);
          }else {
            console.log(question);
          }
        })
        dbUser.findByIdAndUpdate(req.params.userId,
        {$push: {answer: answer}},{safe: true, upsert:true},(err, user) => {
          if (err) {
            console.log(err);
          }else {
            console.log(user);
          }
        })
        res.send(answer)
      }
    })
  },
  getAll: (req, res) => {
    dbAnswer.find().populate('user').populate('question').exec((err, answer) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(answer)
      }
    })
  },
  getOne: (req, res) => {
    dbAnswer.findById(req.params.id, (err, answer) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(answer)
      }
    })
  },
  update: (req, res) => {
    dbAnswer.findByIdAndUpdate(req.params.id, req.body, (err, answer) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(answer)
      }
    })
  },
  delete: (req, res) => {
    dbAnswer.findByIdAndRemove(req.params.id, (err, answer) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(answer)
      }
    })
  }
}
