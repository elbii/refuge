define([
       'backbone',
       'lib/dispatch',
       'views/credentials/list',
       'views/credentials/toolbar',
       'views/credentials/edit'
], function (Backbone, Dispatch, List, Toolbar, Edit) {

  var CredentialsLayout = Backbone.View.extend({
    dispose: function () {
      Dispatch.off('views/credentials/list:edit', this.renderEdit);
    },

    initialize: function () {
      this.listView = new List();
      this.toolbarView = new Toolbar();

      Dispatch.on('views/credentials/list:edit', this.renderEdit);
    },

    render: function () {
      this.listView.render();
      this.toolbarView.render();

      this.$el.html(this.toolbarView.el);
      this.$el.append(this.listView.el);
    },

    renderEdit: function (model) {
      (new Edit({model: model})).render();
    }
  });

  return CredentialsLayout;
});
