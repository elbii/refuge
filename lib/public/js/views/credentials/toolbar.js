define([
  'jquery',
  'underscore',
  'backbone',
  'views/credentials/add',
  'models/credential',
  'text!templates/credentials/toolbar.mtpl'
], function ($, _, Backbone, AddCredential, Credential, template) {

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

    render: function () {
      this.$el.hide().html(this.template()).fadeIn('fast');

      this.delegateEvents();
    },

    showAddCredential: function () {
      (new AddCredential({
        model: new Credential()
      })).render();
    },

    template: _.template(template)
  });

  return CredentialsToolbar;
});

