define([
  'backbone'
], function(Backbone) {
  var Credential = Backbone.Model.extend({
    idAttribute: '_id',

    urlRoot: '/credentials'
  });

  return Credential;
});
