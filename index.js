"use strict"
const app = require('./bootstrap'),
  async = require('async'),
  controllers = require('./controllers'),
  { Board, List, Card } = require('./models'),
  passport = require('./config/passport'),
  kube = require('kube')

kube(app)

app.get('/', function(req,res){
  
  async.parallel({
    boards: function (callback) {
      Board.find({}).exec(callback);
    },
    lists: function (callback) {
      List.find({}).exec(callback);
    },
    cards : function (callback){
      Card.find({}).exec(callback);
    }
  }, function(err, result){
    res.kube.render(result)
  });
})


/*app.use('/', controllers.Home)
app.use('/board', controllers.Board)
app.use('/blog', controllers.Post)
app.use('/auth', controllers.Auth)
app.use('/user', passport.isAuthenticated, controllers.User)
app.use('/admin', passport.isAuthenticated, passport.isAdmin, controllers.Admin)*/

module.exports = app
