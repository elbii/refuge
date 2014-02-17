define([
  'jquery',
  'backbone',
  'text!templates/home.mtpl'
], function ($, Backbone, template) {

  var Home = Backbone.View.extend({
    render: function () {
      this.$el.hide().html(this.template()).fadeIn('fast');
    },

    template: _.template(template)
  });

  return Home;
});
