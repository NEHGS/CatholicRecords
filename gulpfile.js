var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

gulp.task('minify-css', function() {
    return gulp.src('css/*.css')
      .pipe(concatCSS('css/bundle.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(''));
});

gulp.task('useref', function() {
	return gulp.src('index.html')
	  .pipe(useref())
	  .pipe(gulpif('*.css', cleanCSS()))
	  .pipe(gulpif('*.js', uglify()))
	  .pipe(gulp.dest('dist'));
});