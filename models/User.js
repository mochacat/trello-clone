var bcrypt = require('bcrypt-nodejs')
var crypto = require('crypto')
var mongoose = require('mongoose')

var providerSchema = new mongoose.Schema({
  id: String,
  name: String,
  accessToken: String,
  secondaryToken: String
})

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  role: { type: String, enum: ['admin', 'member'], default: 'member' },

  providers: [providerSchema],

  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' }
  },

  askEmail: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpires: Date
})

/**
 * Password hash middleware.
 */
userSchema.pre('save', function (next) {
  var _this = this
  if (!_this.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err)
    }

    bcrypt.hash(_this.password, salt, null, function (err, hash) {
      if (err) {
        return next(err)
      }

      _this.password = hash
      next()
    })
  })
})

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }

    cb(null, isMatch)
  })
}

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size) {
  if (!size) {
    size = 200
  }

  if (!this.email) {
    return 'https://gravatar.com/avatar/?s=' + size + '&d=retro'
  }

  var md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro'
}

module.exports = mongoose.model('User', userSchema)
