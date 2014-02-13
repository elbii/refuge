define([
  'jquery',
  'underscore',
  'backbone',
  'views/modal',
  'models/session',
  'models/user',
  'helpers/flash',
  'lib/dispatch',
  'lib/state',
  'text!templates/app/sign_up.mtpl',
  'serializeObject'
], function ($, _, Backbone, Modal, Session, User, Flash, Dispatch, State, template) {

  var SignUp = Modal.extend({
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

      var user = new User(attributes);
      user.save(null, {
        success: function (user) {
          self._createSession(attributes, self);
        },
        error: function (user, xhr) {
          Flash.error(xhr.responseJSON.message, '#modal-alerts');
        }
      });
    },

    _createSession: function (attributes, scope) {
      State.session = new Session(attributes);
      State.session.save(null, {
        success: function (session) {
          scope.dispose();
          Dispatch.trigger('views/sign_in:sign_in');
          Backbone.history.navigate('/credentials', true);
        },
        error: function (session, xhr) {
          Flash.error(xhr.responseJSON.message, '#modal-alerts');
        }
      });
    },

    template: _.template(template)
  });

  return SignUp;
});

