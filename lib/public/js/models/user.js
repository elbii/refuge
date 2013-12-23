define([
  'backbone',
  'collections/goods'
], function (Backbone, Goods) {
  var User = Backbone.Model.extend({
    idAttribute: '_id',

    urlRoot: function () {
      return '/users';
    }
  });

  return User;
});
