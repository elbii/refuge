var assert = require('chai').assert
  , User = require('../lib/models/user').model
  , Credential = require('../lib/models/credential').model
  , Chance = require('chance')
  , mongoose = require('mongoose')
  , connection = mongoose.createConnection('localhost',
    'refuge_' + (process.env.NODE_ENV || 'test'));

describe('user', function () {
  var chance = new Chance()
    , email = chance.email()
    , password = chance.string({ length: 9 })
    , valid = {
        email: email,
        password: password
      }
    , user;

  before(function (done) {
    connection.db.dropDatabase(done);
  });

  before(function (done) {
    User.ensureIndexes(done);
  });

  describe('valid user', function () {
    before(function (done) {
      user = new User(valid);
      user.save(done);
    });

    it('saved valid user', function (done) {
      assert.isDefined(user._id);
      done();
    });

    it('should not allow duplicate emails', function (done) {
      var dupeUser = new User(valid);

      // chai's throws assertion is problematic here
      dupeUser.save(function (err) {
        assert.match(err.message, /11000/);
        done();
      });
    });

    describe('credentials relation', function () {
      var credential;

      before(function (done) {
        credential = new Credential({
          title: chance.string(),
          data: { secretMessage: 'I AM THE MOVIESTAR' },
          notes: chance.string({ length: 10 }),
          tags: [ chance.string(), chance.string() ],
          user_id: user._id
        });

        credential.save(done);
      });

      it("retrieves user's credentials", function (done) {
        user.credentials(function (err, credentials) {
          assert.isNull(err);
          assert.isArray(credentials);
          assert.notStrictEqual(credentials[0]._id, credential._id);
          done();
        });
      });
    });

    describe('password should not change', function () {
      it('saves without changing password', function (done) {
        var prevHash = user.password;

        user.save(function (err, user) {
          assert.isNull(err);
          assert.equal(user.password, prevHash);
          done();
        });
      });

      it('rehashes password when changed', function (done) {
        var prevHash = user.password;
        user.set({ password: chance.string({ length: 9 }) });

        user.save(function (err, user) {
          assert.isNull(err);
          assert.notEqual(user.password, prevHash);
          done();
        });
      });
    });
  });

  describe('validations', function () {
    var invalidEmail = {
          email: 'foobar',
          password: password
        }
      , invalidPassword = {
          email: email,
          password: 'tooshor'
        }
      , undefinedEmail = {
          email: undefined,
          password: password
        }
      , nullEmail = {
          email: null,
          password: password
        }
      , blankEmail = {
          email: '',
          password: password
        }
      , blankPassword = {
          email: email,
          password: ''
        };

    it('catches invalid emails', function (done) {
      user = new User(invalidEmail);
      user.save(function (err, user) {
        assert.equal(err.message, 'Validation failed');
        assert.isDefined(err.errors.email);
        done();
      });
    });

    it('catches invalid passwords', function (done) {
      user = new User(invalidPassword);
      user.save(function (err, user) {
        assert.equal(err.message, 'Validation failed');
        assert.isDefined(err.errors.password);
        done();
      });
    });

    it('catches undefined emails', function (done) {
      user = new User(undefinedEmail);
      user.save(function (err, user) {
        assert.equal(err.message, 'Validation failed');
        assert.isDefined(err.errors.email);
        done();
      });
    });

    it('catches null emails', function (done) {
      user = new User(nullEmail);
      user.save(function (err, user) {
        assert.equal(err.message, 'Validation failed');
        assert.isDefined(err.errors.email);
        done();
      });
    });

    it('catches blank emails', function (done) {
      user = new User(blankEmail);
      user.save(function (err, user) {
        assert.equal(err.message, 'Validation failed');
        assert.isDefined(err.errors.email);
        done();
      });
    });

    it('catches blank passwords', function (done) {
      user = new User(blankPassword);
      user.save(function (err, user) {
        assert.equal(err.message, 'Validation failed');
        assert.isDefined(err.errors.password);
        done();
      });
    });
  });
});
