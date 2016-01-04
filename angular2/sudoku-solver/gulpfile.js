var gulp = require('gulp'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    tsc = require('gulp-tsc'),
    sass = require('gulp-sass');

gulp.task('default', [ 'server', 'watch' ]);

gulp.task('typescript', function () {
  gulp.src('./src/Solver.ts')
      .pipe(tsc({ target: 'ES5', noImplicitAny: true }))
      .pipe(gulp.dest('./dist'))
      .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('./src/**/*.html')
      .pipe(gulp.dest('./dist'))
      .pipe(connect.reload());
});

gulp.task('scss', function () {
  gulp.src('./src/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./dist'))
      .pipe(connect.reload());
});

gulp.task('server', function () {
  connect.server({ livereload: true, root: './dist' });
});

gulp.task('watch', [ 'typescript', 'html', 'scss' ], function () {
  var watchers = { ts: 'typescript', scss: 'scss', html: 'html' };
  for (var key in watchers) gulp.watch([ 'src/**/*.' + key ], [ watchers[key] ]);
});
