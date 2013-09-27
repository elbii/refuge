define([
  'backbone',
  'models/user'
], function (Backbone, User) {
  var Session = Backbone.Model.extend({
    idAttribute: '_id',

    loggedIn: function () {
      this.has('user');
    },

    urlRoot: function () {
      return '/sessions';
    }
  });

  // TODO: fetch from server
  return Session;
});
