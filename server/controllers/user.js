const dbUser = require('../models/user')

module.exports = {
  create: (req, res) => {
    dbUser.create(req.body, (err, user) => {
      if(err) {
        res.send(err.message)
      } else {
        res.send(user)
      }
    })
  },
  getAll: (req, res) => {
    dbUser.find().populate('question').exec((err, user) => {
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
