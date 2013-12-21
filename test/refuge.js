var assert = require('chai').assert
  , request = require('supertest')
	, app = require('../lib/refuge').app;

describe('index', function () {
  it('responds with html', function (done) {
    request(app).
      get('/').
      set('Accept', 'text/html').
      expect('Content-Type', /html/).
      expect(200, done);
  });
});
