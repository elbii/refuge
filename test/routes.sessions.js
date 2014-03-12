var assert = require('chai').assert
  , Request = require('supertest')
  , App = require('../lib/refuge').app
  , Chance = require('chance')
  , User = require('../lib/models/user').model
  , mongoose = require('mongoose')
  , connection = mongoose.createConnection('localhost',
    'refuge_' + (process.env.NODE_ENV || 'test'));

describe('sessions', function () {
  var chance = new Chance()
    , creds = { email: chance.email(), password: chance.string({ length: 9 }) }
    , user = new User(creds)
    , session = Request.agent(App);

  before(function (done) {
    connection.db.dropDatabase(done);
  });

  before(function (done) {
    user.save(done);
  });

  describe('it does not get session for unauthed', function (done) {
    it('show', function (done) {
      session.
        get('/session').
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 403, 'forbidden');
          done();
        });
    });

    it('index', function (done) {
      session.
        get('/sessions').
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 403, 'forbidden');
          done();
        });
    });
  });

  describe('post', function () {
    it('does not create for invalid auth', function (done) {
      var invalidCreds = { email: creds.email, password: chance.string() };

      session.
        post('/sessions').
        send(invalidCreds).
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 403, 'forbidden');
          assert.deepEqual(res.body, { message: 'Invalid email or password' });
          done();
        });
    });

    it('does not create for missing email', function (done) {
      var missingEmail = { email: 'foo@bar.com', password: chance.string() };

      session.
        post('/sessions').
        send(missingEmail).
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 403, 'forbidden');
          assert.deepEqual(res.body, { message: 'Email not found' });
          done();
        });
    });
  });

  describe('signed in', function () {
    var sessionId;

    before(function (done) {
      session.
        post('/sessions').
        send(creds).
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          sessionId = res.body._id;
          done();
        });
    });

    it('created valid session', function (done) {
      assert.isDefined(sessionId, 'success');
      done();
    });

    it('show', function (done) {
      session.
        get('/session').
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 200, 'success');
          assert.isDefined(res.body._id, '_id returned');
          done();
        });
    });

    it('index', function (done) {
      session.
        get('/sessions').
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 200, 'success');
          assert.isArray(res.body, 'sessions array returned');
          assert.equal(res.body[0]._id, sessionId);
          done();
        });
    });

    it('destroy', function (done) {
      session.
        del('/sessions/' + sessionId).
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 200, 'signed out');
          done();
        });
    });
  });

});
