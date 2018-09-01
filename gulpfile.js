'use strict';
var currentProject = 'Creativia/';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();

var del = require('del');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');


var uglify = require('gulp-uglify');


gulp.task('style', function() {
  return gulp.src(currentProject+'source/sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([autoprefixer()]))
  .pipe(gulp.dest(currentProject+'build/css'))
  .pipe(minify())
  .pipe(rename({suffix: '-min', prefix : ''}))
  .pipe(gulp.dest(currentProject+'build/css'));
});


var gulpBemCss = require('gulp-bem-css');
gulp.task('bem', function() {
  return gulp.src(currentProject+'source/*.html')
    .pipe(gulpBemCss({
      folder: currentProject+'source/sass/blocks', // Path for creating directories and stylesheet files.
      extension: 'scss', // Extension of stylesheet files
      elementSeparator: '__', // Element separator in class names
      modifierSeparator: '--' // Modifier separator in class names
    }))
});

//========================================================
gulp.task('clean', function () {
  return del(currentProject+'build');
});

gulp.task('js', function () {
  return gulp.src(currentProject+'source/js/**/*.js')
  .pipe(plumber())
  .pipe(gulp.dest(currentProject+'build/js'))
  .pipe(rename({suffix: '-min', prefix : ''}))
  .pipe(uglify())
  .pipe(gulp.dest(currentProject+'build/js'));
});

gulp.task('images', function () {
  return gulp.src([currentProject+'source/img/**/*.{png,jpg}', currentProject+'source/img/*.svg'])
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
    ]))
  .pipe(gulp.dest(currentProject+'build/img'));
});


gulp.task('webp', function () {
  return gulp.src(currentProject+'source/img/**/*.{png,jpg}')
  .pipe(webp())
  .pipe(gulp.dest(currentProject+'build/img/webp'));
});


gulp.task('sprite-outer', function () {
  return gulp.src(currentProject+'source/img/sprites/outer/*.svg')
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename('sprite-outer.svg'))
  .pipe(gulp.dest(currentProject+'build/img'));
});


gulp.task('sprite-inline', function () {
  return gulp.src(currentProject+'source/img/sprites/inline/*.svg')
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename('sprite-inline.svg'))
  .pipe(gulp.dest(currentProject+'build/img'));
});

gulp.task('sprite-prepared', function () {
  return gulp.src(currentProject+'source/img/sprites/prepared/*.svg')
  .pipe(gulp.dest(currentProject+'build/img'));
});


gulp.task('sprite', gulp.parallel('sprite-inline', 'sprite-outer', 'sprite-prepared'));


gulp.task('html', function () {
  return gulp.src(currentProject+'source/*.html')
  .pipe(posthtml([include()]))
  .pipe(gulp.dest(currentProject+'build/'));
});

gulp.task('fonts', function () {
  return gulp.src(currentProject+'source/fonts/**/*.{woff,woff2}')
  .pipe(gulp.dest(currentProject+'build/fonts'));
});

gulp.task('public', function () {
  return gulp.src(currentProject+'source/public/**/*.{json,png,ico}')
  .pipe(gulp.dest(currentProject+'build/public'));
});


gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('fonts', 'style', 'js', 'images', 'public'),
    'sprite',
    'webp',
    'html'));

gulp.task('watch', function() {
  gulp.watch(currentProject+'source/sass/**/*.scss', gulp.series('style'));
  gulp.watch(currentProject+'source/*.html',  gulp.series('html'));
  gulp.watch(currentProject+'source/js/*.js', gulp.series('js'));
});

gulp.task('serve', function() {
  server.init({
    server: currentProject+'build/',
    browser: 'Chrome'
  });

  server.watch(currentProject+'build/**/*.{html,js,css}').on('change', server.reload);
});


//====== Для разработки запускать gulp dev !!! =====================================
gulp.task('dev', gulp.series('style','js', 'html', gulp.parallel('watch', 'serve')));
