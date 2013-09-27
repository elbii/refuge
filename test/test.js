var expect = require('chai').expect
  , assert = require('chai').assert
  , Refuge = require('../lib-cov/refuge');

describe('Refuge', function () {
	describe('sanity checks', function () {
		it('should be present', function () {
			expect(Refuge).to.exist;
		});
	});
});
