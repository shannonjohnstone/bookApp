const authRouter = require('./authRoutes')
const adminRouter = require('./adminRoutes')
const bookRouter = require('./bookRoutes')
const authorRouter = require('./authorRoutes')

module.exports = (app, nav) => {
  app.use('/auth', authRouter(nav))
  app.use('/admin', adminRouter())
  app.use('/books', bookRouter(nav))
  app.use('/authors', authorRouter(nav))
}
