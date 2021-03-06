var

    /**
     * The path of the source files in order of occurrence.
     * @type {string[]}
     */
    scripts = [
        './src/paginator.js'
    ],

    styles = [
        './src/style.css',
        './src/settings.css'
    ],

    /**
     * The output directory of the compiled files.
     * @type {string}
     */
    output = './bin',

/* ---------------- *
 * Task definitions *
 * ---------------- */

    name = require('./package.json').name,

    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    csso = require('gulp-csso'),
    sourcemaps = require('gulp-sourcemaps');

if (name.indexOf('/') > -1) {
    name = name.slice(name.indexOf('/') + 1);
}

gulp.task('compile-scripts', function (cb) {
    gulp.src(scripts, { base: './src' })
        .pipe(sourcemaps.init())
        .pipe(concat(name + '.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(output))
        .on('end', cb);
});

gulp.task('compile-scripts-minified', function (cb) {
    gulp.src(scripts, { base: './src' })
        .pipe(sourcemaps.init())
        .pipe(concat(name + '.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(output))
        .on('end', cb);
});

gulp.task('compile-styles', function (cb) {
    gulp.src(styles, { base: './src' })
        .pipe(sourcemaps.init())
        .pipe(concat(name + '.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(output))
        .on('end', cb);
});

gulp.task('compile-styles-minified', function (cb) {
    gulp.src(styles, { base: './src' })
        .pipe(sourcemaps.init())
        .pipe(concat(name + '.min.css'))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(output))
        .on('end', cb);
});

gulp.task('default', [
    'compile-scripts',
    'compile-scripts-minified',
    'compile-styles',
    'compile-styles-minified'
]);
