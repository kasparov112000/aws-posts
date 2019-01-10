var gulp = require('gulp');

var argv = require('yargs').argv;
var git = require('gulp-git');
var runSequence = require('run-sequence').use(gulp);

gulp.task('init', function () {
  console.log(argv.m);
});

gulp.task('add', function () {
  console.log('adding...');
  return gulp.src('.')
    .pipe(git.add());
});

gulp.task('commit', function () {
  console.log('commiting');
  if (argv.m) {
    return gulp.src('.')
      .pipe(git.commit(argv.m));
  }
});

gulp.task('push', function () {
  console.log('pushing...');
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

gulp.task('gitsend', function () {
  runSequence('add', 'commit', 'push');
});
