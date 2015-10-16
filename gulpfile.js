var gulp = require("gulp");
var babelify = require('babelify');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var watchLess = require('gulp-watch-less');

function compile(watch) {
    var js_bundler = watchify(browserify('./public/index.js', { debug: true }).transform(babelify));

    function js_rebundle() {
        js_bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./public'));
    }

    function css_rebundle() {
        gulp.src('./public/css/**/*.less')
            .pipe(watchLess('./public/css/game.less', {
                name: 'LESS' // For output nice-ness!
            }))
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(less())
            .pipe(minifyCSS())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./public/css'));
    }

    if (watch) {
        js_bundler.on('update', function() {
            console.log('-> js bundling...');
            js_rebundle();
        });
    }

    js_rebundle();
    css_rebundle();
}

function watch() {
    return compile(true);
}

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
