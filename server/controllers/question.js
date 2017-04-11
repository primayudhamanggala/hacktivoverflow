const dbQuestion = require('../models/question')
const dbUser = require('../models/user')

module.exports = {
  create: (req, res) => {
    req.body.user = req.params.userId
    dbQuestion.create(req.body, (err, question) => {
      if(err) {
        res.send(err.message)
      } else {
        dbUser.findByIdAndUpdate(req.params.userId,
        {$push: {question: question}},{safe: true, upsert:true},(err, user) => {
          if (err) {
            console.log(err);
          }else {
            console.log(user);
          }
        })
        res.send(question)
      }
    })
  },
  getAll: (req, res) => {
    dbQuestion.find().populate('user').exec((err, question) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(question)
      }
    })
  },
  getOne: (req, res) => {
    dbQuestion.findById(req.params.id, (err, question) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(question)
      }
    })
  },
  update: (req, res) => {
    dbQuestion.findByIdAndUpdate(req.params.id, req.body, (err, question) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(question)
      }
    })
  },
  delete: (req, res) => {
    dbQuestion.findByIdAndRemove(req.params.id, (err, question) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(question)
      }
    })
  }
}
