const errors = require('restify-errors')
const mongoose = require('mongoose')
const rjwt = require('restify-jwt-community')
const Comment = require('../models/Comment')
const config = require('../config')

module.exports = server => {
  server.get('/comments', async (req, res) => {
    try {
      const comments = await Comment.find({}).limit(10)
      res.send(comments)
    } catch (e) {
      return next(new errors.InvalidContentError(e))
    }
  })

  server.get('/comments/:movie_id', rjwt({ secret: config.JWT_SECRET }), async (req, res) => {
    try {
      const comments = await Comment.find({ movie_id: req.params.movie_id }).limit(10)
      res.send(comments)
    } catch (e) {
      return next(new errors.InvalidContentError(e))
    }
  })
}