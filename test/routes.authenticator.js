var assert = require('chai').assert
  , sinon = require('sinon')
  , request = require('supertest')
  , app = require('../lib/refuge').app
  , authenticator = require('../lib/routes/authenticator');

describe('authenticator', function () {
  it('should not allow public access', function (done) {
    request(app).
      get('/credentials').
      set('X-Requested-With', 'XMLHttpRequest').
      set('Accept', 'application/json').
      expect('Content-Type', /json/).
      expect(403).
      end(function (err, res) {
        assert.equal(res.body.message, 'Not signed in.');
        done();
      });
  });
});
