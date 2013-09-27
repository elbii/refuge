define([
  'jquery',
  'underscore',
  'backbone',
  'views/modal',
  'models/credential',
  'mixins/password_form',
  'helpers/flash',
  'helpers/errors',
  'lib/dispatch',
  'text!templates/credentials/form.mtpl',
  'serializeObject',
  'bootstrap_alert'
], function ($, _, Backbone, Modal, Credential, PasswordForm, Flash, Errors,
  Dispatch, template) {

  var AddCredential = Modal.extend({
    call: function (e) {
      var target = $(e.target).closest('[data-action]')
        , func = target.data('action');
      this[func](e, target);
    },

    events: {
      'click [data-action]': 'call'
    },

    submit: function () {
      var attributes = $('#modal form').serializeObject()
        , credential = new Credential(attributes)
        , self = this;

      credential.save(null, {
        success: function (model) {
          Dispatch.trigger('views/credentials/add:success', model);
          self.dispose();
          Flash.success('Credential created successfully.');
        },
        error: function (model, xhr) {
          Flash.error(Errors.parseXHR(xhr), '#modal-alerts');
        }
      });
    },

    template: _.template(template)
  });

  _.extend(AddCredential.prototype, PasswordForm);

  return AddCredential;
});
