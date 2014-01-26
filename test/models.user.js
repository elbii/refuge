var assert = require('chai').assert
  , User = require('../lib/models/user').model
  , Chance = require('chance');

describe('user', function () {
  var chance = new Chance()
    , email = chance.email()
    , password = chance.string({ length: 9 })
    , valid = {
        email: email,
        password: password
      }
    , invalidEmail = {
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
      }
    , user;

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

  it('save valid user', function (done) {
    user = new User(valid);
    user.save(function (err, user) {
      assert.isDefined(user._id);
      done();
    });
  });
});
