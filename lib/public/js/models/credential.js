define([
  'backbone',
  'sjcl'
], function(Backbone, SJCL) {
  var Credential = Backbone.Model.extend({
    idAttribute: '_id',

    urlRoot: '/credentials'
  });

  return Credential;
});
