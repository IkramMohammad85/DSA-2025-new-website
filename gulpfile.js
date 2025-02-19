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
      './src/js/components/*.js',  // Include all components
      './src/js/main.js' // Finally, main.js
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

// Watch for Changes
function watchFiles() {
//   browserSync.init({
//     server: { baseDir: './src/html' }, // Use the `html` folder as root
//     notify: false
//   });
    browserSync.init({
        server: { baseDir: "dist", index: "index.html" },
        port: 8080, // Change to another port
    });
  gulp.watch('./src/scss/**/*.scss', styles);
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./src/html/**/*.html').on('change', browserSync.reload);
}
// Static Server + Watching Files
function serve() {
    browserSync.init({
        server: { baseDir: "dist", index: "index.html" },
        port: 8080, // Change to another port
      });
  
    gulp.watch("src/scss/**/*.scss", gulp.series(styles));
    gulp.watch("src/js/**/*.js").on("change", browserSync.reload);
    gulp.watch("src/html/**/*.html").on("change", browserSync.reload);
  }


  
// Task to process HTML includes
gulp.task("html", function () {
    return gulp
      //.src("src/html/*.html") // Only process main HTML files, not components
      .src("src/html/**/*.html") // Include all HTML files and subfolders
      .pipe(
        fileInclude({
          prefix: "@@", // Use @@ as the include prefix
          basepath: "@file", // Ensure relative path works
        })
      )
      .pipe(gulp.dest("dist")) // Output compiled HTML to dist folder
      .pipe(browserSync.stream()); // Reload browser
  });
  // JavaScript Task (Transpile & Minify)
gulp.task("scripts", function () {
    return gulp
      .src("src/js/**/*.js") // Select all JS files
      .pipe(sourcemaps.init()) // Initialize source maps
      .pipe(
        babel({
          presets: ["@babel/env"], // Convert ES6+ to ES5
        })
      )
      .pipe(uglify()) // Minify JS
      .pipe(sourcemaps.write(".")) // Write source maps
      .pipe(gulp.dest("dist/js")) // Move processed JS to dist/
      .pipe(browserSync.stream()); // Auto-reload browser
  });
  // Start local server and watch for changes
  gulp.task("watch", function () {
    // browserSync.init({
    //   server: {
    //     baseDir: "dist", // Serve from dist folder
    //     index: "index.html", // Ensure index.html is the default
    //   },
    //   port: 8080, // Optional: Change port if needed
    // });
    browserSync.init({
        server: { baseDir: "dist", index: "index.html" },
        port: 8080, // Change to another port
      });
  
    gulp.watch("src/html/**/*.html", gulp.series("html"));
    
    gulp.watch("src/js/**/*.js", gulp.series("scripts")); // Watch JS
  });

// Default Task
gulp.task("default", gulp.series("html", "scripts", "watch"));
exports.default = gulp.series(gulp.parallel(styles, scripts), watchFiles);
exports.default = serve;



