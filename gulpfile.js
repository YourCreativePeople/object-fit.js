/* Gulp File
    v 0.1.1
*/
// var lr          = require('tiny-lr');
var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    gutil       = require('gulp-util'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    watch       = require('gulp-watch');

var EXPRESS_PORT = 4003;
var EXPRESS_ROOT = __dirname;

var paths = {
  scripts:  ['src/js/*.js']
};

var name = 'object-fit';

gulp.task('server', function () {
    var express = require('express');
    var app = express();
    app.use(express.static(EXPRESS_ROOT));
    app.listen(EXPRESS_PORT);

    console.log('Express Server on Port ' + EXPRESS_PORT);
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('js', function() {
    return gulp.src(paths.scripts)
        .pipe(concat(name + '.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['lint', 'scripts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['server', 'lint', 'js', 'watch']);