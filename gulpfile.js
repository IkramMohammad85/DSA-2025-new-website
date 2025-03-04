const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const babel = require("gulp-babel");
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const fileInclude = require("gulp-file-include");
const browserSync = require('browser-sync').create();

// Compile SCSS → Minified CSS
function styles() {
  return gulp.src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

// Minify & Bundle JS from components and utilities
function scripts() {
  return gulp.src([
      './src/js/utilities/helpers.js',
      './src/js/components/*.js',
      './src/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(terser()) // Corrected from uglify()
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

// Process HTML includes
function html() {
  return gulp.src("src/html/**/*.html")
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

// Watch Files and Start Local Server
function watchFiles() {
  browserSync.init({
    server: { baseDir: "dist", index: "index.html" },
    port: 8080,
  });

  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch("src/js/**/*.js", scripts);
  gulp.watch("src/html/**/*.html", html);
}
// Build Task (Run all tasks sequentially)
gulp.task('build', gulp.series(styles, scripts, html));
// Define Tasks
gulp.task("html", html);
gulp.task("scripts", scripts);
gulp.task("watch", gulp.series("html", "scripts", watchFiles));
gulp.task("default", gulp.series(gulp.parallel(styles, scripts, html), watchFiles));
