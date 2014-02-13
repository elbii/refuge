define([
       'backbone',
       'lib/dispatch',
       'views/credentials/credentials_layout',
       'views/home'
], function (Backbone, Dispatch, CredentialsLayout, HomeView) {

  var ContentLayout = Backbone.View.extend({
    dispose: function () {
      if (this.credentialsLayout) {
        this.credentialsLayout.dispose();
      }

      if (this.homeView) {
        this.homeView.dispose();
      }

      Dispatch.off('routers/app:credentials', this.renderCredentials);
      Dispatch.off('routers/app:index', this.renderHome);
    },

    initialize: function () {
      Dispatch.on('routers/app:credentials', this.renderCredentials, this);
      Dispatch.on('routers/app:index', this.renderHome, this);
    },

    renderHome: function () {
      console.log('rendering home');
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
      this.$el.html(view.el);
    }
  });

  return ContentLayout;
});
