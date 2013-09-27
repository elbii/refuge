define([
       'backbone',
       'lib/dispatch',
       'views/landing',
       'views/credentials/credentials_layout'
], function (Backbone, Dispatch, Landing, CredentialsLayout) {
  var ContentLayout = Backbone.View.extend({
    className: 'container',

    dispose: function () {
      if (this.landingView) {
        this.landingView.dispose();
      }

      if (this.credentialsLayout) {
        this.credentialsLayout.dispose();
      }

      Dispatch.off('routers/app:index views/navbar:signOut',
        this.renderLanding);
      Dispatch.off('routers/app:credentials', this.renderCredentials);
    },

    initialize: function () {
      Dispatch.on('routers/app:index views/navbar:signOut', this.renderLanding,
        this);
      Dispatch.on('routers/app:credentials', this.renderCredentials, this);
    },

    renderCredentials: function () {
      if (!this.credentialsLayout) {
        this.credentialsLayout = new CredentialsLayout();
      }

      this.render(this.credentialsLayout);
    },

    renderLanding: function () {
      if (!this.landingView) {
        this.landingView = new Landing();
      }

      this.render(this.landingView);
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
