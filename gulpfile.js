const child = require("child_process");
const fs = require("fs");

const del = require("del");
const gulp = require("gulp");
const gulpif = require("gulp-if");
const jeditor = require("gulp-json-editor");
const replace = require("gulp-replace");
const zip = require("gulp-zip");

const manifest = require("./manifest.json");

const paths = {
  build: "./",
  dist: "./",
  popupDir: "./",
};

function buildString() {
  var build = "";
  if (process.env.MANIFEST_VERSION) {
    build = `-mv${process.env.MANIFEST_VERSION}`;
  }
  if (process.env.BUILD_NUMBER && process.env.BUILD_NUMBER !== "") {
    build = `-${process.env.BUILD_NUMBER}`;
  }
  return build;
}

function distFileName(browserName, ext) {
  return `dist-${browserName}${buildString()}.${ext}`;
}

function dist(browserName, manifest) {
  return gulp
    .src(paths.build + "**/*")
    .pipe(gulpif("./gitlab-mr-slack.html", replace("__BROWSER__", "browser_" + browserName)))
    .pipe(gulpif("./manifest.json", jeditor(manifest)))
    .pipe(zip(distFileName(browserName, "zip")))
    .pipe(gulp.dest(paths.dist));
}

function distFirefox() {
  return dist("firefox", (manifest) => {
    delete manifest.content_security_policy;
    delete manifest.storage;
    return manifest;
  });
}

function distChrome() {
  return dist("chrome", (manifest) => {
    delete manifest.applications;
    delete manifest.content_security_policy;
    delete manifest.sidebar_action;
    delete manifest.commands._execute_sidebar_action;
    return manifest;
  });
}


function ciCoverage(cb) {
  return gulp
    .src(paths.coverage + "**/*")
    .pipe(filter(["**", "!coverage/coverage*.zip"]))
    .pipe(zip(`coverage${buildString()}.zip`))
    .pipe(gulp.dest(paths.coverage));
}

exports["dist:firefox"] = distFirefox;
exports["dist:chrome"] = distChrome;
exports.dist = gulp.parallel(distFirefox, distChrome);
