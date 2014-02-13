define([
  'backbone',
  'lib/dispatch',
  'lib/state',
  'helpers/flash'
], function (Backbone, Dispatch, State, Flash) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'account': 'account',
      'credentials': 'credentials'
    },

    // route handlers
    index: function () {
      Dispatch.trigger('routers/app:index');
    },

    account: function () {
      this._triggerIfAuthenticated('routers/app:account');
    },

    credentials: function () {
      this._triggerIfAuthenticated('routers/app:credentials');
    },

    // utility functions
    _triggerIfAuthenticated: function (route) {
      if (!State.session || (State.session.loggedIn() === false)) {
        this.index();
        Backbone.history.navigate('');
        Flash.error('Must be signed in to access that.');
      } else {
        Dispatch.trigger(route);
      }
    }
  });

  return AppRouter;
});
