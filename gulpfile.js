var gulp = require('gulp')
var less = require('gulp-less')
var rename = require('gulp-rename')
var gutil = require('gulp-util')
var path = require('path')

gulp.task('less -> css', function () {
  gulp.src(path.join('src', 'less', '**', '*.less'))
  .pipe(less({
    paths: [ path.join(__dirname, 'src', 'less', 'includes') ],
    compress: false
  }).on('error', function (err) {
    gutil.log('\t', gutil.colors.red('ERROR: '), 'Could not compile "less" files. Is "less" installed globally?\n')
    gutil.log(err)
  }))
  .pipe(gulp.dest('dist'))
})

gulp.task('less -> css.min', function () {
  gulp.src(path.join('src', 'less', '**', '*.less'))
  .pipe(less({
    paths: [ path.join(__dirname, 'src', 'less', 'includes') ],
    compress: true
  }).on('error', function (err) {
    gutil.log('\t', gutil.colors.red('ERROR: '), 'Could not compile "less" files. Is "less" installed globally?\n')
    gutil.log(err)
  }))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('dist'))
})

gulp.task('default', [
  'less -> css',
  'less -> css.min'
], function () {
  return gutil.log('\t', gutil.colors.green('Compiled successfully!'))
})

gulp.task('watch', function () {
  gulp.watch([
    'src/js/**/*.js',
    'src/less/**/*.less'
  ], ['default'])
})
