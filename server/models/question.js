const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answer: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  title: String,
  inquiry: String,
  votes: Number
})


let Question = mongoose.model('Question', questionSchema)

module.exports = Question;
