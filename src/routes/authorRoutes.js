const express = require('express')

const authorRouter = express.Router() // eslint-disable-line

const router = () => {
  authorRouter.route('/').get((req, res) => res.send('All the authors!'))
  authorRouter.route('/single').get((req, res) => res.send('Just the single author!'))
  return authorRouter
}

module.exports = router
