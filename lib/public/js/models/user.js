define([
  'backbone',
  'collections/credentials',
  'lib/crypto'
], function (Backbone, Credentials, Crypto) {

  var User = Backbone.Model.extend({
    idAttribute: '_id',

    // keys are generally created upon user sign up
    // password contains clear text password at entry to this function
    rehash: function () {
      var pwHash = Crypto.sha512(this.get('password'))
        , keyHash = Crypto.sha512(pwHash + this.get('password'))
        , keypair = Crypto.userKeypair(keyHash);

      // hash password
      this.set('password', pwHash, { silent: true });

      // gen encrypted keypair
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
      this.set('password', Crypto.sha512(this.get('password')));
    }
  });

  return User;
});
