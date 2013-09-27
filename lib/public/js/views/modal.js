define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap_modal'
], function ($, _, Backbone) {
  var Modal = Backbone.View.extend({
    className: 'modal hide',

    dispose: function (e) {
      this.$el.modal('hide');
      this.undelegateEvents();
      this.remove();
    },

    id: 'modal',

    render: function () {
      this.$el.html(this.template());
      $('body').prepend(this.el);

      this.$el.modal('show');

      this.delegateEvents();
    }
  });

  return Modal;
});
