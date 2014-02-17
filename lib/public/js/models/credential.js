define([
  'backbone',
  'lib/state'
], function(Backbone, State) {
  var Credential = Backbone.Model.extend({
    idAttribute: '_id',

    save: function (key, val, options) {
      this._beforeSave(key, val, options);
      Backbone.Model.prototype.save.call(this, key, val, options);
    },

    urlRoot: '/credentials',

    _beforeSave: function (key, val, options) {
      this._encryptData();
    },

    _encryptData: function () {
      // TODO: redirect to generate master password if haven't already
      var serialized = JSON.stringify({
            login: this.get('login'),
            password: this.get('password') })
        , encryptedData = sjcl.encrypt(State.user.get('publicKey'), serialized);

      this.unset('login');
      this.unset('password');

      this.set('data', encryptedData);
    }
  });

  return Credential;
});
