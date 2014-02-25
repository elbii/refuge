define([
  'backbone',
  'text!templates/account.mtpl'
], function (Backbone, template) {
  var Account = Backbone.View.extend({
    className: 'col-sm-12',

    render: function () {
      this.$el.hide().html(this.template()).fadeIn('fast');
    },

    template: _.template(template)
  });

  return Account;
});
