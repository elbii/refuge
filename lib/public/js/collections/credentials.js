define([
  'backbone',
  'models/credential'
], function (Backbone, Credential) {
  var Credentials = Backbone.Collection.extend({
    model: Credential,

    url: '/credentials'
  });

  return Credentials;
});
