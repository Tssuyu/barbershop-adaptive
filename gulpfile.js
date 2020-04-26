var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var myLocalServer = require('browser-sync').create();
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');

gulp.task("compileCSS", function(done){
  gulp.src("source/sass/style.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
    ]))
  .pipe(gulp.dest("source/css/"))
  .pipe(minify())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest("source/css/"))
  .pipe(myLocalServer.stream());
  done();
  });

gulp.task("images", function(){
  return gulp.src("source/images/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
    ]))
  .pipe(gulp.dest('source/images/'));
  });

gulp.task("webp", function(){
  return gulp.src("source/images/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest('source/images/'));
  });

gulp.task("sprite", function(){
  return gulp.src("source/images/**/icon-*.svg")
  .pipe(svgstore({
    inlineSvg: true
    }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('source/images/'));
  });

gulp.task("html", function(){
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
    ]))
  .pipe(gulp.dest('source/'));
  });

gulp.task("server", function(done){
  myLocalServer.init({
    server: "source/"
    });
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("compileCSS"));
  gulp.watch("source/*.html").on("change", () => {
    myLocalServer.reload();
    done();
    });
  done();
  });

gulp.task('start', gulp.series('compileCSS', 'server'));
