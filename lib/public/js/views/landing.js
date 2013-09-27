define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/password_strength',
  'text!templates/landing.mtpl'
], function ($, _, Backbone, PasswordStrength, template) {
  var Landing = Backbone.View.extend({
    events: {
      'keydown input[type=password]': 'renderPasswordStrength'
    },

    dispose: function () {
      this.undelegateEvents();
      this.remove();
    },

    render: function () {
      this.$el.html(this.template());
    },

    renderPasswordStrength: function (e) {
      var strength = PasswordStrength($(e.target).val())
        , text = $('.strength-meter div', this.el)[0]
        , color = $('.strength-meter div', this.el)[1];

      $(text).html(strength.text);
      $(color).removeClass().addClass(strength.class);
    },

    template: _.template(template)
  });

  return Landing;
});
