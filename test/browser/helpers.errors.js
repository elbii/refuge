define([
  'helpers/errors'
], function (Errors) {
  describe('helpers/errors', function () {
    var xhr = { responseText: '{ "message": "hello" }' };

    it('parses xhr', function () {
      assert.equal(Errors.parseXHR(xhr), 'hello');
    });
  });
});
