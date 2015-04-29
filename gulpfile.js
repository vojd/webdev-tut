var gulp = require('gulp'),
    path = require('path'),
    watch = require('gulp-watch'),
    webpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config.js'),
    WebpackDevServer = require("webpack-dev-server"),
    connect = require('gulp-connect'),
    exec = require('child_process').exec;

var paths = {
  src: './src',
  dest: './dist'
};

gulp.task('webpack', function () {
  return gulp.src(path.join(paths.src, '**', '*.js'))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.dest))
    .pipe(connect.reload());
});

gulp.task("serve", function(callback) {
  // Start a webpack-dev-server
  var compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler, {
    // server and middleware options
  }).listen(8080, "localhost", function(err) {
      if(err) throw new gutil.PluginError("serve", err);
      // Server listening
      gutil.log("[serve]", "http://localhost:8080/webpack-dev-server/index.html");
      // keep the server alive or continue?
      // callback();
    });
});

gulp.task('html', function(){
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest(paths.dest))
    .pipe(connect.reload());
});

gulp.task('watch', function () {

  gulp.watch(['src/**/*.js'], ['webpack']);
  gulp.watch(['src/**/*.html'], ['html']);
});

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('run-api-server', function (cb) {
  exec('node server.js', function(err, stdout, stderr){
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('default', ['html', 'webpack', 'watch', 'connect', 'run-api-server'], function () {
});