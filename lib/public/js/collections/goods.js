define([
  'backbone',
  'models/good'
], function (Backbone, Good) {
  var Goods = Backbone.Collection.extend({
    model: Good,

    url: '/goods'
  });

  return Goods;
});
