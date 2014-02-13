// Sanity tests

define([
	'refuge'
], function (Refuge) {
	describe('app is sane', function () {
    it('initializes', function () {
      var spy = sinon.spy($, 'ajax');
      Refuge.initialize();
      assert.equal(spy.called, true);
    });
	});
});
