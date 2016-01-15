// gulpfile.js

//////// --- INIT
var gulp         = require('gulp');
var less         = require('gulp-less');
var csslint      = require('gulp-csslint');
var csscomb      = require('gulp-csscomb');
var minify       = require('gulp-minify-css');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var sourcemaps   = require('gulp-sourcemaps');
var jshint       = require('gulp-jshint');
var concat       = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var path         = require('path');
var clean        = require('del');
var runSequence  = require('run-sequence');

var pathTo = {
  master_less:          path.join(__dirname, 'master_less'),
  jnm_components:       path.join(__dirname, 'janium_components'),
  bootstrap:            path.join(__dirname, 'bower_components', 'bootstrap'),
  adminlte:             path.join(__dirname, 'bower_components', 'AdminLTE'),
  font_awesome:         path.join(__dirname, 'bower_components', 'font-awesome'),
  jquery:               path.join(__dirname, 'bower_components', 'jquery'),
  jquery_cookie:        path.join(__dirname, 'bower_components', 'jquery-cookie'),
  jquery_jsonp:         path.join(__dirname, 'bower_components', 'jquery-jsonp'),
  placeholder:          path.join(__dirname, 'bower_components', 'jquery-placeholder'),
  validation:           path.join(__dirname, 'bower_components', 'jquery-validation'),
  slimscroll:           path.join(__dirname, 'bower_components', 'slimScroll'),
  select2:              path.join(__dirname, 'bower_components', 'select2'),
  inputmask:            path.join(__dirname, 'bower_components', 'jquery.inputmask'),
  timepicker:           path.join(__dirname, 'bower_components', 'bootstrap-timepicker'),
  colorpicker:          path.join(__dirname, 'bower_components', 'mjolnic-bootstrap-colorpicker'),
  respond:              path.join(__dirname, 'bower_components', 'respond'),


  datatables:           path.join(__dirname, 'vendor_components', 'datatables'),
  modernizr:            path.join(__dirname, 'vendor_components', 'modernizr'),
  flaticon:             path.join(__dirname, 'vendor_components', 'flaticon'),
  //JQPrintPath: path.join(__dirname, 'bower_components', 'print-area'),
  //JQZtreePath: path.join(__dirname, 'bower_components', 'ztree_v3'),
  htdocs_folder:        path.join(__dirname, 'dist', 'htdocs')
}

var jshintLteConfig = {
  "lookup"   : false,
  "asi"      : true,
  "browser"  : true,
  "eqeqeq"   : false,
  "eqnull"   : true,
  "es3"      : true,
  "expr"     : true,
  "jquery"   : true,
  "latedef"  : "nofunc",
  "laxbreak" : true,
  "nonbsp"   : true,
  "strict"   : true,
  "undef"    : true,
  "unused"   : true,
  // External variabls and plugins
  "predef":  [ "AdminLTEOptions", "FastClick", "moment", "Morris", "Chart" ]
}

var jshintTimePickerConfig = {
  "browser"   : true,
  "camelcase" : true,
  "curly"     : true,
  "eqeqeq"    : true,
  "eqnull"    : true,
  "immed"     : true,
  "indent"    : 2,
  "latedef"   : true,
  "newcap"    : true,
  "noarg"     : true,
  "quotmark"  : true,
  "sub"       : true,
  "strict"    : true,
  "trailing"  : true,
  "undef"     : true,
  "unused"    : true,
  "laxcomma"  : true,
  "white"     : false,
  "globals": {
    "jQuery"       : true,
    "$"            : true,
    "expect"       : true,
    "it"           : true,
    "beforeEach"   : true,
    "afterEach"    : true,
    "describe"     : true,
    "loadFixtures" : true,
    "console"      : true,
    "module"       : true
  }
}

//////// --- DEFINE TASK's

// ** Clean destination folder ** //
gulp.task('clean', function(cb) {
  clean([
    'dist/htdocs/js/bootstrap/*',
    'dist/htdocs/js/modernizr/*',
    'dist/htdocs/js/adminlte/*',
    'dist/htdocs/js/jquery/*',
    'dist/htdocs/fonts/*',
    'dist/htdocs/css/*'
  ], cb)
});

// ** Copy Icon fonts ** //
gulp.task('copy-icon-fonts', function() {
  return gulp.src([
    pathTo.flaticon + '/fonts/**/*.{ttf,woff,eot,svg}',
    pathTo.font_awesome + '/fonts/**/*.{ttf,woff,eot,svg,woff2}',
    pathTo.bootstrap + '/fonts/**/*.{ttf,woff,eot,svg,woff2}'
  ])
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'fonts')));
});


// ** Copy Images of Plugins ** //
gulp.task('copy-plugins-images', function() {
  return gulp.src([
    pathTo.colorpicker + '/dist/img/**/*'
  ])
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'img')));
});


// ** Copy Plugins CSS files ** //
gulp.task('copy-plugins-css', function() {
  return gulp.src([
    pathTo.datatables + '/datatables.min.css',
    pathTo.select2    + '/dist/css/select2.min.css'
  ])
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'jquery_plugin')));
});


// ** Copy jQuery, Bootstrap y Plugins Javascript ** //
gulp.task('copy-jquery', function() {
  return gulp.src([
    path.join(pathTo.jquery, 'dist', 'jquery.js'),
    path.join(pathTo.jquery, 'dist', 'jquery.min.js'),
    path.join(pathTo.jquery, 'dist', 'jquery.min.map')
  ])
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'js', 'jquery')));
});

