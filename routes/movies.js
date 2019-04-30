const errors = require('restify-errors')
const Movie = require('../models/Movie')

module.exports = server => {
  server.get('/movies', async (req, res, next) => {
    try {
      const movies = await Movie.find({}).limit(10)
      console.log(movies)
      res.send(movies)
      next()
    } catch (e) {
      return next(new errors.InvalidContentError(e))
    }
  })
}