
var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('scripts', function() {
  return gulp.src('public/scripts/main/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : true,
      shim:{
          jquery: {
              path: 'bower_components/jquery/dist/jquery.js',
              exports: '$'
          },
          angular: {
              path: 'bower_components/angular/angular.js',
              exports: 'angular',
              depends: {
                  jquery: 'jQuery'
              }
          },
          bootstrap: {
              path: 'bower_components/bootstrap/dist/js/bootstrap.js',
              exports: null,
              depends: {
                  jquery: 'jQuery'
              }
          },
          //'ui-bootstrap': {
          //    path: 'bower_components/angular-bootstrap/ui-bootstrap.js',
          //    exports: null,
          //    depends: {
          //        angular: 'angular'
          //    }
          //},
          //'ui-bootstrap-tpls': {
          //    path: 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
          //    exports: null,
          //    depends: {
          //        angular: 'angular',
          //        'ui-bootstrap': null
          //    }
          //},
          'angular-route': {
              path: 'bower_components/angular-route/angular-route.js',
              exports: null,
              depends: {
                  angular: 'angular'
              }
          }
          //lodash: {
          //    path: 'bower_components/lodash/dist/lodash',
          //    exports: '_'
          //},
          //'bootstrap-wizard': {
          //    path: 'bower_components/bootstrap-wizard/jquery.bootstrap.wizard.js',
          //    exports: null,
          //    depends: {
          //        jquery: 'jQuery',
          //        bootstrap: 'bootstrap'
          //    }
          //}
      }
    }))
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function(){
    gulp.watch('public/scripts/**/*.js', ['scripts']);
    //gulp.watch('less/**/*.less', ['less']);
    //gulp.watch('less/gulpLessColorMaps.js', ['less']);
});

gulp.task('default', ['scripts']);