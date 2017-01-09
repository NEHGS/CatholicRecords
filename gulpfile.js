var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concatCSS = require('gulp-concat-css');

gulp.task('minify-css', function() {
    return gulp.src('css/*.css')
      .pipe(concatCSS('css/bundle.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(''));
});