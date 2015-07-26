'use strict';
var gulp = require('gulp'),
    istanbul = require('istanbul'),
    runSequence = require('run-sequence'),
    eslint = require('gulp-eslint'),
    jscs = require('gulp-jscs');

gulp.task('style', function() {
    return gulp.src([
        'test/*.js',
        'lib/**/*.js',
        'index.js',
        'gulpfile.js'
    ])
        .pipe(jscs())
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('test', function(cb) {
    gulp.src([
        'lib/**/*.js',
        'index.js'
    ])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function() {
            gulp.src(['test/*.js'])
                .pipe(mocha({reporter: 'min'}))
                .pipe(istanbul.writeReports({
                    reporters: ['lcov', 'json', 'text', 'text-summary'],
                    reportOpts: {dir: './build/coverage'}
                })) // Creating the reports after tests runned
                .on('end', cb);

        });
});

gulp.task('check', function(callback) {
    //@see:https://www.npmjs.com/package/run-sequence
    runSequence('style', 'test', callback);
});

gulp.task('default', ['check']);
