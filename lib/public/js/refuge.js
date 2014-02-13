define([
  'jquery',
  'underscore',
  'backbone',
  'routers/app_router',
  'views/app_layout',
  'lib/state',
  'models/session',
  'models/user',
  'helpers/flash'
], function ($, _, Backbone, AppRouter, AppLayout, State, Session, User, Flash) {
  var App = {
    initialize: function () {
      // load session from server (cookie-based)
      $.ajax({
        url: '/session',
        dataType: 'json',
        success: function (session) {
          State.session = new Session(session);
        },
        complete: function () {
          new AppLayout();
          new AppRouter();
          Backbone.history.start({pushState: true});
        }
      });

      // intercept all links unless they contain a data-bypass attribute
      $(document).on('click', 'a[href]:not([data-bypass])', function (e) {
        var href = {prop: $(this).prop('href'), attr: $(this).attr('href')};
        var root = location.protocol + '//' + location.host + '/';

        if (href.prop.slice(0, root.length) === root) {
          e.preventDefault();
          Backbone.history.navigate(href.attr, true);
        }
      });
    }
  };

  return App;
});
