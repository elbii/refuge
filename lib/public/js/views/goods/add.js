define([
  'jquery',
  'underscore',
  'backbone',
  'views/modal',
  'models/good',
  'mixins/password_form',
  'helpers/flash',
  'helpers/errors',
  'lib/dispatch',
  'text!templates/goods/form.mtpl',
  'serializeObject',
  'bootstrap_alert'
], function ($, _, Backbone, Modal, Good, PasswordForm, Flash, Errors,
  Dispatch, template) {

  var AddGood = Modal.extend({
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
        , good = new Good(attributes)
        , self = this;

      good.save(null, {
        success: function (model) {
          Dispatch.trigger('views/goods/add:success', model);
          self.dispose();
          Flash.success('good created successfully.');
        },
        error: function (model, xhr) {
          Flash.error(Errors.parseXHR(xhr), '#modal-alerts');
        }
      });
    },

    template: _.template(template)
  });

  _.extend(AddGood.prototype, PasswordForm);

  return AddGood;
});
