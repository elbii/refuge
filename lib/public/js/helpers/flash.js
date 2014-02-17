define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/app/success.mtpl',
  'text!templates/app/error.mtpl'
], function ($, _, Backbone, SuccessTemplate, ErrorTemplate) {
  var flash = function (type, message, target, timeout) {
    var selector = target ? $(target) : $('#alerts')
      , html;

    if (type === 'error') {
      html = _.template(ErrorTemplate)({message: message});
    } else if (type === 'success') {
      html = _.template(SuccessTemplate)({message: message});
    }

    selector.hide().html(html).fadeIn('fast');

    if (timeout || (type === 'success')) {
      setTimeout(function () { selector.empty(); }, timeout || 2000);
    }
  };

  var Flash = {
    error: function (message, target, timeout) {
      flash('error', message, target, timeout);
    },
    success: function (message, target, timeout) {
      flash('success', message, target, timeout);
    }
  };

  return Flash;
});
