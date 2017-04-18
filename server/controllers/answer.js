const dbAnswer = require('../models/answer')
const dbQuestion = require('../models/question')
const dbUser = require('../models/user')
const dbVote = require('../models/vote')

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
        dbUser.findByIdAndUpdate(req.params.userId,{
        $push: {answer: answer}},{safe: true, upsert:true},(err, user) => {
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
    dbAnswer.find({question: req.params.questionId}).populate('vote')
    .exec((err, answer) => {
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
  },
  upVote: (req, res) => {
    // dbVote.create({user: req.params.userId, value: 1}, (err, vote) => {
    dbVote.create({user: req.params.userId, value: 1}, (err, vote) => {
      if (err) {
        res.send(err)
      } else {
        dbAnswer.findByIdAndUpdate(req.params.id,
          {$push: {vote: vote}}, {safe: true, upsert:true},
          (err, result) => {
          if (err) {
            res.send(err.message)
          } else {
            // res.send(result)
            res.send(vote)
          }
        })
      }
    })
  },
  downVote: (req, res) => {
    // dbVote.create({user: req.params.userId, value: -1}, (err, vote) => {
    dbVote.create({user: req.params.userId, value: -1}, (err, vote) => {
      if (err) {
        res.send(err)
      } else {
        dbAnswer.findByIdAndUpdate(req.params.id,
          {$push: {vote: vote}}, {safe: true, upsert:true},
          (err, result) => {
          if (err) {
            res.send(err.message)
          } else {
            res.send({result, vote})
          }
        })
        // res.send(vote)
      }
    })
  },
  voteCount: (req, res) => {
    dbVote.find({answer: req.body.answer} , (err, vote) => {
      if (err) {
        res.send(err)
      } else {
        let result = vote.map((val) => {
          {return val.value}
        })
        let sum = result.reduce((a, b) => {
          return a + b
        }, 0)
        res.send({sum})
      }
    })
  }
}
