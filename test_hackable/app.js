var request = require('supertest'),
  chai = require('chai'),
  expect = chai.expect,
  _ = require('lodash'),
  mongoose = require('mongoose'),
  User = require('../models/User'),
  Post = require('../models/Post'),
  Product = require('../models/Product')

var app = require('../index.js')

const user = request.agent(app)
const user_info = {
  email: 'admin@admin.com',
  password: 'asdfasdf'
}

const test_user = User({email: 'asdf@asdf.com', password:'asdf'})
test_user.save()

describe( 'App', function(){
  before(function(done){

    user
      .post('/auth/login')
      .send(user_info)
      .expect(302, done)
  })

  describe('GET /', function() {
    it('should return 200 OK', function(done) {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('GET /auth/login', function() {
    it('should return 200 OK', function(done) {
      request(app)
        .get('/auth/login')
        .expect(200, done);
    });
  });
  
  describe('GET /auth/logout', function() {
    it('should return 302 redirect', function(done){
      request(app)
      .get('/auth/logout')
      .expect(302, done)
    })
  });

  describe('GET /auth/register', function() {
    it('should return 200 OK', function(done) {
      request(app)
        .get('/auth/register')
        .expect(200, done);
    });
  });
  
  describe('GET /auth/register', function() {
    it('should return 200 OK', function(done) {
      request(app)
        .get('/auth/register')
        .expect(200, done);
    });
  });
  
  describe('GET /auth/o/twitter', function() {
    it('should return 302 redirect', function(done){
      request(app)
      .get('/auth/o/twitter')
      .expect(302, done)
    })
  });
  
  describe('GET /auth/o/twitter/callback', function() {
    it('should return 302 redirect', function(done){
      request(app)
      .get('/auth/o/twitter/callback')
      .expect(302, done)
    })
  });
  
  describe('GET /auth/o/testing/', function() {
    it('should return 302 redirect', function(done){
      request(app)
      .get('/auth/o/testing')
      .expect(302, done)
    })
  });
  
  describe('GET /auth/o/testing/callback', function() {
    it('should return 302 redirect', function(done){
      request(app)
      .get('/auth/o/testing/callback')
      .expect(302, done)
    })
  });
  
  describe('GET /random-url', function() {
    it('should return 404', function(done) {
      request(app)
        .get('/reset')
        .expect(404, done);
    });
  });

  describe('GET /blog', function(){
    it('should return 200', function(done){
      request(app)
        .get('/blog')
        .expect(200, done)
    })
  })
  
  describe('GET /blog/post/:id', function(){
    it('should return 200', function(done) {
      Post.findOne({ title: 'First Blog Post' }, function(err, post) {
        var url = '/blog/post/' + post._id;
        request(app)
          .get(url)
          .expect(200, done)
      });
    });
  });
  
  describe('GET /user/account', function(){
    it('should return 300 unauthorized', function(done){
      request(app)
        .get('/user/account')
        .expect(302, done)
    })

    it('should return 200 when authorized', function(done){
      user
        .get('/user/account')
        .expect(200,done)
    })
  })
  
  describe('GET /user/account/unlink/testing', function(){
    it('should return 302', function(done){
      request(app)
        .get('/user/account/unlink/testing')
        .expect(302, done)
    })
    
  });

  describe('GET /user/account/unlink/mock_provider', function(){
    it('should return 302', function(done){
      user
        .get('/user/account/unlink/mock_provider')
        .expect(302, done)
    })
    
    it('should not find the mock_provider', function(done) {
      User.findOne({ email: user_info.email }, function(err, user) {
        if (err) return done(err);
        var providers = _.map(user.providers, 'name');
        expect('mock_provider').to.not.be.oneOf(providers);
        done();
      });
    });
    
  });

  describe('POST /user/account', function(){
    it('should 302 redirect when invalid email is given', function(done){
      user.post('/user/account')
      .send({email: 'asdf'})
      .expect(302, done)
    })

    it('should 302 redirect to /user/accounts when valid email address given', function(done){
      const email = 'zzzz@aol.com'

      user.post('/user/account')
        .send({email})
        .expect(302, function(e, res){
          if(e) return done(e)
          res.header.location.should.equal('/user/account')
          User.findOne({email}, function(err, found){
            found.should.not.be.null
            done()
          })
        })
    })

    it('should 302 redirect and not update if email is taken', function(done){
      const email = 'asdf@asdf.com'
      user.post('/user/account')
        .send({email})
        .expect(302, function(e){
          User.findOne({email}, function(err, user){
            user._id.should.eql(test_user._id)
            done()
          })
        })
    })
  })


  describe('POST /charge', function() {
    it('should return 200 OK', function (done) {
      Product.findOne(function (err, product) {
        const req = {stripeToken: "gordo", id: product._id}
        request(app)
          .post('/charge')
          .send(req)
          .expect(302, done)
      })
    })
  })

  describe('POST /auth/login', function(){
    it('should not log user in if email not found', function(done){
      user.get('/auth/logout')
        .then( function(){
          return user.post('/auth/login').send({email: 'zzzzzz'})
            .expect(302)

        })
        .then( function(){
          user
            .get('/user/account')
            .expect(302, done)
        })
    })

    it('should not log user in if bad password', function(done){
      user.get('/auth/logout')
        .expect(302, function(){
          return user.post('/auth/login').send({email: 'admin@admin.com'})
            .expect(302, function(){
              user
                .get('/admin/')
                .expect(302, done)
            })

        })
    })
  })
})
