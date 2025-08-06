const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const babel = require("gulp-babel");
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const fileInclude = require("gulp-file-include");
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();

// File paths
const paths = {
  scss: ['./src/scss/main.scss', './src/scss/mockups/*.scss'],
  js: [
    './src/js/utilities/helpers.js',
    './src/js/components/*.js',
    './src/js/main.js'
  ],
  html: 'src/html/**/*.html',
  cssDest: './dist/css',
  jsDest: './dist/js',
  htmlDest: './dist'
};

// SCSS → Unminified CSS (with source map & comment)
function stylesDev() {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.')) // Keeps sourceMappingURL comment
    .pipe(gulp.dest(paths.cssDest))
    .pipe(browserSync.stream());
}

// SCSS → Minified CSS (without sourceMappingURL comment)
function stylesProd() {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(replace(/\/\*#\s*sourceMappingURL=.*\*\//g, '')) // Removes source map comment
    .pipe(gulp.dest(paths.cssDest))
    .pipe(browserSync.stream());
}

// JS: Minify & Bundle
function scripts() {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(browserSync.stream());
}

// HTML includes
function html() {
  return gulp.src(paths.html)
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(gulp.dest(paths.htmlDest))
    .pipe(browserSync.stream());
}

// Watch files + Live reload
function watchFiles() {
  browserSync.init({
    server: { baseDir: "dist", index: "index.html" },
    port: 8080,
  });

  gulp.watch("src/scss/**/*.scss", gulp.series(stylesDev, stylesProd));
  gulp.watch("src/js/**/*.js", scripts);
  gulp.watch("src/html/**/*.html", html);
}

// Gulp tasks
gulp.task("stylesDev", stylesDev);
gulp.task("stylesProd", stylesProd);
gulp.task("scripts", scripts);
gulp.task("html", html);
gulp.task("watch", gulp.series("html", "scripts", stylesDev, stylesProd, watchFiles));
gulp.task("build", gulp.series(stylesDev, stylesProd, scripts, html));
gulp.task("default", gulp.series("build", watchFiles));
