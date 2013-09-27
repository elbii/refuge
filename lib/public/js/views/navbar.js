define([
  'jquery',
  'underscore',
  'backbone',
  'views/sign_in',
  'lib/dispatch',
  'lib/state',
  'text!templates/app/navbar.mtpl',
  'bootstrap_dropdown'
], function ($, _, Backbone, SignIn, Dispatch, State, template) {
  var Navbar = Backbone.View.extend({
    call: function (e) {
      var target = $(e.target).closest('[data-action]')
        , func = target.data('action');
      this[func](e, target);
    },

    className: 'navbar navbar-inverse',

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

    renderSignIn: function () {
      (new SignIn()).render();
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
