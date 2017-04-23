const mongodb = require('mongodb').MongoClient
const objectid = require('mongodb').ObjectID
const config = require('../../config')

const { mongoUrl } = config

const bookController = (bookService, nav) => {
  console.log(bookService, 'bookService') // eslint-disable-line
  const middleware = (req, res, next) => {
    // if (!req.user) res.redirect('/')
    // else
    next()
  }

  const getAllBooks = (req, res) => {
    mongodb.connect(mongoUrl, (err, db) => {
      const collection = db.collection('books')
      collection.find({}).toArray((bookserr, books) => {
        if (bookserr) res.status(500).send(bookserr)
        res.render('booksListView', {
          title: 'Books',
          nav,
          books
        })
      })
    })
  }

  const byIdMiddleware = (req, res, next) => {
    const idParam = req.params.id
    const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$')

    if (!checkForHexRegExp.test(idParam)) res.render('404', { title: '404', nav, message: 'We could not find the book were looking for!' })
    else {
      const id = objectid(req.params.id)

      mongodb.connect(mongoUrl, (err, db) => {
        const collection = db.collection('books')
        collection.findOne({ _id: id }, (bookerr, book) => {
          if (bookerr) res.render('404', { title: '404', nav, message: 'There has been a technical issue, please try again later.' })
          if (book === null) res.render('404', { title: '404', nav, message: 'We could not find the book were looking for!' })
          req.book = book // eslint-disable-line
          next()
        })
      })
    }
  }

  const getById = (req, res) => {
    const book = req.book

    if (book.bookId) {
      bookService.getBookById(book.bookId, (err, _book) => {
        console.log(_book, '_book') // eslint-disable-line
        book.book = _book
        res.render('bookView', {
          title: 'Books',
          nav,
          book
        })
      })
    } else {
      res.render('bookView', {
        title: 'Books',
        nav,
        book
      })
    }
  }

  return {
    middleware,
    getAllBooks,
    byIdMiddleware,
    getById
  }
}

module.exports = bookController
