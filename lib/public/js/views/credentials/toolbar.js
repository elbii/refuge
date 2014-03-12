define([
  'jquery',
  'underscore',
  'backbone',
  'lib/dispatch',
  'views/credentials/form',
  'models/credential',
  'text!templates/credentials/toolbar.mtpl'
], function ($, _, Backbone, Dispatch, CredentialForm, Credential, template) {

  var CredentialsToolbar = Backbone.View.extend({
    call: function (e) {
      var target = $(e.target).closest('[data-action]')
        , func = target.data('action');
      this[func](e, target);
    },

    className: 'col-sm-12',

    dispose: function () {
      this.undelegateEvents();
      this.remove();
    },

    events: {
      'click [data-action]': 'call',
      'keyup input': 'triggerFilter'
    },

    render: function () {
      this.$el.html(this.template());

      this.delegateEvents();
    },

    showCredentialForm: function () {
      (new CredentialForm({
        model: new Credential()
      })).render();
    },

    template: _.template(template),

    triggerFilter: function () {
      var self = this
        , $context = $('input', this.el);

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(function () {
        delete this.timeout;
        Dispatch.trigger('views/credentials/toolbar:filter', $context.val());
      }, 200);
    }
  });

  return CredentialsToolbar;
});

