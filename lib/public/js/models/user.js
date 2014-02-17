define([
  'backbone',
  'collections/credentials',
  'lib/crypto'
], function (Backbone, Credentials, Crypto) {
  var User = Backbone.Model.extend({
    genKeys: function () {
      var keypair = Crypto.userKeypair(this.get('masterPassword'));

      // don't save password on user model!
      this.unset('masterPassword');

      this.set('publicKey', keypair.pub);
      this.set('encryptedPrivateKey', keypair.sec);
    },

    idAttribute: '_id',

    urlRoot: function () {
      return '/users';
    }
  });

  return User;
});
