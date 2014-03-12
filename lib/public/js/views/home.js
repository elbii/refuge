define([
  'jquery',
  'backbone',
  'text!templates/home.mtpl'
], function ($, Backbone, template) {

  var Home = Backbone.View.extend({
    className: 'col-sm-12',

    render: function () {
      this.$el.html(this.template());
    },

    template: _.template(template)
  });

  return Home;
});
