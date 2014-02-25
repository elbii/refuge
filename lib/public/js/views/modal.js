define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap'
], function ($, _, Backbone) {

  var Modal = Backbone.View.extend({
    dispose: function (e) {
      this.$el.modal('hide');
      this.undelegateEvents();
    },

    el: '#modal',

    render: function () {
      this.$el.html(this.template());

      this.$el.modal('show');
      this.delegateEvents();
    }
  });

  return Modal;
});
