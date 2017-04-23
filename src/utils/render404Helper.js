module.exports = (res, nav, message) => {
  return res.render('404', { title: '404', nav, message })
}
