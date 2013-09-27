requirejs.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    serializeObject: ['jquery']
  },

  paths: {
    jquery: 'vendor/jquery/jquery',
    underscore: 'vendor/underscore/underscore',
    underscore_string: 'vendor/underscore.string/lib/underscore.string',
    backbone: 'vendor/backbone/backbone',
    serializeObject: 'vendor/jQuery.serializeObject/jquery.serializeObject',
    sjcl: 'vendor/sjcl/sjcl',

    text: 'vendor/requirejs-text/text',
    templates: '../templates',
    css: '../css',

    bootstrap_affix: 'vendor/bootstrap/js/affix',
    bootstrap_alert: 'vendor/bootstrap/js/alert',
    bootstrap_tooltip: 'vendor/bootstrap/js/tooltip',
    bootstrap_button: 'vendor/bootstrap/js/button',
    bootstrap_carousel: 'vendor/bootstrap/js/carousel',
    bootstrap_collapse: 'vendor/bootstrap/js/collapse',
    bootstrap_dropdown: 'vendor/bootstrap/js/dropdown',
    bootstrap_modal: 'vendor/bootstrap/js/modal',
    bootstrap_popover: 'vendor/bootstrap/js/popover',
    bootstrap_scrollspy: 'vendor/bootstrap/js/scrollspy',
    bootstrap_tab: 'vendor/bootstrap/js/tab',
    bootstrap_transition: 'vendor/bootstrap/js/transition',
    bootstrap_typeahead: 'vendor/bootstrap/js/typeahead',
  }
});

require([
  'app',
], function (App) {
  App.initialize();
});
