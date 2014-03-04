define([
  'backbone',
  'models/user',
  'lib/crypto'
], function (Backbone, User, Crypto) {
  var Session = Backbone.Model.extend({
    idAttribute: '_id',

    loggedIn: function () {
      this.has('user');
    },

    save: function (key, val, options) {
      this._beforeSave(key, val, options);
      Backbone.Model.prototype.save.call(this, key, val, options);
    },

    urlRoot: function () {
      return '/sessions';
    },

    _beforeSave: function (key, val, options) {
      this.set(
        'password',
        Crypto.sha512(this.get('password')),
        { silent: true }
      );
    }
  });

  // TODO: fetch from server
  return Session;
});
