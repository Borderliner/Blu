var gulp     = require('gulp'),
    less     = require('gulp-less'),
    rename   = require('gulp-rename'),
	  gutil    = require('gulp-util'),
    path     = require('path');

gulp.task('less -> css', function() {
  gulp.src(path.join('src', 'less', '**', '*.less'))
  .pipe(less({
    paths: [ path.join(__dirname, 'src', 'less', 'includes') ],
    compress: false,
  }).on('error', function(err) {
      gutil.log('\t', gutil.colors.red('ERROR: '), 'Could not compile \"less\" files. Is \"less\" installed globally?\n');
    }))
  .pipe(gulp.dest('dist'));
});

gulp.task('less -> css.min', function() {
  gulp.src(path.join('src', 'less', '**', '*.less'))
  .pipe(less({
    paths: [ path.join(__dirname, 'src', 'less', 'includes') ],
    compress: true
  }).on('error', function(err) {
      gutil.log('\t', gutil.colors.red('ERROR: '), 'Could not compile \"less\" files. Is \"less\" installed globally?\n');
    }))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', [
    'less -> css',
    'less -> css.min'
  ], function() {
	return gutil.log('\t', gutil.colors.green('Compiled successfully!'));
});
