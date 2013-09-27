define([
  'backbone',
  'lib/dispatch',
  'helpers/flash',
  'views/navbar',
  'views/content_layout',
  'views/footer'
], function (Backbone, Dispatch, Flash, Navbar, ContentLayout,
  Footer) {

  var AppLayout = Backbone.View.extend({
    el: 'body',

    initialize: function () {
      this.navbarView = new Navbar();
      this.contentLayout = new ContentLayout();
      this.footerView = new Footer();

      // app layout is rendered upon application load
      this.render();
    },

    render: function () {
      this.navbarView.render();
      this.contentLayout.render();
      this.footerView.render();

      this.$el.empty();

      this.$el.append(this.navbarView.el);
      this.$el.append("<div id='alerts' class='container'></div>");
      this.$el.append(this.contentLayout.el);
      this.$el.append(this.footerView.el);
    }
  });

  return AppLayout;
});
