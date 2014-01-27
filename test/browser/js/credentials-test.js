define([
	'app',
	'chai'
], function (App, chai) {
	console.log('OH MY GOD');
	describe('sanity tests', function () {
		it('has app present', function () {
			chai.assert.isDefined(App);
		});
	});
});
