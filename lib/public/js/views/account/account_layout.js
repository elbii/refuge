define([
  'backbone'
], function (Backbone) {
  var AccountLayout = Backbone.View.extend({
    className: 'col-sm-12',

    dispose: function () {
      this.detailsView.dispose();
      this.deleteView.dispose();
      this.importView.dispose();
      this.sessionsView.dispose();
    },

    initialize: function () {
      this.detailsView = new AccountDetailsView();
      this.deleteView = new DeleteAccountView();
      this.importView = new ImportExportView();
      this.sessionsView = new SessionsView();
    },

    render: function () {
      this.detailsView.render();
      this.deleteView.render();
      this.importView.render();
      this.sessionsView.render();
    }
  });

  return AccountLayout;
});
  
