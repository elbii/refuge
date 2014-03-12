define([
       'backbone',
       'lib/dispatch',
       'views/credentials/list',
       'views/credentials/toolbar',
       'views/credentials/form'
], function (Backbone, Dispatch, List, Toolbar, Form) {

  var CredentialsLayout = Backbone.View.extend({
    className: 'row',

    dispose: function () {
      Dispatch.off('views/credentials/list:edit', this.renderForm);
    },

    initialize: function () {
      this.listView = new List();
      this.toolbarView = new Toolbar();

      Dispatch.on('views/credentials/list:edit', this.renderForm);
    },

    render: function () {
      this.$el.html(this.toolbarView.el);
      this.$el.append(this.listView.el);

      this.listView.render();
      this.toolbarView.render();
    },

    renderForm: function (model) {
      (new Form({model: model})).render();
    }
  });

  return CredentialsLayout;
});
