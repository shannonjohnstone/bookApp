const nav = require('./navigationRoutes')

module.exports = function config(env = process.env.NODE_ENV) {
  const mongoUrl = env && env === 'devlocal' ? '127.0.0.1:27017' : '192.168.99.1:3001'
  return {
    port: process.env.PORT || 3000,
    mongoUrl: `mongodb://${mongoUrl}/libraryApp`,
    nav,
    apiKey: '2omx84brVo9xVkxWoCloQ',
    apiSecret: 'VJGUzkgJntRxcN5Q9Aaxd0boYDrsn3xnrPDXWvEQ'
  }
}
