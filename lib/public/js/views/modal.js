define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {

  var Modal = Backbone.View.extend({
    dispose: function (e) {
      this.undelegateEvents();
      this.remove();
    },

    id: 'modal',

    render: function () {
      if ($('#modal').length === 0) {
        $('body').prepend(this.el);
      }

      this.$el.hide().html(this.template()).fadeIn('fast');

      this.delegateEvents();
    }
  });

  return Modal;
});
