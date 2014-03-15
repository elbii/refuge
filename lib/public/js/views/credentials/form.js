define([
  'jquery',
  'underscore',
  'backbone',
  'views/modal',
  'models/credential',
  'mixins/password_form',
  'helpers/flash',
  'lib/dispatch',
  'text!templates/credentials/form.mtpl',
  'serializeObject'
], function ($, _, Backbone, Modal, Credential, PasswordForm, Flash,
  Dispatch, template) {

  var CredentialForm = Modal.extend({
    call: function (e) {
      var target = $(e.target).closest('[data-action]')
        , func = target.data('action');
      this[func](e, target);
    },

    events: {
      'click [data-action]': 'call',
      'input #inputPassword': 'updatePasswordStrength'
    },

    submit: function () {
      var attributes = $('#modal form').serializeObject()
        , self = this;

      this.model.save(attributes, {
        success: function (model) {
          self.dispose();
          Flash.success('credential saved successfully.');
          Dispatch.trigger('views/credentials/form:success', model);
        },
        error: function (model, xhr) {
          Flash.error(xhr.responseJSON.message, '#modal-alerts');
        }
      });
    },

    template: _.template(template),

    updatePasswordStrength: function () {
      var $strengthBar = $('#strengthBar')
        , password = $('#inputPassword').val();

      $strengthBar.removeClass(
        'password-strength-weak ' +
        'password-strength-medium ' +
        'password-strength-strong ' +
        'progress-bar-success ' +
        'progress-bar-warning ' +
        'progress-bar-danger'
      );

      $strengthBar.addClass(this.strengthClass(password));
    }
  });

  _.extend(CredentialForm.prototype, PasswordForm);

  return CredentialForm;
});
