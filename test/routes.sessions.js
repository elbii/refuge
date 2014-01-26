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

  describe('post', function () {
    it('create', function (done) {
      session.
        post('/sessions').
        send(creds).
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 200, 'success');
          done();
        });
    });
  });

  describe('get', function () {
    before(function (done) {
      session.
        post('/sessions').
        send(creds).
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(done);
    });

    it('show', function (done) {
      session.
        get('/session').
        set('X-Requested-With', 'XMLHttpRequest').
        set('Accept', 'application/json').
        end(function (err, res) {
          assert.equal(res.status, 200, 'retrieve session');
          assert.isDefined(res.body._id, '_id returned');
          done();
        });
    });
  });
});
