define([], function () {
  var PasswordForm = {
    togglePasswordVisibility: function (e, target) {
      var passwordField = $('#inputPassword');

      if (passwordField.attr('type') === 'text') {
        passwordField.attr('type', 'password');
        target.html('show');
      } else {
        passwordField.attr('type', 'text');
        target.html('hide');
      }
    }
  };

  return PasswordForm;
});
