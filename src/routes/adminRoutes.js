const express = require('express')
const mongodb = require('mongodb').MongoClient
const config = require('../../config')(process.env.NODE_ENV)
const books = require('../content/dummyData').dummyBooks

const adminRouter = express.Router() // eslint-disable-line

const router = () => {
  adminRouter.route('/addBooks')
    .get((req, res) => {
      mongodb.connect(config.mongoUrl, (err, db) => {
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
