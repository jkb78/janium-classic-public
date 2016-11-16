// gulpfile.js

//////// --- INIT
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var concatCss    = require('gulp-concat-css');
var csscomb      = require('gulp-csscomb');
var csslint      = require('gulp-csslint');
var jshint       = require('gulp-jshint');
var less         = require('gulp-less');
var cleanCSS     = require('gulp-clean-css');
var rename       = require('gulp-rename');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var util         = require('gulp-util');
var path         = require('path');
var clean        = require('del');
var runSequence  = require('run-sequence');
var fs           = require('fs');
var ee           = require('streamee');

var pathTo = {
  master_less:          path.join(__dirname, 'master_less'),
  jnm_components:       path.join(__dirname, 'janium_components'),
  adminlte:             path.join(__dirname, 'bower_components', 'AdminLTE'),
  bootbox:              path.join(__dirname, 'bower_components', 'bootbox.js'),
  bootstrap:            path.join(__dirname, 'bower_components', 'bootstrap'),
  bootstrap_datepicker: path.join(__dirname, 'bower_components', 'bootstrap-datepicker'),
  bootstrap_notify:     path.join(__dirname, 'bower_components', 'remarkable-bootstrap-notify'),
  bootstrap_select:     path.join(__dirname, 'bower_components', 'bootstrap-select'),
  colorpicker:          path.join(__dirname, 'bower_components', 'mjolnic-bootstrap-colorpicker'),
  font_awesome:         path.join(__dirname, 'bower_components', 'font-awesome'),
  hasher:               path.join(__dirname, 'bower_components', 'hasher'),
  inputmask:            path.join(__dirname, 'bower_components', 'jquery.inputmask'),
  jquery:               path.join(__dirname, 'bower_components', 'jquery'),
  jqtree:               path.join(__dirname, 'bower_components', 'jqTree'),
  jquery_cookie:        path.join(__dirname, 'bower_components', 'jquery-cookie'),
  jquery_jsonp:         path.join(__dirname, 'bower_components', 'jquery-jsonp'),
  jquery_paging:        path.join(__dirname, 'bower_components', 'paging'),
  js_signals:           path.join(__dirname, 'bower_components', 'js-signals'),
  moment:               path.join(__dirname, 'bower_components', 'moment'),
  placeholder:          path.join(__dirname, 'bower_components', 'jquery-placeholder'),
  qrcode:               path.join(__dirname, 'bower_components', 'jquery-qrcode'),
  respond:              path.join(__dirname, 'bower_components', 'respond'),
  slimscroll:           path.join(__dirname, 'bower_components', 'slimScroll'),
  select2:              path.join(__dirname, 'bower_components', 'select2'),
  timepicker:           path.join(__dirname, 'bower_components', 'bootstrap-timepicker'),
  tokenfield:           path.join(__dirname, 'bower_components', 'bootstrap-tokenfield'),
  typeaheadjs:          path.join(__dirname, 'bower_components', 'typeahead.js'),
  validation:           path.join(__dirname, 'bower_components', 'jquery-validation'),

  bootstrap_assets:     path.join(__dirname, 'vendor_components', 'bootstrap'),
  datatables:           path.join(__dirname, 'vendor_components', 'datatables'),
  flaticon:             path.join(__dirname, 'vendor_components', 'flaticon'),
  json_forms:           path.join(__dirname, 'vendor_components', 'json-forms'),
  markdown:             path.join(__dirname, 'vendor_components', 'markdown'),
  modernizr:            path.join(__dirname, 'vendor_components', 'modernizr'),
  jquery_file_upload:   path.join(__dirname, 'vendor_components', 'jquery-file-upload'),
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
    'dist/htdocs/js/json-forms/*',
    'dist/htdocs/js/bootstrap/*',
    'dist/htdocs/js/modernizr/*',
    'dist/htdocs/js/markdown/*',
    'dist/htdocs/js/adminlte/*',
    'dist/htdocs/js/moment/*',
    'dist/htdocs/js/jquery/*',
    'dist/htdocs/js/hasher/*',
    'dist/htdocs/fonts/*',
    'dist/htdocs/css/*',
    'dist/htdocs/img/*'
  ], cb)
});


// ** Copy Icon fonts ** //
gulp.task('copy-icon-fonts', function() {
  return gulp.src([
    pathTo.flaticon     + '/fonts/**/*.{ttf,woff,eot,svg}',
    pathTo.font_awesome + '/fonts/**/*.{ttf,woff,eot,svg,woff2}',
    pathTo.bootstrap    + '/fonts/**/*.{ttf,woff,eot,svg,woff2}'
  ])
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'fonts')));
});


