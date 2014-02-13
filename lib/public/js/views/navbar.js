define([
  'jquery',
  'underscore',
  'backbone',
  'views/sign_in',
  'views/sign_up',
  'lib/dispatch',
  'lib/state',
  'text!templates/app/navbar.mtpl'
], function ($, _, Backbone, SignIn, SignUp, Dispatch, State, template) {

  var Navbar = Backbone.View.extend({
    call: function (e) {
      var target = $(e.target).closest('[data-action]')
        , func = target.data('action');
      this[func](e, target);
    },

    dispose: function () {
      Dispatch.off('views/sign_in:sign_in', this.render);
    },

    events: {
      'click [data-action]': 'call'
    },

    initialize: function () {
      Dispatch.on('views/sign_in:sign_in', this.render, this);
    },

    render: function () {
      this.$el.html(this.template({session: State.session}));
    },

    signIn: function () {
      (new SignIn()).render();
    },

    signUp: function () {
      (new SignUp()).render();
    },

    signOut: function () {
      var self = this;

      State.session.destroy({
        success: function () {
          Dispatch.trigger('views/navbar:signOut');
          Backbone.history.navigate('');

          delete State.session;
          self.render();
        }
      });

    },

    template: _.template(template)
  });

  return Navbar;
});
