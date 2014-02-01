// Sanity tests

define([
	'app'
], function (App) {
	describe('app is sane', function () {
		it('should run test', function () {
      assert.isDefined(App);
		});

    it('initializes', function () {
      var spy = sinon.spy($, 'ajax');
      App.initialize();
      assert.equal(spy.called, true);
    });
	});
});