// ** Copy Images of Plugins ** //
gulp.task('copy-plugins-images', function() {
  return gulp.src([
    pathTo.colorpicker        + '/dist/img/**/*',
    pathTo.jquery_file_upload + '/img/**/*'
  ])
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'img')));
});


// ** Copy Plugins CSS files ** //
gulp.task('copy-plugins-css', function() {
  return gulp.src([
    pathTo.bootstrap_datepicker + '/dist/css/bootstrap-datepicker3.min.css.map'
  ])
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'janium')));
});

gulp.task('copy-plugins-css-custom', function() {
  return gulp.src([
    pathTo.bootstrap_datepicker + '/dist/css/bootstrap-datepicker3.min.css.map'
  ])
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'janium', 'custom')));
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
  return gulp.src([
    pathTo.bootstrap        + '/dist/js/bootstrap.min.js',
    pathTo.bootstrap_assets + '/ie10-viewport-bug-workaround.js'
  ])
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'js', 'bootstrap')));
});

gulp.task('copy-markdown-js', function() {
  return gulp.src(pathTo.markdown + '/markdown.min.js')
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'js', 'markdown')));
});

gulp.task('copy-moment-js', function() {
  return gulp.src(pathTo.moment + '/min/moment.min.js')
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'js', 'moment')));
});

gulp.task('copy-plugins-js', function() {
  return gulp.src([
    pathTo.bootstrap_datepicker  + '/dist/js/bootstrap-datepicker.min.js',
    pathTo.bootstrap_notify      + '/bootstrap-notify.min.js',
    pathTo.bootstrap_select      + '/dist/js/bootstrap-select.min.js',
    pathTo.bootstrap_select      + '/dist/js/bootstrap-select.js.map',
    pathTo.bootstrap_select      + '/dist/js/i18n/defaults-es_CL.min.js',
    pathTo.colorpicker           + '/dist/js/bootstrap-colorpicker.min.js',
    pathTo.datatables            + '/datatables.min.js',
    pathTo.datatables            + '/pdfmake.min.js.map',
    pathTo.inputmask             + '/dist/min/jquery.inputmask.bundle.min.js',
    pathTo.jquery_paging         + '/jquery.paging.min.js',
    pathTo.json_forms            + '/brutusin-json-forms-lan-es_ES.min.js',
    pathTo.placeholder           + '/jquery.placeholder.js',
    pathTo.placeholder           + '/jquery.placeholder.min.js',
    pathTo.placeholder           + '/jquery.placeholder.min.js.map',
    pathTo.qrcode                + '/dist/jquery.qrcode.min.js',
    pathTo.slimscroll            + '/jquery.slimscroll.min.js',
    pathTo.select2               + '/dist/js/select2.full.min.js',
    pathTo.tokenfield            + '/dist/bootstrap-tokenfield.min.js',
    pathTo.typeaheadjs           + '/dist/typeahead.bundle.min.js',
    pathTo.validation            + '/dist/jquery.validate.min.js',
    pathTo.validation            + '/dist/additional-methods.min.js'
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


// ** Join JS-Signals & Hasher ** //
gulp.task('join-signals-hasher', function() {
  return gulp.src([
    pathTo.js_signals + '/dist/signals.min.js',
    pathTo.hasher     + '/dist/js/hasher.min.js',
  ])
    .pipe(concat('signals-hasher.min.js'))
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'js', 'hasher')));
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

// gulp.task('compile-json-forms-js', function() {
//   return gulp.src([
//     pathTo.json_forms + '/brutusin-json-forms.js',
//     pathTo.json_forms + '/brutusin-json-forms-bootstrap.js'
//   ])
//     .pipe(uglify({ preserveComments: 'some' }))
//     .pipe(rename({suffix: '.min'}))

//     // Create minified & uglify file and map file
//     .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'js', 'json-forms')));
// });

gulp.task('compile-plugins-js', function() {
  return gulp.src([
    pathTo.bootbox            + '/bootbox.js',
    pathTo.datatables         + '/datatables-row-show.js',
    pathTo.datatables         + '/datatables-datetime-moment.js',
    pathTo.jqtree             + '/tree.jquery.js',
    pathTo.json_forms         + '/brutusin-json-forms.js',
    pathTo.json_forms         + '/brutusin-json-forms-bootstrap.js',
    pathTo.jquery_file_upload + '/jquery.fileupload.js',
    pathTo.jquery_file_upload + '/jquery.ui.widget.js'
  ])
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(rename({suffix: '.min'}))

    // Create minified & uglify file and map file
    .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'js', 'jquery', 'plugin')));
});


