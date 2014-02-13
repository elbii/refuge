define([
  'helpers/flash'
], function (Flash) {
  describe('helpers/flash', function () {
    var spy = sinon.spy(_, 'template');

    beforeEach(function () {
      spy.reset();
    });

    it('error with no target', function () {
      Flash.error('test error');
      assert.equal(spy.called, true);
    });

    it('success with no target', function () {
      Flash.success('test success');
      assert.equal(spy.called, true);
    });
  });
});
