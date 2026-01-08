const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const fileInclude = require("gulp-file-include");
const replace = require("gulp-replace");
const browserSync = require("browser-sync").create();

const isNetlify = process.env.NETLIFY === "true";

// File paths
const paths = {
  scss: ["./src/scss/main.scss", "./src/scss/mockups/*.scss"],
  js: [
    "./src/js/utilities/helpers.js",
    "./src/js/components/*.js",
    "./src/js/main.js",
  ],
  html: "src/html/**/*.html",
  cssDest: "./dist/css",
  jsDest: "./dist/js",
  htmlDest: "./dist",
};

// -------------------- style --------------------

// dev CSS (with sourcemaps)
function stylesDev() {
  return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.cssDest))
    .pipe(isNetlify ? dest(paths.cssDest) : browserSync.stream());
}

// Prod CSS (minified, no sourcemap comment)
function stylesProd() {
  return src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(replace(/\/\*#\s*sourceMappingURL=.*\*\//g, ""))
    .pipe(dest(paths.cssDest));
}

// -------------------- scripts --------------------

function scripts() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.jsDest))
    .pipe(isNetlify ? dest(paths.jsDest) : browserSync.stream());
}

// -------------------- HTML --------------------

function html() {
  return src(paths.html)
    .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
    .pipe(dest(paths.htmlDest))
    .pipe(isNetlify ? dest(paths.htmlDest) : browserSync.stream());
}

// -------------------- Watch (dev only) --------------------

function watchFiles() {
  browserSync.init({
    server: { baseDir: "dist", index: "index.html" },
    port: 8080,
  });

  watch("src/scss/**/*.scss", stylesDev);
  watch("src/js/**/*.js", scripts);
  watch("src/html/**/*.html", html);
}

// -------------------- Task Experts --------------------

// Netlify build task
exports.build = series(stylesProd, scripts, html);

// Local development
exports.dev = series(html, scripts, stylesDev, watchFiles);

// Default = dev
exports.default = exports.dev;
