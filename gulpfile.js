'use strict';

const fs = require('fs-extra');
const gulp = require('gulp');
gulp.plugins = require('gulp-load-plugins')();

const name = 'angular-diet-graph-directive';

gulp.task('clean', function () {
  fs.removeSync('./dist/*');
});

gulp.task('build.es5.js', ['clean'], function () {
  return gulp.src(`./src/${name}.js`)
    .pipe(gulp.plugins.babel({presets: ['es2015']}))
    .pipe(gulp.plugins.ngAnnotate())
    .pipe(gulp.dest('./dist'));
});

gulp.task('build.min.js', ['build.es5.js'], function () {
  return gulp.src(`./dist/${name}.js`)
    .pipe(gulp.plugins.rename(`${name}.min.js`))
    .pipe(gulp.plugins.uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build.css', function () {
  return gulp.src([`./src/${name}.scss`])
    .pipe(gulp.plugins.sass({
      errLogToConsole: true
    }))
    .pipe(gulp.plugins.rename(`${name}.css`))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build.min.css', ['build.css'], function () {
  return gulp.src([`./dist/${name}.css`])
    .pipe(gulp.plugins.minifyCss({compatibility: 'ie9'}))
    .pipe(gulp.plugins.rename(`${name}.min.css`))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build.min.js', 'build.min.css'], function () {
  console.log('Build complete');
});
