const http = require('http')
const xml2js = require('xml2js')

const parser = xml2js.Parser({ explictArray: false }) // eslint-disable-line
const config = require('../../config')(process.env.NODE_ENV)

const { apiKey } = config

const goodreadsService = function goodreadsService() {
  const getBookById = function getBookById(id, cb) {
    const options = {
      host: 'www.goodreads.com',
      path: `/book/show/${id}?format=xml&key=${apiKey}`
    }

    const callback = (response) => {
      let xmlStr = ''
      response.on('data', chunk => {
        xmlStr += chunk
      })

      response.on('end', () => {
        parser.parseString(xmlStr, (err, result) => {
          cb(null, result.GoodreadsResponse.book[0])
        })
      })
    }

    console.log('above request..') // eslint-disable-line
    http.request(options, callback).end()
  }

  return {
    getBookById
  }
}

module.exports = goodreadsService
