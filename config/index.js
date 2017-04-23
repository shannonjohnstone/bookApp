const nav = require('./navigationRoutes')

module.exports = {
  port: process.env.PORT || 3000,
  mongoUrl: 'mongodb://127.0.0.1:27017/libraryApp',
  nav,
  apiKey: '2omx84brVo9xVkxWoCloQ',
  apiSecret: 'VJGUzkgJntRxcN5Q9Aaxd0boYDrsn3xnrPDXWvEQ'
}
