const express = require('express')
const mongodb = require('mongodb').MongoClient
const passport = require('passport')
const config = require('../../config')(process.env.NODE_ENV)
const render404 = require('../utils/render404Helper')

const authRouter = express.Router() // eslint-disable-line

const router = nav => {
  authRouter.route('/signUp')
    .post((req, res) => { // eslint-disable-line
      mongodb.connect(config.mongoUrl, (err, db) => {
        const collection = db.collection('users')
        const user = { username: req.body.username, password: req.body.password }
        collection.insert(user, (inserterr, results) => {
          if (inserterr) render404(res, nav, 'There has been a technical issue, please try again later.')
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile')
            db.close()
          })
        })
      })
    })

  authRouter.route('/signIn').post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) => res.redirect('/auth/profile'))
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (!req.user) res.redirect('/')
      next()
    })
    .get((req, res) => res.render('profile', { title: 'profile', nav, user: req.user }))

  return authRouter
}

module.exports = router
