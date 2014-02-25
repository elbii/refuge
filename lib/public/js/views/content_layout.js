define([
       'backbone',
       'lib/dispatch',
       'views/credentials/credentials_layout',
       'views/home',
       'views/account',
       'lib/state'
], function (Backbone, Dispatch, CredentialsLayout, HomeView, AccountView,
  State) {

  var ContentLayout = Backbone.View.extend({
    className: 'row',

    dispose: function () {
      if (this.credentialsLayout) {
        this.credentialsLayout.dispose();
      }

      if (this.homeView) {
        this.homeView.dispose();
      }

      Dispatch.off('routers/app:credentials', this.renderCredentials);
      Dispatch.off('routers/app:index', this.renderHome);
      Dispatch.off('routers/app:account', this.renderAccount, this);
    },

    initialize: function () {
      Dispatch.on('routers/app:credentials', this.renderCredentials, this);
      Dispatch.on('routers/app:index', this.renderHome, this);
      Dispatch.on('routers/app:account', this.renderAccount, this);
    },

    renderAccount: function () {
      if (!this.accountView) {
        this.accountView = new AccountView({ model: State.user });
      }

      this.render(this.accountView);
    },

    renderHome: function () {
      if (!this.homeView) {
        this.homeView = new HomeView();
      }

      this.render(this.homeView);
    },

    renderCredentials: function () {
      if (!this.credentialsLayout) {
        this.credentialsLayout = new CredentialsLayout();
      }

      this.render(this.credentialsLayout);
    },

    render: function (view) {
      if (!view) {
        return;
      }

      view.render();
      this.$el.hide().html(view.el).fadeIn('fast');
    }
  });

  return ContentLayout;
});
