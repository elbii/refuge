module.exports = function (grunt) {
  grunt.initConfig({
    bowercopy: {
      options: {
        clean: true
      },
      css: {
        options: {
          destPrefix: 'lib/public/css/vendor'
        },
        files: {
          'bootstrap.css': 'bootstrap/dist/css/bootstrap.css',
          'bootstrap-theme.css': 'bootstrap/dist/css/bootstrap-theme.css'
        }
      },
      libs: {
        options: {
          destPrefix: 'lib/public/js/vendor'
        },
        files: {
          'bootstrap.js': 'bootstrap/dist/js/bootstrap.js',
          'backbone.js': 'backbone/backbone.js',
          'jQuery.serializeObject.js': 'jQuery.serializeObject/jQuery.serializeObject.js',
          'jquery.js': 'jquery/dist/jquery.js',
          'requirejs-text.js': 'requirejs-text/text.js',
          'require.js': 'requirejs/require.js',
          'sjcl.js': 'sjcl/sjcl.js',
          'underscore.string.js': 'underscore.string/lib/underscore.string.js',
          'underscore.js': 'underscore/underscore.js'
        }
      }
    }
  });

  grunt.registerTask('default', 'Hello Grunt', function () {
    console.log('HELLO GRUNT');
  });

  grunt.loadNpmTasks('grunt-bowercopy');
};
