define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/app/footer.mtpl'
], function ($, _, Backbone, template) {

  var Footer = Backbone.View.extend({
    className: 'row',

    render: function () {
      this.$el.html(this.template());
    },

    template: _.template(template)
  });

  return Footer;
});
