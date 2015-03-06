var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var jade = require('gulp-jade');

gulp.task('connect', function() {
  connect.server({
      root: 'public',
      port: 8080,
      livereload: true
  });
});

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass( { errLogToConsole: true }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('jade', function() {
  var views_to_html = {};

  gulp.src('./views/**/*.jade')
    .pipe(jade( { 
      locals : views_to_html,
      pretty: true,
      errLogToConsole: true }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('livereload', function() {
  gulp.src('./public/**/*')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./views/**/*.jade', ['jade']);
  gulp.watch('./public/**/*', ['livereload']);
});

gulp.task('default', ['connect','watch','sass']);
gulp.task('no-server', ['watch','sass']);