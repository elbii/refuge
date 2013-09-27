define([
  'jquery',
  'underscore',
  'backbone',
  'views/modal',
  'models/session',
  'helpers/flash',
  'lib/dispatch',
  'lib/state',
  'text!templates/app/sign_in.mtpl',
  'serializeObject'
], function ($, _, Backbone, Modal, Session, Flash, Dispatch, State, template) {

  var SignIn = Modal.extend({
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
        , self = this;

      State.session = new Session(attributes);

      State.session.save(null, {
        success: function (session) {
          self.dispose();
          Dispatch.trigger('views/sign_in:sign_in');
          Backbone.history.navigate('/credentials', true);
        },
        error: function (session, xhr) {
          Flash('error', xhr, '#modal-alerts');
        }
      });
    },

    template: _.template(template)
  });

  return SignIn;
});
