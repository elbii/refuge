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
      this.$el.html(this.template());
      $('body').prepend(this.el);

      this.delegateEvents();
    }
  });

  return Modal;
});
