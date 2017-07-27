'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        'public/lib/AdminLTE/bootstrap/css/bootstrap.min.css',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.css',
        'public/lib/AdminLTE/dist/css/AdminLTE.min.css',
        'public/lib/AdminLTE/dist/css/skins/skin-green.css',
        'public/lib/AdminLTE/plugins/iCheck/square/blue.css',
        // 'public/lib/AdminLTE/plugins/morris/morris.css',
        // 'public/lib/AdminLTE/plugins/jvectormap/jquery-jvectormap-1.2.2.css',
        // 'public/lib/AdminLTE/plugins/datepicker/datepicker3.css',
        // 'public/lib/AdminLTE/plugins/daterangepicker/daterangepicker.css',
        // 'public/lib/AdminLTE/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css',
        // endbower
      ],
      js: [
        // bower:js
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/jquery-ui/jquery-ui.min.js',
        'public/lib/AdminLTE/fastclick/fastclick.js',
        'public/lib/AdminLTE/plugins/slimScroll/jquery.slimscroll.min.js',
        'public/lib/AdminLTE/plugins/iCheck/icheck.min.js',
        'public/lib/AdminLTE/dist/js/app.min.js',
        'public/lib/angular/angular.js',
        'public/lib/ckeditor/ckeditor.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/ng-file-upload/ng-file-upload.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-mocks/angular-mocks.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-ui-notification/dist/angular-ui-notification.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        // endbower
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/{css,less,scss}/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    img: [
      'modules/**/*/img/**/*.jpg',
      'modules/**/*/img/**/*.png',
      'modules/**/*/img/**/*.gif',
      'modules/**/*/img/**/*.svg'
    ],
    views: ['modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: ['modules/*/server/config/*.js'],
    policies: 'modules/*/server/policies/*.js',
    views: ['modules/*/server/views/*.html']
  }
};
