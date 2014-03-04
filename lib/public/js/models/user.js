define([
  'backbone',
  'collections/credentials',
  'lib/crypto',
  'sha512',
], function (Backbone, Credentials, Crypto, SHA512) {

  var User = Backbone.Model.extend({
    idAttribute: '_id',

    // keys are generally created upon user sign up.
    // password contains clear text password at this point
    rehash: function () {
      var shaObj1 = new SHA512(this.get('password'), 'TEXT')
        , shaObj2 = new SHA512(shaObj1 + this.get('password'), 'TEXT')
        , pwHash = shaObj1.getHash('SHA-512', 'HEX')
        , keyHash = shaObj2.getHash('SHA-512', 'HEX')
        , keypair = Crypto.userKeypair(keyHash);

      this.set('publicKey', keypair.pub);
      this.set('encryptedPrivateKey', keypair.sec);
    },

    // override save to insert triggers
    save: function (key, val, options) {
      // beforeCreate
      if (this.isNew()) {
        this._beforeCreate(key, val, options);
      }

      Backbone.Model.prototype.save.call(this, key, val, options);
    },

    urlRoot: function () {
      return '/users';
    },

    _beforeCreate: function (key, val, options) {
      this.rehash();
    },

    _hashPassword: function () {
      var shaObj = new SHA512(this.get('password'), 'TEXT');
      this.set('password', shaObj.getHash('SHA-512', 'HEX'));
      console.log(this.get('password'));
      console.log(this);
    }
  });

  return User;
});
