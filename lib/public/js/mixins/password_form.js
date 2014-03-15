define([
  'lib/crypto'
], function (Crypto) {
  var hasNumber = function (string) {
    return /\d/.test(string);
  };

  var hasSpecial = function (string) {
    return ! /^[a-z0-9]+$/i.test(string);
  };

  var PasswordForm = {
    generate: function (e, target) {
      var password = Crypto.randomPassword(25)
        , $passwordField = $('#inputPassword');

      $passwordField.val(password);

      // jQuery doesn't trigger input events
      $passwordField.trigger('input');
    },

    strengthClass: function (password) {
      var weakClass = 'password-strength-weak progress-bar-danger'
        , mediumClass = 'password-strength-medium progress-bar-warning'
        , strongClass = 'password-strength-strong progress-bar-success';

      if (!password) {
        return weakClass;
      }

      var l = password.length;

      if (l > 15 && hasNumber(password) && hasSpecial(password)) {
        return strongClass;
      } else if (l >= 8 && l < 15 && hasNumber(password)
                 && hasSpecial(password)) {

        return mediumClass;
      } else {
        return weakClass;
      }
    },

    togglePasswordVisibility: function (e, target) {
      var $passwordField = $('#inputPassword');

      if ($passwordField.attr('type') === 'text') {
        $passwordField.attr('type', 'password');
        target.html('show');
      } else {
        $passwordField.attr('type', 'text');
        target.html('hide');
      }
    }
  };

  return PasswordForm;
});
