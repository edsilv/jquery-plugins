var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    rename = require('gulp-rename'),
    merge = require('merge2'),
    del = require('del'),
    runSequence = require('run-sequence'),
    Config = require('./gulpfile.config');

var config = new Config();

gulp.task('clean:dist', function (cb) {
    del([
        config.dist + '/*'
    ], cb);
});

gulp.task('build', function() {

    var tsResult = gulp.src(['src/*.ts', 'typings/*.ts', '!test'])
        .pipe(ts({
            declarationFiles: false,
            noExternalResolve: true,
            noLib: false,
            module: 'commonjs',
            out: config.out
        }));

    return merge([
        tsResult.dts.pipe(gulp.dest(config.dist)),
        tsResult.js.pipe(gulp.dest(config.dist))
    ]);
});

gulp.task('default', function(callback) {
    runSequence('clean:dist', 'build', callback);
});