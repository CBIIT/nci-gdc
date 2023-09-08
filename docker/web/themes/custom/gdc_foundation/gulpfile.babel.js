// The Theme build process is based off of the Foundation Zurb
// Template: https://github.com/foundation/foundation-zurb-template
// Update the config.yml file with your STARTER URI, and any
// file paths that are different from the default.

import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
import gulp          from 'gulp';
import rimraf        from 'rimraf';
import yaml          from 'js-yaml';
import fs            from 'fs';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';
import autoprefixer  from 'autoprefixer';
import imagemin      from 'gulp-imagemin';

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sassLint = require('gulp-sass-lint');

// Load all Gulp plugins into one variable.
const $ = plugins();

// Check for --production flag.
const PRODUCTION = !!(yargs.argv.production);

// Load settings from config.yml.
function loadConfig() {
  const unsafe = require('js-yaml-js-types').all;
  const schema = yaml.DEFAULT_SCHEMA.extend(unsafe);
  const ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile, {schema});
}

const { BROWSERSYNC, PATHS } = loadConfig();

// Build the compiled js and css by running all of the below tasks.
// Sass must be run later so UnCSS can search for used classes in the others assets.
gulp.task('build',
  gulp.series(clean, gulp.parallel(javascript, images), sassBuild, lintSass)
);

// Build the site, run the server, and watch for file changes.
gulp.task('default',
  gulp.series('build', server, watch)
);

// Delete the compiled js and css.
// This happens every time a build starts.
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sassBuild() {

  const postCssPlugins = [
    // Autoprefixer
    autoprefixer(),
  ].filter(Boolean);

  return gulp.src(PATHS.scss)
    .pipe($.sourcemaps.init())
    .pipe(sass({
      includePaths: PATHS.foundationScss
    })
      .on('error', $.sass.logError))
    .pipe(postcss(postCssPlugins))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie11' })))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist))
    .pipe(browser.reload({ stream: true }));
}

function lintSass() {
  return gulp.src(PATHS.componentScss)
    .pipe(sassLint({
      config: 'sass-lint.yml'
    }))
    .pipe(sassLint.format());
}

let webpackConfig = {
  mode: (PRODUCTION ? 'production' : 'development'),
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ "@babel/preset-env" ],
            compact: false
          }
        }
      }
    ]
  },
  devtool: !PRODUCTION && 'source-map'
}

// Load/copy Foundation JavaScript
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.foundationJs)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe($.if(PRODUCTION, $.terser()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest('js/'));
}

// If using image optimization, copy them to image folder.
// In production, the images are compressed.
function images() {
  return gulp.src('images-source/**/*')
    .pipe($.if(PRODUCTION, imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 85, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ])))
    .pipe(gulp.dest('images/'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    proxy: {
      target: BROWSERSYNC
    },
  }, done);
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}


// Watch for changes to SCSS and JavaScript
function watch() {
  gulp.watch(PATHS.componentScss).on('all', sassBuild);
  gulp.watch(PATHS.js).on('all', gulp.series(browser.reload));
  gulp.watch('images-source').on('all', gulp.series(images, browser.reload));
}
