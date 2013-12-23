define([
  'backbone',
  'sjcl'
], function(Backbone, SJCL) {
  var Good = Backbone.Model.extend({
    idAttribute: '_id',

    urlRoot: '/goods'
  });

  return Good;
});
