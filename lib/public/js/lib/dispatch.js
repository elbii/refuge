define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  var Dispatch = _.clone(Backbone.Events);

  return Dispatch;
});
