define([
       'backbone',
       'lib/dispatch',
       'views/credentials/credentials_layout'
], function (Backbone, Dispatch, CredentialsLayout) {
  var ContentLayout = Backbone.View.extend({
    className: 'container',

    dispose: function () {
      if (this.credentialsLayout) {
        this.credentialsLayout.dispose();
      }

      Dispatch.off('routers/app:credentials', this.rendercredentials);
    },

    initialize: function () {
      Dispatch.on('routers/app:credentials', this.renderCredentials, this);
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
