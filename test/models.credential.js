var assert = require('chai').assert
	, User = require('../lib/models/user').model;

describe('models.user', function () {
	var user_params = {
			email: 'test@test.com',
			password: 'password',
		}, user;

	beforeEach(function (done) {
		user = new User(user_params);
		done();
	});

	it('should be defined', function (done) {
		assert.typeOf(user, 'object');
		done();
	});

	it('should not save with empty password', function (done) {
		user.password = '';
		user.save(function (err) {
			assert.typeOf(err.errors.password, 'object');
			done();
		});
	});

	it('should not save with empty email', function (done) {
		user.email = '';
		user.save(function (err) {
			assert.typeOf(err.errors.email, 'object');
			done();
		});
	});
});
