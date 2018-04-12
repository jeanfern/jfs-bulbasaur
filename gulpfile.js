var autoprefixer = require('gulp-autoprefixer'),
    browsersync = require('browser-sync'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    fileinclude = require('gulp-file-include'),
    gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin')
    inlinesource = require('gulp-inline-source'),
    jshint = require('gulp-jshint'),
    jshintstylish = require('jshint-stylish'),
    plumber = require('gulp-plumber'),
    pngquant = require('imagemin-pngquant'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var devpaths = {
    dev: 'dev/',
    includes: 'dev/includes/',
    pages: 'dev/pages/',
    css: 'dev/files/css/',
    scss: 'dev/files/scss/',
    js: 'dev/files/js/',
    jssettings: 'dev/files/js/settings/',
    jsplugins: 'dev/files/js/plugins/',
    images: 'dev/files/images/',
    fonts: 'dev/files/fonts/'
};

var distpaths = {
    dist: 'dist/',
    css: 'dist/files/css/',
    js: 'dist/files/js/',
    images: 'dist/files/images/',
    fonts: 'dist/files/fonts/'
};

// Development Tasks
gulp.task('cleaning:html', function () {
    return gulp.src(devpaths.dev + '*.html')
        .pipe(clean());
});

gulp.task('including', ['cleaning:html'], function () {
    return gulp.src(devpaths.pages + '*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: devpaths.includes
        }))
        .pipe(gulp.dest(devpaths.dev));
});

gulp.task('styling', function () {
    return gulp.src(devpaths.scss + '**/*.scss')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 2 versions', 'ie 8', 'ie 9', '> 1%']))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.', {
            mapFile: function (mapFilePath) {
                return mapFilePath.replace('.css.map', '.map');
            }
        }))
        .pipe(gulp.dest(devpaths.css))
        .pipe(browsersync.reload({
            stream: true
        }));
});

gulp.task('scripting:plugins', function () {
    return gulp.src(devpaths.jsplugins + '*.js')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('plugins.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.', {
            mapFile: function (mapFilePath) {
                return mapFilePath.replace('.js.map', '.map');
            }
        }))
        .pipe(gulp.dest(devpaths.js))
        .pipe(browsersync.reload({
            stream: true
        }));
});

gulp.task('scripting:settings', function () {
    return gulp.src(devpaths.jssettings + '*.js')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(jshint())
        .pipe(jshint.reporter(jshintstylish))
        .pipe(sourcemaps.init())
        .pipe(concat('settings.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.', {
            mapFile: function (mapFilePath) {
                return mapFilePath.replace('.js.map', '.map');
            }
        }))
        .pipe(gulp.dest(devpaths.js))
        .pipe(browsersync.reload({
            stream: true
        }));
});

gulp.task('inlining:sources', ['including', 'styling', 'scripting:plugins', 'scripting:settings'], function () {
    return gulp.src(devpaths.dev + '*.html')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(inlinesource({
            compress: false
        }))
        .pipe(gulp.dest(devpaths.dev));
});

gulp.task('syncing', function () {
    browsersync.init({
        server: {
            baseDir: devpaths.dev
        }
    });
});

gulp.task('watching', function () {
    gulp.watch(devpaths.scss + '**/*.scss', ['inlining:sources']);
    gulp.watch(devpaths.includes + '*.html', ['inlining:sources']);
    gulp.watch(devpaths.pages + '*.html', ['inlining:sources']);
    gulp.watch(devpaths.jssettings + '*.js', ['inlining:sources']);
    gulp.watch(devpaths.jsplugins + '*.js', ['inlining:sources']);
    gulp.watch(devpaths.dev + '*.html').on('change', browsersync.reload);
    gulp.watch(devpaths.fonts + '*').on('change', browsersync.reload);
});

gulp.task('default', function (callback) {
    sequence(['inlining:sources'], 'syncing', 'watching', callback);
});

//Bulding Tasks
gulp.task('cleaning:dist', function() {
    return gulp.src(distpaths.dist)
        .pipe(clean());
});
gulp.task('building:css', function () {
    return gulp.src(devpaths.css + '**/*')
        .pipe(gulp.dest(distpaths.css));
});

gulp.task('building:fonts', function () {
    return gulp.src(devpaths.fonts + '**/*')
        .pipe(gulp.dest(distpaths.fonts));
});

gulp.task('building:images', function () {
    return gulp.src(devpaths.images + '**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(distpaths.images));
});

gulp.task('building:js', function () {
    return gulp.src(devpaths.js + '*.*')
        .pipe(gulp.dest(distpaths.js));
});

gulp.task('building:pages', function () {
    return gulp.src(devpaths.dev + '*.*')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(distpaths.dist));
});

gulp.task('build', function (callback) {
    sequence('cleaning:dist', ['building:css','building:fonts', 'building:images', 'building:js', 'building:pages'], callback);
});