var tests = [];
for (var file in window.__karma__.files) {
	if (/test\/browser\//.test(file) && !/main.js$/.test(file)) {
		tests.push(file);
	}
}

requirejs.config({
	baseUrl: '/base/lib/public/js',

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
    text: 'vendor/requirejs-text',
    jquery: 'vendor/jquery',
    underscore: 'vendor/underscore',
    underscore_string: 'vendor/underscore.string',
    backbone: 'vendor/backbone',
    serializeObject: 'vendor/jQuery.serializeObject',
    sjcl: 'vendor/sjcl',
    templates: '../templates',
    css: '../css'
  },

	deps: tests,

	callback: window.__karma__.start
});
