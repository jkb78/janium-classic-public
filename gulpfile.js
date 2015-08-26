// gulpfile.js

//////// --- INIT
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
  MTRPath: path.join(__dirname, 'master_less'),
  JNMPath: path.join(__dirname, 'janium_components'),
  BSPath:  path.join(__dirname, 'bower_components', 'bootstrap'),
  LTEPath: path.join(__dirname, 'bower_components', 'AdminLTE'),
  FAPath:  path.join(__dirname, 'bower_components', 'font-awesome'),
  JQPath:  path.join(__dirname, 'bower_components', 'jquery'),
  JQCookiePath: path.join(__dirname, 'bower_components', 'jquery-cookie'),
  JQJsonpPath:  path.join(__dirname, 'bower_components', 'jquery-jsonp'),
  JQPhPath:     path.join(__dirname, 'bower_components', 'jquery-placeholder'),
  JQValPath:    path.join(__dirname, 'bower_components', 'jquery-validation'),
  //JQPrintPath: path.join(__dirname, 'bower_components', 'print-area'),
  //JQRespondPath: path.join(__dirname, 'bower_components', 'respond-minmax'),
  //JQZtreePath: path.join(__dirname, 'bower_components', 'ztree_v3'),
  FIPath: path.join(__dirname, 'vendor_components', 'flaticon'),
  PubPath: path.join(__dirname, 'dist', 'htdocs')
}

//////// --- TASK

// ** Copy fonts ** //
gulp.task('flaticon-fonts', function() {
  return gulp.src(config.FIPath + '/fonts/**/*.{ttf,woff,eot,svg}')
    .pipe(gulp.dest(path.join(config.PubPath, 'fonts')));
});

gulp.task('fontawesome-fonts', function() {
  return gulp.src(config.FAPath + '/fonts/**/*.{ttf,woff,eot,svg}')
    .pipe(gulp.dest(path.join(config.PubPath, 'fonts')));
});

gulp.task('bootstrap-fonts', function() {
  return gulp.src(config.BSPath + '/fonts/**/*.{ttf,woff,eot,svg}')
    .pipe(gulp.dest(path.join(config.PubPath, 'fonts')));
});

// ** Compile LESS files ** //
gulp.task('build-font-awesome', function () {
  return gulp.src(config.MTRPath + '/font-awesome.less')
    // Compile LESS files
    .pipe(less().on('error', console.log))

    // CSS Linter
    .pipe(csslint('./janium_components/less/janium-theme/.csslintrc.json'))
    .pipe(csslint.reporter())

    // Create CSS file
    .pipe(gulp.dest(path.join(config.PubPath, 'css', 'font-awesome')))

    // Add .min to name file
    .pipe(rename({suffix: '.min'}))

    // Minify CSS file
    .pipe(minify())

    // Create minified file
    .pipe(gulp.dest(path.join(config.PubPath, 'css', 'font-awesome')));
});

gulp.task('build-janium-theme', function () {
  //return gulp.src(config.JNMPath + '/less/*.less')
  return gulp.src(config.JNMPath + '/less/janium-theme/theme.less')
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
    .pipe(csslint('./janium_components/less/janium-theme/.csslintrc.json'))
    //.pipe(csslint.reporter())

    // Format style for CSS less/janium-theme/.csscomb.json
    .pipe(csscomb())

    // Create CSS file
    .pipe(gulp.dest(path.join(config.PubPath, 'css', 'bootstrap')))

    // Add .min to name file
    .pipe(rename({suffix: '.min'}))

    // Minify CSS file
    .pipe(minify({
      compatibility: 'ie8',
      noAdvanced: true
    }))

    // Create minified file
    .pipe(gulp.dest(path.join(config.PubPath, 'css', 'bootstrap')));

});


//////// --- WATCH


//////// --- TASK's

gulp.task('clean-htdocs', function(cb) {
  // Clean destination folder
  console.log('Limpiando directorio htdocs ...');
  clean(['dist/htdocs/fonts/*', 'dist/htdocs/css/*', 'dist/htdocs/js/*'], cb)
});

//gulp.task('clean-htdocs', ['clean'], function() {
//  console.log('Copiando fuentes Flaticon, FontAwesome y Bootstrap...');
//});

gulp.task('copy-fonts', ['clean-htdocs', 'flaticon-fonts', 'fontawesome-fonts', 'bootstrap-fonts'], function() {
});

gulp.task('default', ['copy-fonts', 'build-font-awesome'], function() {
  console.log('Compilando archivos LESS ...');
  gulp.start('build-janium-theme');
});
