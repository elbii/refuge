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
      'goods': 'goods'
    },

    index: function () {
      Dispatch.trigger('routers/app:index');
    },

    account: function () {
      if (!State.session || State.session.loggedIn() === false) {
        this.index();
        Backbone.history.navigate('');
        Flash.error('Must be signed in to access that.');
      } else {
        Dispatch.trigger('routers/app:account');
      }
    },

    goods: function () {
      if (!State.session || State.session.loggedIn() === false) {
        this.index();
        Backbone.history.navigate('');
        Flash.error('Must be signed in to access that.');
      } else {
        Dispatch.trigger('routers/app:goods');
      }
    }
  });

  return AppRouter;
});
