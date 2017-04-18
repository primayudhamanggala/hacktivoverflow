const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  response: String,
  vote: [{
    type: Schema.Types.ObjectId,
    ref: 'Vote'
  }]
})


let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer;
