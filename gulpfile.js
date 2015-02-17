// gulpfile.js

// --- INIT
var gulp    = require('gulp');
var less    = require('gulp-less');
var path    = require('path');
var csslint = require('gulp-csslint');
var csscomb = require('gulp-csscomb');
var minify  = require('gulp-minify-css');
var rename  = require('gulp-rename');
var clean   = require('del');
var autoprefixer = require('gulp-autoprefixer');

var config = {
  JNMPath: path.join(__dirname, 'janium_components'),
  FAPath: path.join(__dirname, 'bower_components', 'fontawesome'),
  TBPath: path.join(__dirname, 'bower_components', 'bootstrap'),
  JQCookiePath: path.join(__dirname, 'bower_components', 'jquery-cookie'),
  JQJsonpPath: path.join(__dirname, 'bower_components', 'jquery-jsonp'),
  JQPhPath: path.join(__dirname, 'bower_components', 'jquery-placeholder'),
  JQValPath: path.join(__dirname, 'bower_components', 'jquery-validation'),
  JQPrintPath: path.join(__dirname, 'bower_components', 'print-area'),
  JQRespondPath: path.join(__dirname, 'bower_components', 'respond-minmax'),
  JQZtreePath: path.join(__dirname, 'bower_components', 'ztree_v3'),
  PubPath: path.join(__dirname, 'dist', 'public')
}

// --- TASK
// ** Copy fonts **//
gulp.task('fontawesome-fonts', function() {
  return gulp.src(config.FAPath + '/fonts/**/*.{ttf,woff,eot,svg}')
    .pipe(gulp.dest(path.join(config.PubPath, 'fonts')));
});

gulp.task('bootstrap-fonts', function() {
  return gulp.src(config.TBPath + '/fonts/**/*.{ttf,woff,eot,svg}')
    .pipe(gulp.dest(path.join(config.PubPath, 'fonts')));
});





gulp.task('build-less', function () {

  return gulp.src(config.JNMPath + '/less/*.less')
  //return gulp.src(config.JNMPath + '/less/deep-blue.less')
    // Compile LESS files
    .pipe(less().on('error', console.log))

    // Prefix CSS
    .pipe(autoprefixer(
      'Android 2.3',
      'Android >= 4',
      'Chrome >= 20',
      'Firefox >= 24',
      'Explorer >= 8',
      'iOS >= 6',
      'Opera >= 12',
      'Safari >= 6'
    ).on('error', console.log))

    // CSS Linter
    .pipe(csslint('./janium_components/less/.csslintrc.json'))
    //.pipe(csslint.reporter())

    // Format style for CSS less/.csscomb.json
    .pipe(csscomb())

    // Create CSS file
    .pipe(gulp.dest(path.join(config.PubPath, 'css')))

    // Add .min to name file
    .pipe(rename({suffix: '.min'}))

    // Minify CSS file
    .pipe(minify({
      compatibility: 'ie8',
      noAdvanced: true
    }))

    // Create minified file
    .pipe(gulp.dest(path.join(config.PubPath, 'css')));

});

gulp.task('clean', function(cb) {
  // Clean destination folder
  clean(['dist/public/fonts', 'dist/public/css'], cb)
});

// --- WATCH


// --- DEFAULT
//gulp.task('default', ['build-less'], function() {
//  console.log('Tareas finalizadas ...');
//});


gulp.task('default', ['clean', 'fontawesome-fonts', 'bootstrap-fonts', 'build-less'], function() {
  console.log('Default ...');
  //gulp.start('build-less');
});
