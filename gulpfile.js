var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var jade = require('gulp-jade');
var server = require( 'gulp-express');

gulp.task('connect', function() {
  connect.server({
      root: 'app',
      port: 8080,
      livereload: true
  });
});

gulp.task('server', function() {
  server.run(['app.js']);
  
  gulp.watch('./sass/**/*.scss', [server.notify]);
  gulp.watch('./views/**/*.jade', [server.notify]);
  // have no idea if below line works
  gulp.watch('./app/js/app.js', [server.run(['app.js'])]);

});

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass( { errLogToConsole: true }))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('jade', function() {
  var views_to_html = {};

  gulp.src('./views/**/*.jade')
    .pipe(jade( { 
      locals : views_to_html,
      pretty: true,
      errLogToConsole: true }))
    .pipe(gulp.dest('./app/'));
});

gulp.task('livereload', function() {
  gulp.src('./app/**/*')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./views/**/*.jade', ['jade']);
  gulp.watch('./app/**/*', ['livereload']);
});

gulp.task('default', ['server','watch','sass']);
gulp.task('connect', ['connect','watch','sass']);
gulp.task('no-server', ['watch','sass']);