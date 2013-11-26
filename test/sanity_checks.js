var assert = require('chai').assert
	, Refuge = require('../lib/refuge');

describe('sanity checks', function () {
	it('should be present', function () {
		assert.typeOf(Refuge, 'object', 'App should be defined');
	});
});
