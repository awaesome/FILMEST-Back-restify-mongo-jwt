const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const MovieSchema = new mongoose.Schema({
  title: {
    type: String
  }
});

MovieSchema.plugin(timestamp)

const Movie = mongoose.model('Movie', MovieSchema, 'movies');
module.exports = Movie;