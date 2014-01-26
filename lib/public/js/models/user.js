define([
  'backbone',
  'collections/credentials'
], function (Backbone, Credentials) {
  var User = Backbone.Model.extend({
    idAttribute: '_id',

    urlRoot: function () {
      return '/users';
    }
  });

  return User;
});
