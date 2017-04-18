const dbUser = require('../models/user')
const passwordHash = require('password-hash');

module.exports = {
  create: (req, res) => {
    console.log(req.body);
    req.body.password = passwordHash.generate(req.body.password)
    dbUser.create(req.body, (err, user) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(user)
      }
    })
  },
  login: (req, res) => {
    res.send(req.user)
  },
  getAll: (req, res) => {
    dbUser.find()
    // .populate('question').populate('answer').populate('vote')
    .exec((err, user) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(user)
      }
    })
  },
  getOne: (req, res) => {
    dbUser.findById(req.params.id, (err, user) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(user)
      }
    })
  },
  update: (req, res) => {
    dbUser.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(user)
      }
    })
  },
  delete: (req, res) => {
    dbUser.findByIdAndRemove(req.params.id, (err, user) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(user)
      }
    })
  }
}