gulp.task('copy-bootstrap-js', function() {
  return gulp.src(pathTo.bootstrap + '/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'js', 'bootstrap')));
});

gulp.task('copy-plugins-js', function() {
  return gulp.src([
    pathTo.datatables  + '/datatables.min.js',
    pathTo.slimscroll  + '/jquery.slimscroll.min.js',
    pathTo.select2     + '/dist/js/select2.full.min.js',
    pathTo.inputmask   + '/dist/jquery.inputmask.bundle.min.js',
    pathTo.inputmask   + '/jquery.inputmask.extensions.min.js',
    pathTo.colorpicker + '/dist/js/bootstrap-colorpicker.min.js',
    pathTo.placeholder + '/jquery.placeholder.js',
    pathTo.placeholder + '/jquery.placeholder.min.js',
    pathTo.placeholder + '/jquery.placeholder.min.js.map',
    pathTo.validation  + '/dist/jquery.validate.min.js',
    pathTo.validation  + '/dist/additional-methods.min.js'
  ])
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'js', 'jquery', 'plugin')));
});


// ** Join Modernizr & Response ** //
gulp.task('join-modernizr-response', function() {
  return gulp.src([
    pathTo.modernizr + '/modernizr.min.js',
    pathTo.respond   + '/dest/respond.min.js',
  ])
    .pipe(concat('modernizr-respond.min.js'))
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'js', 'modernizr')));
});


// ** Compile Javascript files ** //
gulp.task('compile-admin-lte-js', function() {
  return gulp.src(pathTo.adminlte + '/dist/js/app.js')
    //.pipe(sourcemaps.init())

      // Validate JS code
      .pipe(jshint(jshintLteConfig))
      .pipe(jshint.reporter('jshint-stylish'))

      .pipe(uglify({ preserveComments: 'some' }))
      .pipe(rename({suffix: '.min'}))
    //.pipe(sourcemaps.write('./'))

    // Create minified & uglify file and map file
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'js', 'adminlte')));
});

gulp.task('compile-timepicker-js', function() {
  return gulp.src(pathTo.timepicker + '/js/bootstrap-timepicker.js')
    //.pipe(sourcemaps.init())

      // Validate JS code
      .pipe(jshint(jshintTimePickerConfig))
      .pipe(jshint.reporter('jshint-stylish'))

      .pipe(uglify({ preserveComments: 'some' }))
      .pipe(rename({suffix: '.min'}))
    //.pipe(sourcemaps.write('./'))

    // Create minified & uglify file and map file
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'js', 'jquery', 'plugin')));
});


// ** Compile LESS files ** //
gulp.task('build-font-awesome', function() {
  return gulp.src(pathTo.master_less + '/font-awesome.less')
    //.pipe(sourcemaps.init())
      // Compile LESS files
      .pipe(less().on('error', console.log))

      // CSS Linter
      .pipe(csslint('./janium_components/less/janium-theme/.csslintrc.json'))
      .pipe(csslint.reporter())

      // Create CSS file
      //.pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'font-awesome')))

      // Add .min to name file
      .pipe(rename({suffix: '.min'}))

      // Minify CSS file
      .pipe(minify())

    //.pipe(sourcemaps.write('./'))

    // Create minified file
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'font-awesome')));
});

gulp.task('build-bootstrap', function() {
  //return gulp.src(pathTo.jnm_components + '/less/*.less')
  return gulp.src(pathTo.master_less + '/bootstrap.less')
    //.pipe(sourcemaps.init())
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
      .pipe(csslint(pathTo.bootstrap + '/less/.csslintrc'))
      //.pipe(csslint.reporter())

      // Format style for CSS /.csscomb.json
      .pipe(csscomb())

      // Create CSS file
      //.pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'bootstrap')))

      // Add .min to name file
      .pipe(rename({suffix: '.min'}))

      // Minify CSS file
      .pipe(minify({
        compatibility: 'ie8',
        noAdvanced: true
      }))

    //.pipe(sourcemaps.write('./'))

    // Create minified file
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'bootstrap')));

});

gulp.task('build-adminlte', function() {
  return gulp.src(pathTo.master_less + '/adminlte.less')
    //.pipe(sourcemaps.init())
      // Compile LESS files
      .pipe(less().on('error', console.log))

      // CSS Linter
      .pipe(csslint(pathTo.adminlte + '/build/less/.csslintrc'))
      .pipe(csslint.reporter())

      // Create CSS file
      .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'adminlte')))

      // Add .min to name file
      .pipe(rename({suffix: '.min'}))

      // Minify CSS file
      .pipe(minify())

    //.pipe(sourcemaps.write('./'))

    // Create minified file
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'adminlte')));
});

gulp.task('build-skins', function() {
  return gulp.src(pathTo.master_less + '/skins/_all-skins.less')
    //.pipe(sourcemaps.init())
      // Compile LESS files
      .pipe(less().on('error', console.log))

      // CSS Linter
      .pipe(csslint(pathTo.adminlte + '/build/less/.csslintrc'))
      //.pipe(csslint.reporter())

      // Create CSS file
      //.pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'adminlte')))

      // Add .min to name file
      .pipe(rename({suffix: '.min'}))

      // Minify CSS file
      .pipe(minify())

    //.pipe(sourcemaps.write('./'))

    // Create minified file
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'adminlte', 'skins')));
});

//////// --- WATCH


//////// --- EXCECUTE TASK's
gulp.task('default', function(callback) {
  runSequence(
    'clean',
    'copy-icon-fonts',
    'copy-plugins-images',
    'copy-plugins-css',
    ['copy-jquery', 'copy-bootstrap-js', 'copy-plugins-js'],
    'join-modernizr-response',
    ['build-font-awesome', 'build-adminlte', 'build-skins', 'build-bootstrap'],
    ['compile-admin-lte-js', 'compile-timepicker-js'],
    function(error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('RELEASE FINISHED SUCCESSFULLY!!');
      }
      callback(error);
    });
});
