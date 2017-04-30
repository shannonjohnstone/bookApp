const nav = require('./navigationRoutes')

module.exports = function config(env = process.env.NODE_ENV) {
  if (env === 'production') mongoUrl = '172.104.33.22:3001'
  else mongoUrl = env === 'devlocal' ? '127.0.0.1:27017' : '192.168.99.1:3001'

  return {
    port: process.env.PORT || 3000,
    mongoUrl: `mongodb://${mongoUrl}/libraryApp`,
    nav,
    apiKey: '2omx84brVo9xVkxWoCloQ',
    apiSecret: 'VJGUzkgJntRxcN5Q9Aaxd0boYDrsn3xnrPDXWvEQ'
  }
}
