const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.authenticate = async (email, password) => {
  try {
    const user = await User.findOne({email})

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if(err) throw err

      if (!isMatch) {
        throw new Error()
      }
    })
    return user
  } catch (e) {
    throw new errors.InternalError('Authentication failed')
  }
}