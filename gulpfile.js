// gulpfile.js

//////// --- INIT
var gulp         = require('gulp');
var less         = require('gulp-less');
var path         = require('path');
var csslint      = require('gulp-csslint');
var csscomb      = require('gulp-csscomb');
var minify       = require('gulp-minify-css');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var sourcemaps   = require('gulp-sourcemaps');
var jshint       = require('gulp-jshint');
var clean        = require('del');
var autoprefixer = require('gulp-autoprefixer');

var config = {
  MTRPath:      path.join(__dirname, 'master_less'),
  JNMPath:      path.join(__dirname, 'janium_components'),
  BSPath:       path.join(__dirname, 'bower_components', 'bootstrap'),
  LTEPath:      path.join(__dirname, 'bower_components', 'AdminLTE'),
  FAPath:       path.join(__dirname, 'bower_components', 'font-awesome'),
  JQPath:       path.join(__dirname, 'bower_components', 'jquery'),
  JQCookiePath: path.join(__dirname, 'bower_components', 'jquery-cookie'),
  JQJsonpPath:  path.join(__dirname, 'bower_components', 'jquery-jsonp'),
  JQPhPath:     path.join(__dirname, 'bower_components', 'jquery-placeholder'),
  JQValPath:    path.join(__dirname, 'bower_components', 'jquery-validation'),
  //JQPrintPath: path.join(__dirname, 'bower_components', 'print-area'),
  //JQRespondPath: path.join(__dirname, 'bower_components', 'respond-minmax'),
  //JQZtreePath: path.join(__dirname, 'bower_components', 'ztree_v3'),
  FIPath:       path.join(__dirname, 'vendor_components', 'flaticon'),
  PubPath:      path.join(__dirname, 'dist', 'htdocs')
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

//////// --- DEFINE TASK's

// ** Clean destination folder ** //
gulp.task('clean', function(cb) {
  clean([
    'dist/htdocs/js/bootstrap/*',
    'dist/htdocs/js/adminlte/*',
    'dist/htdocs/js/jquery/*',
    'dist/htdocs/fonts/*',
    'dist/htdocs/css/*'
  ], cb)
});

// ** Copy fonts ** //
gulp.task('copy-flaticon-fonts', function() {
  return gulp.src(config.FIPath + '/fonts/**/*.{ttf,woff,eot,svg}')
    .pipe(gulp.dest(path.join(config.PubPath, 'fonts')));
});

gulp.task('copy-fontawesome-fonts', function() {
  return gulp.src(config.FAPath + '/fonts/**/*.{ttf,woff,eot,svg,woff2}')
    .pipe(gulp.dest(path.join(config.PubPath, 'fonts')));
});

gulp.task('copy-bootstrap-fonts', function() {
  return gulp.src(config.BSPath + '/fonts/**/*.{ttf,woff,eot,svg,woff2}')
    .pipe(gulp.dest(path.join(config.PubPath, 'fonts')));
});

// ** Copy jQuery & Bootstrap Javascript ** //
gulp.task('copy-jquery', function() {
  return gulp.src([
    path.join(config.JQPath, 'dist', 'jquery.js'),
    path.join(config.JQPath, 'dist', 'jquery.min.js'),
    path.join(config.JQPath, 'dist', 'jquery.min.map')
  ])
    .pipe(gulp.dest(path.join(config.PubPath, 'js', 'jquery')));
});

gulp.task('copy-bootstrap-js', function() {
  return gulp.src(config.BSPath + '/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(path.join(config.PubPath, 'js', 'bootstrap')));
});

// ** Process Javascript files ** //
gulp.task('uglify-admin-lte-js', function() {
  return gulp.src(config.LTEPath + '/dist/js/app.js')
    .pipe(sourcemaps.init())
      .pipe(uglify({ preserveComments: 'some' }))
      .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))

    // Create minified & uglify file and map file
    .pipe(gulp.dest(path.join(config.PubPath, 'js', 'adminlte')));
});

// ** Validate JS code ** //
gulp.task('lint-admin-lte-js', function() {
  return gulp.src(config.LTEPath + '/dist/js/app.js')
    .pipe(jshint(jshintLteConfig))
    .pipe(jshint.reporter('jshint-stylish'))
});

// ** Compile LESS files ** //
gulp.task('build-font-awesome', function () {
  return gulp.src(config.MTRPath + '/font-awesome.less')
    .pipe(sourcemaps.init())
      // Compile LESS files
      .pipe(less().on('error', console.log))

      // CSS Linter
      .pipe(csslint('./janium_components/less/janium-theme/.csslintrc.json'))
      .pipe(csslint.reporter())

      // Create CSS file
      //.pipe(gulp.dest(path.join(config.PubPath, 'css', 'font-awesome')))

      // Add .min to name file
      .pipe(rename({suffix: '.min'}))

      // Minify CSS file
      .pipe(minify())

    .pipe(sourcemaps.write('./'))

    // Create minified file
    .pipe(gulp.dest(path.join(config.PubPath, 'css', 'font-awesome')));
});

gulp.task('build-janium-theme', function () {
  //return gulp.src(config.JNMPath + '/less/*.less')
  return gulp.src(config.JNMPath + '/less/janium-theme/theme.less')
    .pipe(sourcemaps.init())
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
      .pipe(csslint.reporter())

      // Format style for CSS less/janium-theme/.csscomb.json
      .pipe(csscomb())

      // Create CSS file
      //.pipe(gulp.dest(path.join(config.PubPath, 'css', 'bootstrap')))

      // Add .min to name file
      .pipe(rename({suffix: '.min'}))

      // Minify CSS file
      .pipe(minify({
        compatibility: 'ie8',
        noAdvanced: true
      }))

    .pipe(sourcemaps.write('./'))

    // Create minified file
    .pipe(gulp.dest(path.join(config.PubPath, 'css', 'bootstrap')));

});

gulp.task('build-adminlte', function () {
  return gulp.src(config.MTRPath + '/adminlte.less')
    .pipe(sourcemaps.init())
      // Compile LESS files
      .pipe(less().on('error', console.log))

      // CSS Linter
      .pipe(csslint(config.LTEPath + '/build/less/.csslintrc'))
      .pipe(csslint.reporter())

      // Create CSS file
      //.pipe(gulp.dest(path.join(config.PubPath, 'css', 'adminlte')))

      // Add .min to name file
      .pipe(rename({suffix: '.min'}))

      // Minify CSS file
      .pipe(minify())

    .pipe(sourcemaps.write('./'))

    // Create minified file
    .pipe(gulp.dest(path.join(config.PubPath, 'css', 'adminlte')));
});


//////// --- WATCH


//////// --- EXCECUTE TASK's

gulp.task('clean-htdocs', ['clean']);

gulp.task('copy-fonts', ['clean-htdocs', 'copy-flaticon-fonts', 'copy-fontawesome-fonts', 'copy-bootstrap-fonts']);

gulp.task('compile-less-files', ['clean-htdocs', 'build-font-awesome', 'build-adminlte', 'build-janium-theme']);

gulp.task('copy-javascript-files', ['clean-htdocs', 'copy-jquery', 'copy-bootstrap-js']);

gulp.task('default', ['copy-fonts', 'compile-less-files', 'copy-javascript-files', 'uglify-admin-lte-js', 'lint-admin-lte-js']);
