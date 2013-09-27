define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var PasswordStrength = function (password) {
    if (!password) {
      return {class: 'password-strength-weak', text: 'Weak'};
    }

    var l = password.length;

    if (l < 6) {
      return {class: 'password-strength-weak', text: 'Weak'};
    } else if (l >= 6 && l < 10) {
      return {class: 'password-strength-medium', text: 'Medium'};
    } else {
      return {class: 'password-strength-strong', text: 'Strong'};
    }
  };

  return PasswordStrength;
});
