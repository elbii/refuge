var assert = require('chai').assert
  , Request = require('supertest')
  , App = require('../lib/refuge').app
  , Chance = require('chance')
  , User = require('../lib/models/user').model
  , mongoose = require('mongoose')
  , connection = mongoose.createConnection('localhost',
    'refuge_' + (process.env.NODE_ENV || 'test'));

describe('users', function () {
  var validUser
    , invalidUserEmail
    , invalidUserPassword
    , chance = new Chance()
    , session = Request.agent(App);

  before(function (done) {
    connection.db.dropDatabase(done);
  });

  describe('post', function () {
    validUser = new User({
      email: chance.email(),
      password: chance.string({ length: 9 })
    });

    invalidUserEmail = new User({
      email: 'foobar',
      password: chance.string({ length: 9 })
    });

    invalidUserPassword = new User({
      email: chance.email(),
      password: 'pass'
    });

    it('creates valid user', function (done) {
      session.
        post('/users').
        send(validUser).
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 200, 'success');
          assert.isDefined(res.body._id, '_id returned');
          done();
        });
    });

    it('does not create user with invalid email', function (done) {
      session.
        post('/users').
        send(invalidUserEmail).
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 500, 'server error');
          assert.deepEqual(res.body, { message: 'Validation failed' });
          assert.isUndefined(res.body._id, '_id not returned');
          done();
        });
    });

    it('does not create user with invalid password', function (done) {
      session.
        post('/users').
        send(invalidUserPassword).
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 500, 'server error');
          assert.deepEqual(res.body, { message: 'Validation failed' });
          assert.isUndefined(res.body._id, '_id not returned');
          done();
        });
    });
  });

  describe('get', function () {
    var myCreds = {
        email: chance.email(),
        password: chance.string({ length: 9 })
      }
      , myUser = new User(myCreds)
      , mySession = Request.agent(App);

    before(function (done) {
      myUser.save(function () {
        mySession.
          post('/sessions').
          send(myCreds).
          end(done);
      });
    });

    it('show your account', function (done) {
      mySession.
        get('/user').
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 200, 'user returned');
          done();
        });
    });

    it('does not show accounts anonymously', function (done) {
      session.
        get('/user').
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 403, 'forbidden');
          assert.deepEqual(res.body, { message: 'Not signed in' });
          done();
        });
    });
  });
});
