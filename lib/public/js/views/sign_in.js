define([
  'jquery',
  'underscore',
  'backbone',
  'views/modal',
  'models/session',
  'helpers/flash',
  'lib/dispatch',
  'lib/state',
  'models/user',
  'text!templates/app/sign_in.mtpl',
  'serializeObject'
], function ($, _, Backbone, Modal, Session, Flash, Dispatch, State, User,
  template) {

  var SignIn = Modal.extend({
    call: function (e) {
      var target = $(e.target).closest('[data-action]')
        , func = target.data('action');
      this[func](e, target);
    },

    submitIfEnterPressed: function (e) {
      if (e.keyCode == 13) {
        this.submit();
      }
    },

    events: {
      'click [data-action]': 'call',
      'keyup form input': 'submitIfEnterPressed'
    },

    submit: function () {
      var attributes = $('#modal form').serializeObject()
        , self = this;

      State.session = new Session(attributes);

      State.session.save(null, {
        success: function (session) {
          State.user = new User(session.get('user'));
          session.unset('user');
          self.dispose();
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

  return SignIn;
});
