define([
       'backbone',
       'lib/dispatch',
       'views/landing',
       'views/goods/goods_layout'
], function (Backbone, Dispatch, Landing, GoodsLayout) {
  var ContentLayout = Backbone.View.extend({
    className: 'container',

    dispose: function () {
      if (this.landingView) {
        this.landingView.dispose();
      }

      if (this.goodsLayout) {
        this.goodsLayout.dispose();
      }

      Dispatch.off('routers/app:index views/navbar:signOut',
        this.renderLanding);
      Dispatch.off('routers/app:goods', this.rendergoods);
    },

    initialize: function () {
      Dispatch.on('routers/app:index views/navbar:signOut', this.renderLanding,
        this);
      Dispatch.on('routers/app:goods', this.rendergoods, this);
    },

    rendergoods: function () {
      if (!this.goodsLayout) {
        this.goodsLayout = new GoodsLayout();
      }

      this.render(this.goodsLayout);
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
