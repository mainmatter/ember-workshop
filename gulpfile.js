const { series, parallel, src, dest, watch } = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();

function clean() {
  return del(['./dist/']);
}

function buildHtml() {
  return src("./index.html")
    .pipe(dest("dist/"));
}

function buildReveal() {
  return src("./node_modules/reveal.js/**/*")
    .pipe(dest("dist/reveal.js/"));
}

function buildCss() {
  return src("./css/**/*.css")
    .pipe(dest("dist/css/"));
}

function buildImages() {
  return src("./images/**/*")
    .pipe(dest("dist/images/"));
}

function buildSlides() {
  return src("./slides/**/*.md")
    .pipe(dest("dist/slides/"));
}

const buildPipeline = series(clean, parallel(buildHtml, buildReveal, buildCss, buildImages, buildSlides));

function serve() {
  browserSync.init({
    open: false,
    server: {
      baseDir: "./dist/"
    }
  });
  watch(["slides/**/*", "css/**/*", "images/**/*", "index.html"], buildPipeline);
  watch("./dist/**/*").on('change', browserSync.reload);
}

exports.serve = series(buildPipeline, serve);
exports.build = buildPipeline;
