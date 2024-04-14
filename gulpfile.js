const { src, dest, series, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const SRC = "src";

const PATHS = {
    src: SRC,
    dist: 'dist',
    scss: `${SRC}/scss/**/*.scss`,
    js: `${SRC}/scripts/**/*.js`,
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
    watch(PATHS.js, buildJs);
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

function buildJs() {
    return src(PATHS.js)
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(dest(`${PATHS.src}/js`))
        .pipe(dest(`${PATHS.dist}/js`))
        .pipe(browserSync.stream());
}

exports.sass = buildScss;
exports.html = buildHtml;
exports.copy = copy;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, buildScss, buildJs, buildHtml, copy);
exports.default = series(buildScss, buildJs, parallel(createDevServer, serve));