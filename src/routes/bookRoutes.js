const express = require('express')
const goodreadsService = require('../services/goodreadsService')()

const bookRouter = express.Router() // eslint-disable-line

const router = nav => {
  const bookController = require('../controllers/bookController')(goodreadsService, nav) // eslint-disable-line
  bookRouter.use(bookController.middleware)
  bookRouter.route('/').get(bookController.getAllBooks)
  bookRouter.route('/:id')
    .all(bookController.byIdMiddleware)
    .get(bookController.getById)

  return bookRouter
}

module.exports = router
