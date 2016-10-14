//==============================================================================
// Gulp Setup
//==============================================================================

var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

//==============================================================================
// File paths
//==============================================================================
var paths = {
  src   : 'src/',
  build : 'assets/',
};

//==============================================================================
// Tasks
//==============================================================================
gulp.task('default', function() {
  // place code for your default task here
});

// Styles
gulp.task('styles', function() {
  return gulp.src(paths.src + 'stylesheets/application.scss')

    // init Sourcemaps
    .pipe(plugins.sourcemaps.init())

    // Compile SCSS
    .pipe(plugins.sass({
        outputStyle : 'expanded',
        sourceComments : 'none',
        includePaths: require('node-bourbon').includePaths
    }))

    .on("error", plugins.notify.onError(function (error) {
      return error.message;
    }))

    // Auto Prefixing
    .pipe(plugins.autoprefixer('last 5 version'))

    // Min File
    .pipe(plugins.minifyCss())

    // Sourcemaps
    .pipe(plugins.sourcemaps.write('/', {
      includeContent: false,
      sourceRoot: '/'
    }))

    // Save
    .pipe(gulp.dest(paths.build))

});

// JS Plugins
gulp.task('scripts', function() {
  
  return gulp.src([
    paths.src + 'javascripts/jquery.js',
    paths.src + 'javascripts/imagesloaded.js',
    paths.src + 'javascripts/isotope.js',
    paths.src + 'javascripts/fancybox.js',
    paths.src + 'javascripts/application.js'
  ])
 
  .pipe(plugins.concat('application.js'))
 
  .on("error", plugins.notify.onError(function (error) {
    return error.message;
  }))
 
  .pipe(plugins.rename({ suffix: '.min' }))
 
  .pipe(plugins.uglify())
 
  .on("error", plugins.notify.onError(function (error) {
    return error.message;
  }))
 
  .pipe(gulp.dest(paths.build))

});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(paths.src + 'stylesheets/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch(paths.src + 'javascripts/**/*.js', ['scripts']);


});

// Build
gulp.task('build', ['styles', 'scripts', 'plugins']);