define([
  'jquery',
  'underscore',
  'backbone',
  'views/credentials/add',
  'text!templates/credentials/toolbar.mtpl'
], function ($, _, Backbone, AddCredential, template) {
  var CredentialsToolbar = Backbone.View.extend({
    call: function (e) {
      var target = $(e.target).closest('[data-action]')
        , func = target.data('action');
      this[func](e, target);
    },

    dispose: function () {
      this.undelegateEvents();
      this.remove();
    },

    events: {
      'click [data-action]': 'call'
    },

    initialize: function () {
    },

    render: function () {
      this.$el.html(this.template());

      this.delegateEvents();
    },

    showAddCredential: function () {
      (new AddCredential()).render();
    },

    template: _.template(template)
  });

  return CredentialsToolbar;
});

