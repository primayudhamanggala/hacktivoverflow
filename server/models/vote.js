const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  },
  value: {
    type: Number,
    default: 0,
    enum: [-1, 1]
  }
})


let Vote = mongoose.model('Vote', voteSchema)

module.exports = Vote;
