'use strict';

const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const svgmin = require('gulp-svgmin');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// Запуск сортировки свойств в стилевых файлах
gulp.task('sorting', function () {
  console.log('---------- сортировка SCSS');
  const sort = require('postcss-sorting');
  return gulp.src('source/blocks/**/*.scss')
    .pipe(plumber({ errorHandler: notify.onError() }))
    .pipe(postcss([
      sort({
        "order": [
          "custom-properties",
          "dollar-variables"
        ],
        "properties-order": [
          {
            "properties": [
              "content",
              "position",
              "top",
              "right",
              "bottom",
              "left",
              "z-index"
            ]
          },
          {
            "properties": [
              "display",
              "flex",
              "flex-grow",
              "flex-shrink",
              "flex-basis",
              "flex-flow",
              "flex-direction",
              "flex-wrap",
              "justify-content",
              "align-content",
              "align-items",
              "order",
              "align-self",
              "float",
              "clear"
            ]
          },
          {
            "properties": [
              "box-sizing",
              "width",
              "min-width",
              "max-width",
              "height",
              "min-height",
              "max-height",
              "margin",
              "margin-top",
              "margin-right",
              "margin-bottom",
              "margin-left",
              "padding",
              "padding-top",
              "padding-right",
              "padding-bottom",
              "padding-left",
              "overflow",
              "overflow-x",
              "overflow-y"
            ]
          },
          {
            "properties": [
              "list-style",
              "list-style-position",
              "list-style-type",
              "list-style-image",
              "border-collapse",
              "border-spacing",
              "table-layout",
              "empty-cells",
              "caption-side",
              "font",
              "font-weight",
              "font-size",
              "line-height",
              "font-family",
              "vertical-align",
              "text-align",
              "direction",
              "color",
              "text-transform",
              "text-decoration",
              "font-style",
              "font-variant",
              "font-size-adjust",
              "font-stretch",
              "font-effect",
              "font-emphasize",
              "font-emphasize-position",
              "font-emphasize-style",
              "font-smooth",
              "text-align-last",
              "letter-spacing",
              "word-spacing",
              "white-space",
              "text-emphasis",
              "text-emphasis-color",
              "text-emphasis-style",
              "text-emphasis-position",
              "text-indent",
              "text-justify",
              "text-outline",
              "text-wrap",
              "text-overflow",
              "text-overflow-ellipsis",
              "text-overflow-mode",
              "text-orientation",
              "word-wrap",
              "word-break",
              "tab-size",
              "hyphens",
              "unicode-bidi",
              "columns",
              "column-count",
              "column-fill",
              "column-gap",
              "column-rule",
              "column-rule-color",
              "column-rule-style",
              "column-rule-width",
              "column-span",
              "column-width",
              "text-shadow",
              "page-break-after",
              "page-break-before",
              "page-break-inside"
            ]
          },
          {
            "properties": [
              "background",
              "background-color",
              "background-image",
              "background-repeat",
              "background-position",
              "background-position-x",
              "background-position-y",
              "background-size",
              "background-clip",
              "background-origin",
              "background-attachment",
              "box-decoration-break",
              "background-blend-mode",
              "border",
              "border-width",
              "border-style",
              "border-color",
              "border-top",
              "border-top-width",
              "border-top-style",
              "border-top-color",
              "border-right",
              "border-right-width",
              "border-right-style",
              "border-right-color",
              "border-bottom",
              "border-bottom-width",
              "border-bottom-style",
              "border-bottom-color",
              "border-left",
              "border-left-width",
              "border-left-style",
              "border-left-color",
              "border-radius",
              "border-top-left-radius",
              "border-top-right-radius",
              "border-bottom-right-radius",
              "border-bottom-left-radius",
              "border-image",
              "border-image-source",
              "border-image-slice",
              "border-image-width",
              "border-image-outset",
              "border-image-repeat",
              "outline",
              "outline-width",
              "outline-style",
              "outline-color",
              "outline-offset",
              "box-shadow",
              "visibility",
              "cursor",
              "opacity",
              "filter"
            ]
          },
          {
            "properties": [
              "transition",
              "transition-delay",
              "transition-timing-function",
              "transition-duration",
              "transition-property",
              "animation",
              "animation-name",
              "animation-duration",
              "animation-play-state",
              "animation-timing-function",
              "animation-delay",
              "animation-iteration-count",
              "animation-direction",
              "transform",
              "transform-origin",
              "backface-visibility",
              "perspective",
              "perspective-origin",
              "transform-style"
            ]
          },
          {
            "properties": [
              "quotes",
              "counter-reset",
              "counter-increment",
              "resize",
              "user-select",
              "nav-index",
              "nav-up",
              "nav-right",
              "nav-down",
              "nav-left",
              "pointer-events",
              "will-change",
              "clip",
              "clip-path",
              "zoom"
            ]
          }
        ],
        "unspecified-properties-position": "bottom"
      })
    ]))
    .pipe(gulp.dest('source/blocks'));
});

// Запуск очистки папки сборки
gulp.task('clean', function () {
  console.log('---------- очистка папки сборки');
  return del('build');
});

