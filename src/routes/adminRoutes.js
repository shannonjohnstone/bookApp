const express = require('express')
const mongodb = require('mongodb').MongoClient
const books = require('../content/dummyData').dummyBooks

const adminRouter = express.Router() // eslint-disable-line

const router = () => {
  adminRouter.route('/addBooks')
    .get((req, res) => {
      const url = 'mongodb://127.0.0.1:27017/libraryApp'
      mongodb.connect(url, (err, db) => {
        const collection = db.collection('books')
        collection.insertMany(books, (inserterr, results) => {
          if (inserterr) res.status(500).send(inserterr)
          res.send(results)
          db.close()
        })
      })
    })

  return adminRouter
}

module.exports = router
