const { User } = require('../models')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}
// opts.issuer = 'accounts.examplesoft.com'
// opts.audience = 'yoursite.net'
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
  User.findByPk(jwt_payload.id)
    .then(user => {
      if (user) {
        return done(null, user.get({ plain: true }))
      } else {
        return done(null, false)
      }
    })
    .catch(e => {
      done(e, false)
    })
}))
module.exports = passport
