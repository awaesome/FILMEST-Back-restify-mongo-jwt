const errors = require('restify-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../auth')
const config = require('../config')

module.exports = server => {
  server.post('/register', async (req, res) => {
    if (!req.is('application/json')) {
      return new errors.InvalidContentError("Expected 'application/json")
    }

    const { email, password } = req.body

    if (!email || !password) {
      return new errors.InvalidContentError("All fields must be filled")
    }

    const user = new User({
      email,
      password
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        user.password = hash

        try {
          await user.save()
          res.send(201)
        } catch (e) {
          return new errors.InternalError(err.massage)
        }
      })
    })
  })

  server.post('/auth', async (req, res) => {
    const { email, password } = req.body

    try {
      const user = await auth.authenticate(email, password)

      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '15m'
      })

      const { iat, exp } = jwt.decode(token)

      res.send({ iat, exp, token })
    } catch (e) {
      return new errors.UnauthorizedError(e)
    }
  })
}