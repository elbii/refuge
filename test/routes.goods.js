var assert = require('chai').assert
  , request = require('supertest')
  , app = require('../lib/refuge').app
  , Chance = require('chance')
  , User = require('../lib/models/user').model
  , Good = require('../lib/models/good').model
  , Session = require('../lib/models/session').model
  , mongoose = require('mongoose')
  , connection = mongoose.createConnection('localhost', 'refuge_test');

describe('goods', function () {
  describe('signed in', function () {
    var chance = new Chance()
      , user = new User({ email: chance.email(), password: 'password' })
      , otherUser = new User({ email: chance.email(), password: 'password' })
      , userSession = request.agent(app)
      , otherUserSession = request.agent(app)
      , goodId, good;

    before(function (done) {
      // reset users and sign in
      connection.db.dropDatabase(done);
    });

    before(function (done) {
      user.save(done);
    });

    before(function (done) {
      userSession.
        post('/sessions').
        send({ email: user.email, password: 'password' }).
        end(done);
    });

    before(function (done) {
      otherUser.save(done);
    });

    before(function (done) {
      otherUserSession.
        post('/sessions').
        send({ email: otherUser.email, password: 'password' }).
        end(done);
    });

    describe('create', function () {
      good = new Good({
        data: {
          login: 'test@test.com',
          password: 'password'
        },
        title: 'hello world',
        notes: 'really long text here',
        tags: [ 'foo', 'bar' ]
      });

      it('should create a new good', function (done) {
        userSession.
          post('/goods').
          send(good).
          set('X-Requested-With', 'XMLHttpRequest').
          set('Accept', 'application/json').
          end(function (err, res) {
            assert.equal(res.status, 200, 'success');
            assert.isDefined(res.body._id, 'created successfully');
            assert.equal(user.id, res.body.user_id, 'matches user');
            goodId = res.body._id;
            done();
          });
      });
    });

    describe('show', function () {
      it('should retrieve one', function (done) {
        userSession.
          get('/goods/' + goodId).
          set('X-Requested-With', 'XMLHttpRequest').
          set('Accept', 'application/json').
          end(function (err, res) {
            assert.equal(res.status, 200, 'success');
            assert.equal(res.body.title, good.title, 'titles match');
            done();
          });
      });
    });

    describe('index', function () {
      it('should retrieve list', function (done) {
        userSession.
          get('/goods').
          set('X-Requested-With', 'XMLHttpRequest').
          set('Accept', 'application/json').
          end(function (err, res) {
            assert.equal(res.status, 200, 'success');
            assert.isArray(res.body, 'array returned');
            done();
          });
      });
    });

    describe('update', function () {
      it('for others', function (done) {
        otherUserSession.
          patch('/goods/' + goodId).
          send({ title: 'changed title', data: { malicious: 'data' }}).
          set('X-Requested-With', 'XMLHttpRequest').
          set('Accept', 'application/json').
          end(function (err, res) {
            assert.equal(res.status, 404, 'not found');
            done();
          });
      });
    });

    describe('update', function () {
      it('for owner', function (done) {
        userSession.
          patch('/goods/' + goodId).
          send({ title: 'changed title', data: { changed: 'data' }}).
          set('X-Requested-With', 'XMLHttpRequest').
          set('Accept', 'application/json').
          end(function (err, res) {
            assert.deepEqual(res.body, {}, 'null response');
            assert.equal(res.status, 200, 'success');
            done();
          });
      });
    });

    describe('destroy', function () {
      it('for others', function (done) {
        otherUserSession.
          del('/goods/' + goodId).
          set('X-Requested-With', 'XMLHttpRequest').
          set('Accept', 'application/json').
          end(function (err, res) {
            assert.equal(res.status, 404, 'not found');
            done();
          });
      });
    });

    describe('destroy', function () {
      it('for owner', function (done) {
        userSession.
          del('/goods/' + goodId).
          set('X-Requested-With', 'XMLHttpRequest').
          set('Accept', 'application/json').
          end(function (err, res) {
            assert.equal(res.status, 200, 'success');
            done();
          });
      });
    });
  });

  describe('not signed in', function () {
    describe('index', function () {
      it('should not list goods', function (done) {
        request(app).
          get('/goods').
          set('X-Requested-With', 'XMLHttpRequest').
          set('Accept', 'application/json').
          end(function (err, res) {
            assert.equal(res.status, 403, 'forbidden');
            assert.equal(res.type, 'application/json', 'json');
            assert.deepEqual(res.body, { message: 'Not signed in.' });
            done();
          });
      });
    });
  });
});