// Запуск копирования шрифтов и svg-спрайта в папку сборки
gulp.task('copy', function () {
  console.log('---------- копирование шрифтов и svg-спрайта в папку сборки');
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/sprite/*.svg'
  ], { base: 'source' })
    .pipe(gulp.dest('build'));
});

// Запуск копирования (jpg, png, gif) в папку сборки и их оптимизация
gulp.task('img', function () {
  console.log('---------- копирование (jpg, png, gif) в папку сборки');
  const imagemin = require('gulp-imagemin');
  return gulp.src([
    'source/img/*.{jpg, png, gif}',
    'source/img/sprite/*.png'
  ], { base: 'source' })
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true })
    ]))
    .pipe(gulp.dest('build'));
});

// Запуск копирования svg в папку сборки и их оптимизация
gulp.task('svg', function () {
  console.log('---------- копирование svg в папку сборки');
  return gulp.src('source/img/*.svg')
    .pipe(svgmin({
      plugins: [
        { removeAttrs: { attrs: ['id', 'data-name'] } },
        { removeTitle: true }
      ]
    }))
    .pipe(gulp.dest('build/img'));
});

// Запуск копирования файлов скриптов в папку сборки и их оптимизация
gulp.task('js', function () {
  console.log('---------- копирование скриптов в папку сборки');
  const uglify = require('gulp-uglify');
  return gulp.src('source/js/**/*.js',
    { base: 'source' })
    .pipe(plumber({ errorHandler: notify.onError() }))
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/js'));
});

// Запуск сборки разметки страниц
gulp.task('html', function () {
  console.log('---------- сборка HTML');
  const include = require('gulp-file-include');
  return gulp.src('source/pages/*.html')
    .pipe(plumber({ errorHandler: notify.onError() }))
    .pipe(include({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build'));
});

// Запуск сборки стилевого файла
gulp.task('style', function () {
  console.log('---------- сборка CSS');
  const scss = require('gulp-sass');
  const autoprefixer = require('autoprefixer');
  const mqpacker = require('css-mqpacker');
  const cssnano = require('gulp-cssnano');
  return gulp.src('source/scss/style.scss')
    .pipe(plumber({ errorHandler: notify.onError() }))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 1 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
        ]
      }),
      mqpacker({ sort: true })
    ]))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('build/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/css'));
});

// Запуск слежения за файлами
gulp.task('watch', function () {
  console.log('---------- запуск слежения за изменениями');
  gulp.watch('source/blocks/**/*.scss', gulp.series('style'));
  gulp.watch('source/blocks/**/*.html', gulp.series('html'));
  gulp.watch('source/scss/*.scss', gulp.series('style'));
  gulp.watch('source/pages/*.html', gulp.series('html'));
  gulp.watch('source/img/**/*.{png,img,gif}', gulp.series('img'));
  gulp.watch('source/img/**/*.svg', gulp.series('svg', 'copy'));
  gulp.watch('source/js/**', gulp.series('js'));
});

// Запуск сервера
gulp.task('serve', function () {
  console.log('---------- запуск сервера');
  const server = require('browser-sync').create();
  server.init({
    server: 'build',
    index: 'index.html'
  });
  server.watch('build/css/*.css').on('change', server.reload);
  server.watch('build/*.html').on('change', server.reload);
  server.watch('build/img/**/*.*').on('change', server.reload);
  server.watch('build/js/**/*.js').on('change', server.reload);
});

// Запуск разработки проекта
gulp.task('default',
  gulp.series('clean',
    gulp.parallel('copy', 'sorting'),
    gulp.parallel('html', 'style', 'img', 'js', 'svg'),
    gulp.parallel('watch', 'serve')));

// Отправка в GH pages (ветку gh-pages репозитория)
gulp.task('deploy', function () {
  console.log('---------- Публикация содержимого ./build/ на GH pages');
  const ghPages = require('gulp-gh-pages');
  return gulp.src('./build/**/*', {
    base: 'build'
  })
    .pipe(ghPages());
});

// Конвертация файлов шрифтов в woff
console.log('---------- запуск сервера');
gulp.task('woff', function () {
  var ttf2woff = require('gulp-ttf2woff');
  return gulp.src(['source/fonts/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('source/fonts/'));
});

// Конвертация файлов шрифтов в woff2
gulp.task('woff2', function () {
  var ttf2woff2 = require('gulp-ttf2woff2');
  return gulp.src(['source/fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(gulp.dest('source/fonts/'));
});

// Конвертация файлов шрифтов в woff2
gulp.task('fonts', gulp.parallel('woff', 'woff2'));


// создание спрайта svg
gulp.task('symbols', function () {
  console.log('---------- создание спрайта svg');
  const svgSprite = require('gulp-svg-sprite');
  return gulp.src('source/img/icon/*.svg')
    .pipe(svgmin({
      plugins: [
        { removeAttrs: { attrs: ['id', 'fill', 'stroke', 'data-name', 'class'] } },
        { removeTitle: true },
        { removeStyleElement: true },
        { collapseGroups: true }
      ]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg",
          render: {
            scss: {
              dest: '../../../scss/_sprite.scss',
              template: "source/scss/templates/_sprite_template.scss"
            }
          }
        }
      }
    }))
    .pipe(gulp.dest('source/img/sprite'))
    .pipe(gulp.dest('build/img/sprite'))

});
