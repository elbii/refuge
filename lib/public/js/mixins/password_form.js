define([], function () {
  var PasswordForm = {
    togglePasswordVisibility: function (e, target) {
      var passwordField = $('#inputPassword');

      if (passwordField.attr('type') === 'text') {
        passwordField.attr('type', 'password');
        target.hide().html('show').fadeIn('fast');
      } else {
        passwordField.attr('type', 'text');
        target.hide().html('hide').fadeIn('fast');
      }
    }
  };

  return PasswordForm;
});
