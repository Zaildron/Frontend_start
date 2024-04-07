const { src, dest, series, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

const SRC = "src";

const PATHS = {
    src: SRC,
    dist: 'dist',
    scss: `${SRC}/scss/**/*.scss`,
    html: `${SRC}/**/*.html`,
    images: `${SRC}/assets/images/**/*.*`
};

function buildScss() {
    return src('src/scss/**/*.scss')
        .pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
        .pipe(dest('src/css'))
        .pipe(dest('dist/css'));
}

function buildHtml() {
    return src('src/**/*.html').pipe(dest('dist'));
}

function copy() {
    return src(['src/assets/images/**/*.*']).pipe(dest('dist/assets/images'));
}

function cleanDist() {
    return src('dist', { allowEmpty: true }).pipe(clean());
}

function serve() {
    watch('src/scss/**/*.scss', buildScss);
    watch('src/**/*.html', buildHtml);
}

function createDevServer() {
    browserSync.init({
        server: 'src',
        notify: false
    })
}

function buildScss() {
    return src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
        .pipe(
            postcss([
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ['last 2 versions']
                }),
                cssnano()
            ])
        )
        .pipe(sourcemaps.write())
        .pipe(dest('src/css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

exports.sass = buildScss;
exports.html = buildHtml;
exports.copy = copy;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, buildScss, buildHtml, copy);
exports.default = series(buildScss, parallel(createDevServer, serve));