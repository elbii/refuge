var assert = require('chai').assert
  , Request = require('supertest')
  , App = require('../lib/refuge').app
  , Chance = require('chance')
  , User = require('../lib/models/user').model
  , Credential = require('../lib/models/credential').model
  , mongoose = require('mongoose')
  , connection = mongoose.createConnection('localhost',
    'refuge_' + (process.env.NODE_ENV || 'test'));

describe('credentials', function () {
  describe('signed in', function () {
    var credential
      , credentialId
      , chance = new Chance()
      , myCreds = { email: chance.email(), password: chance.string(64) }
      , otherCreds = { email: chance.email(), password: chance.string(64) }
      , myUser = new User(myCreds)
      , otherUser = new User(otherCreds)
      , mySession = Request.agent(App)
      , otherSession = Request.agent(App);


    before(function (done) {
      connection.db.dropDatabase(done);
    });

    before(function (done) {
      myUser.save(function () {
        mySession.
          post('/sessions').
          send(myCreds).
          end(done);
      });
    });

    before(function (done) {
      otherUser.save(function () {
        otherSession.
          post('/sessions').
          send(otherCreds).
          end(done);
      });
    });

    describe('create', function () {
      credential = new Credential({
        data: {
          login: 'test@test.com',
          password: 'password'
        },
        title: 'hello world',
        notes: 'really long text here',
        tags: [ 'foo', 'bar' ]
      });

      it('should create a new credential', function (done) {
        mySession.
          post('/credentials').
          send(credential).
          set('X-Requested-With', 'XMLHttpRequest').
          set('Accept', 'application/json').
          end(function (err, res) {
            assert.equal(res.status, 200, 'success');
            assert.isDefined(res.body._id, '_id returned');
            credentialId = res.body._id;
            done();
          });
      });
    });

    describe('show', function () {
      it('should retrieve one', function (done) {
        mySession.
          get('/credentials/' + credentialId).
          set('X-Requested-With', 'XMLHttpRequest').
          set('Accept', 'application/json').
          end(function (err, res) {
            assert.equal(res.status, 200, 'success');
            assert.equal(res.body.title, credential.title, 'titles match');
            done();
          });
      });
    });

    describe('index', function () {
      it('should retrieve list', function (done) {
        mySession.
          get('/credentials').
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
        otherSession.
          patch('/credentials/' + credentialId).
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
        mySession.
          patch('/credentials/' + credentialId).
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
        otherSession.
          del('/credentials/' + credentialId).
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
        mySession.
          del('/credentials/' + credentialId).
          set('X-Requested-With', 'XMLHttpRequest').
          set('Accept', 'application/json').
          end(function (err, res) {
            assert.equal(res.status, 200, 'success');
            done();
          });
      });
    });

    describe('destroy', function () {
      it('for owner after destroyed', function (done) {
        mySession.
          del('/credentials/' + credentialId).
          set('X-Requested-With', 'XMLHttpRequest').
          set('Accept', 'application/json').
          end(function (err, res) {
            assert.equal(res.status, 404, 'not found');
            done();
          });
      });
    });
  });

  describe('not signed in', function () {
    describe('index', function () {
      it('should not list credentials', function (done) {
        Request.agent(App).
          get('/credentials').
          set('X-Requested-With', 'XMLHttpRequest').
          set('Accept', 'application/json').
          end(function (err, res) {
            assert.equal(res.status, 403, 'forbidden');
            assert.equal(res.type, 'application/json', 'json');
            assert.deepEqual(res.body, { message: 'Not signed in' });
            done();
          });
      });
    });
  });
});
