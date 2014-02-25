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
    bootstrap: 'vendor/bootstrap',
    jquery: 'vendor/jquery',
    underscore: 'vendor/underscore',
    underscore_string: 'vendor/underscore.string',
    backbone: 'vendor/backbone',
    serializeObject: 'vendor/jQuery.serializeObject',
    sjcl: 'vendor/sjcl',
    sha512: 'vendor/sha512',
    text: 'vendor/requirejs-text',
    templates: '../templates',
    css: '../css'
  }
});

require([
  'refuge',
], function (Refuge) {
  Refuge.initialize();
});