// ** Compile CSS files ** //
// gulp.task('compile-jqtree-css', function() {
//   return gulp.src(pathTo.jqtree + '/jqtree.css')
//     // Add .min to name file
//     .pipe(rename({suffix: '.min'}))

//     // Minify CSS file
//     .pipe(cleanCSS())

//     // Create minified file
//     .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'jquery_plugin')));
// });


// ** Compile LESS files ** //
// gulp.task('build-font-awesome', function() {
//   return gulp.src(pathTo.master_less + '/font-awesome.less')
//     //.pipe(sourcemaps.init())
//       // Compile LESS files
//       .pipe(less().on('error', console.log))

//       // CSS Linter
//       .pipe(csslint('./janium_components/less/janium-theme/.csslintrc.json'))
//       .pipe(csslint.reporter())

//       // Create CSS file
//       //.pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'font-awesome')))

//       // Add .min to name file
//       .pipe(rename({suffix: '.min'}))

//       // Minify CSS file
//       .pipe(cleanCSS())

//     //.pipe(sourcemaps.write('./'))

//     // Create minified file
//     .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'font-awesome')));
// });

// gulp.task('build-bootstrap', function() {
//   //return gulp.src(pathTo.jnm_components + '/less/*.less')
//   return gulp.src(pathTo.master_less + '/bootstrap.less')
//     //.pipe(sourcemaps.init())
//       // Compile LESS files
//       .pipe(less().on('error', console.log))

//       // Prefix CSS
//       .pipe(autoprefixer(
//         'Android 2.3',
//         'Android >= 4',
//         'Chrome >= 20',
//         'Firefox >= 24',
//         'Explorer >= 8',
//         'iOS >= 6',
//         'Opera >= 12',
//         'Safari >= 6'
//       ).on('error', console.log))

//       // CSS Linter
//       .pipe(csslint(pathTo.bootstrap + '/less/.csslintrc'))
//       //.pipe(csslint.reporter())

//       // Format style for CSS /.csscomb.json
//       .pipe(csscomb())

//       // Create CSS file
//       //.pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'bootstrap')))

//       // Add .min to name file
//       .pipe(rename({suffix: '.min'}))

//       // Minify CSS file
//       .pipe(cleanCSS({
//         compatibility: 'ie8',
//         noAdvanced: true
//       }))

//     //.pipe(sourcemaps.write('./'))

//     // Create minified file
//     .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'bootstrap')));

// });

// gulp.task('build-adminlte', function() {
//   return gulp.src(pathTo.master_less + '/adminlte.less')
//     //.pipe(sourcemaps.init())
//       // Compile LESS files
//       .pipe(less().on('error', console.log))

//       // CSS Linter
//       .pipe(csslint(pathTo.adminlte + '/build/less/.csslintrc'))
//       .pipe(csslint.reporter())

//       // Create CSS file
//       .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'adminlte')))

//       // Add .min to name file
//       .pipe(rename({suffix: '.min'}))

//       // Minify CSS file
//       .pipe(cleanCSS())

//     //.pipe(sourcemaps.write('./'))

//     // Create minified file
//     .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'adminlte')));
// });

// gulp.task('build-skins', function() {
//   return gulp.src(pathTo.master_less + '/skins/_all-skins.less')
//     //.pipe(sourcemaps.init())
//       // Compile LESS files
//       .pipe(less().on('error', console.log))

//       // CSS Linter
//       .pipe(csslint(pathTo.adminlte + '/build/less/.csslintrc'))
//       //.pipe(csslint.reporter())

//       // Create CSS file
//       //.pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'adminlte')))

//       // Add .min to name file
//       .pipe(rename({suffix: '.min'}))

//       // Minify CSS file
//       .pipe(cleanCSS())

//     //.pipe(sourcemaps.write('./'))

//     // Create minified file
//     .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'adminlte', 'skins')));
// });

