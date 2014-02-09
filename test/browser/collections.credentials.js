define([
  'collections/credentials'
], function (Credentials) {
	describe('sanity tests', function () {
    var credentials = new Credentials();

    it('has proper model', function () {
      assert.isFunction(credentials.model);
    });

    it('has proper url', function () {
      assert.equal(credentials.url, '/credentials');
    });
	});
});
