const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date
  },
});

CommentSchema.plugin(timestamp)

const Comment = mongoose.model('Comment', CommentSchema, 'comments');
module.exports = Comment;