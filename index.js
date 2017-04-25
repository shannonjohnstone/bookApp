const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const config = require('./config')(process.env.NODE_ENV)

const app = express()

console.log(process.env.NODE_ENV, 'process.env.NODE_ENV') // eslint-disable-line

const { port, nav } = config

// setup static folder routes
app.use(express.static('public')) // css/js - public
app.set('views', ('./src/views')) // views - views

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(session({ secret: 'fox' }))
require('./src/config/passport')(app)

// set template engine
app.set('view engine', 'ejs')

// routes
require('./src/routes')(app, nav)

// main and error route
app.get('/signin', (req, res) => res.render('signin', { title: 'Hello from render', nav }))
app.get('/', (req, res) => res.render('index', { title: 'Hello from render', nav }))
app.get('*', (req, res) => res.status(404).send('<h2>Sorry the page you are looking for seems to to be here anymore!</h2>'))

// app listen
app.listen(port, (err) => {
  if (err) res.status(500).send(err)
  console.log(`Server running on: localhost:${port}`) // eslint-disable-line
})
