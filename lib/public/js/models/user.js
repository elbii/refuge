define([
  'backbone',
  'collections/credentials',
  'lib/crypto',
  'sha512',
], function (Backbone, Credentials, Crypto, SHA512) {
  var User = Backbone.Model.extend({
    genKeys: function () {
      // TODO: find more secure method of generating hash
      var combined = this.get('email') + this.get('password')
        , shaObj = new SHA512(combined, 'TEXT')
        , hash = shaObj.getHash('SHA-512', 'HEX')
        , keypair = Crypto.userKeypair(hash);

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
