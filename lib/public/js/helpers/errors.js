define([
  'underscore',
  'underscore_string'
], function (_) {
  var Errors = {
    parseXHR: function (xhr) {
      return JSON.parse(xhr.responseText).message;

      /*
       * Rails-style errors
      var errors = JSON.parse(xhr.responseText).errors
        , errorString = '';

      for (var error in errors) {
        errorString += _.str.capitalize(error) + ' ' +
          errors[error] + '. ';
      }

      return errorString;
      */
    }
  };

  return Errors;
});