// Genera Temas Janium
gulp.task('build-janium-skins', function() {

    var JBootstrap = gulp.src(pathTo.master_less + '/bootstrap.less')
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
    ;

    var JFontAwesome = gulp.src(pathTo.master_less + '/font-awesome.less')
        // Compile LESS files
        .pipe(less().on('error', console.log))

        // CSS Linter
        .pipe(csslint('./janium_components/less/janium-theme/.csslintrc.json'))
        //.pipe(csslint.reporter())
    ;

    var JAdminLTE = gulp.src(pathTo.master_less + '/adminlte.less')
        // Compile LESS files
        .pipe(less().on('error', console.log))

        // CSS Linter
        .pipe(csslint(pathTo.adminlte + '/build/less/.csslintrc'))
        //.pipe(csslint.reporter())
    ;

    var JSkins = gulp.src(pathTo.master_less + '/skins/_all-skins.less')
        // Compile LESS files
        .pipe(less().on('error', console.log))

        // CSS Linter
        .pipe(csslint(pathTo.adminlte + '/build/less/.csslintrc'))
        //.pipe(csslint.reporter())
    ;

    var JPlugins = gulp.src([
        pathTo.json_forms           + '/brutusin-json-forms.min.css',
        pathTo.bootstrap_datepicker + '/dist/css/bootstrap-datepicker3.min.css',
        pathTo.bootstrap_select     + '/dist/css/bootstrap-select.min.css',
        pathTo.datatables           + '/datatables.min.css',
        pathTo.select2              + '/dist/css/select2.min.css',
        pathTo.jqtree               + '/jqtree.css'
    ]);

    var mergedStream = ee.concatenate([JBootstrap, JFontAwesome, JPlugins, JAdminLTE, JSkins])
        .pipe(concat('janium_skins.min.css'))
        .pipe(cleanCSS({
          compatibility: 'ie8',
          noAdvanced: true
        }))
        .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'janium')));

    return mergedStream;
});


// Genera Temas Custom
gulp.task('generate-custom-skins', function() {

  try {
    var s = fs.statSync('custom.json');

    console.log('Generando archivo personalizado...');

    // el archivo existe...
    var json_data = fs.readFileSync('custom.json');
    var custom_variables = {
      modifyVars: JSON.parse( json_data.toString() )
    };
    console.log('Datos archivo custom...');
    console.log(custom_variables);

    var CBootstrap = gulp.src(pathTo.master_less + '/bootstrap.less')
        // Compile LESS files
        .pipe(less(custom_variables).on('error', console.log))

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
    ;
    console.log('Bootstrap procesado...');

    //var CFontAwesome = gulp.src(pathTo.master_less + '/font-awesome.less')
        // Compile LESS files
        //.pipe(less().on('error', console.log))

        // CSS Linter
        //.pipe(csslint('./janium_components/less/janium-theme/.csslintrc.json'))
        //.pipe(csslint.reporter())
    //;
    //console.log('FontAwesome procesado...');

    var CAdminLTE = gulp.src(pathTo.master_less + '/adminlte.less')
        // Compile LESS files
        .pipe(less(custom_variables).on('error', console.log))

        // CSS Linter
        .pipe(csslint(pathTo.adminlte + '/build/less/.csslintrc'))
        //.pipe(csslint.reporter())
    ;
    console.log('AdminLTE procesado...');

    var CSkins = gulp.src(pathTo.master_less + '/skins/_all-skins.less')
        // Compile LESS files
        .pipe(less(custom_variables).on('error', console.log))

        // CSS Linter
        .pipe(csslint(pathTo.adminlte + '/build/less/.csslintrc'))
        //.pipe(csslint.reporter())
    ;
    console.log('Skins procesados...');

    var CPlugins = gulp.src([
        pathTo.json_forms           + '/brutusin-json-forms.min.css',
        pathTo.bootstrap_datepicker + '/dist/css/bootstrap-datepicker3.min.css',
        pathTo.bootstrap_select     + '/dist/css/bootstrap-select.min.css',
        pathTo.datatables           + '/datatables.min.css',
        pathTo.select2              + '/dist/css/select2.min.css',
        pathTo.jqtree               + '/jqtree.css'
    ]);
    console.log('Plugins procesados...');

    var mergedStream = ee.concatenate([CBootstrap, CPlugins, CAdminLTE, CSkins])
        .pipe(concat('janium_skins.min.css'))
        .pipe(cleanCSS({
          compatibility: 'ie8',
          noAdvanced: true
        }))
        .pipe(gulp.dest(path.join(pathTo.htdocs_folder, 'css', 'janium', 'custom')));

    console.log('Skin personalizado creado...');

    return mergedStream;
  }
  catch( err ) {
    // el archivo no existe...
    throw "En el archivo custom..." + err;
  }

});

//////// --- WATCH


//////// --- EXCECUTE TASK's
gulp.task('default', function(callback) {
  runSequence(
    'clean',
    'copy-icon-fonts',
    'copy-plugins-images',
    'copy-plugins-css',
    ['copy-jquery', 'copy-bootstrap-js', 'copy-plugins-js', 'copy-markdown-js', 'copy-moment-js'],
    ['join-modernizr-response', 'join-signals-hasher'],
    'build-janium-skins',
    ['compile-admin-lte-js', 'compile-timepicker-js', 'compile-plugins-js'],
    function(error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('RELEASE FINISHED SUCCESSFULLY!!');
      }
      callback(error);
    });
});

gulp.task('build-custom-skins', ['generate-custom-skins', 'copy-plugins-css-custom']);
