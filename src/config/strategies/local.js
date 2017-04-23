const passport = require('passport')
const mongodb = require('mongodb').MongoClient
const LocalStrategy = require('passport-local').Strategy
const config = require('../../../config')
const render404 = require('../../utils/render404Helper')

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    mongodb.connect(config.mongoUrl, (err, db) => {
      const collection = db.collection('users')
      collection.findOne({ username }, (finderr, result) => {
        if (finderr) render404(res, nav, 'There has been a technical issue, please try again later.')

        if (result.password === password) {
          const user = result
          done(null, user)
        } else done(null, false)
      })
    })
  }))
}
