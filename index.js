"use strict"
const app = require('./bootstrap'),
  controllers = require('./controllers'),
  models = require('./models'),
  passport = require('./config/passport'),
  kube = require('kube')

kube(app)

app.get('/', function(req,res){
  res.kube.render()
})


/*app.use('/', controllers.Home)
app.use('/board', controllers.Board)
app.use('/blog', controllers.Post)
app.use('/auth', controllers.Auth)
app.use('/user', passport.isAuthenticated, controllers.User)
app.use('/admin', passport.isAuthenticated, passport.isAdmin, controllers.Admin)*/

module.exports = app