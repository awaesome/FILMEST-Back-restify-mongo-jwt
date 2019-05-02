const errors = require('restify-errors')
const rjwt = require('restify-jwt-community')
const Movie = require('../models/Movie')
const config = require('../config')

module.exports = server => {
  server.get('/movies', async (req, res, next) => {
    try {
      const movies = await Movie.find({}).limit(10)
      res.send(movies)
      next()
    } catch (e) {
      return next(new errors.InvalidContentError(e))
    }
  })

  server.get('/movies/:id', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id)
      res.send(movie)
      next()
    } catch (e) {
      return next(new errors.InvalidContentError(e))
    }
  })
}