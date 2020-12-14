var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

gulp.task('img-compress', function() {
    return gulp.src('images/**',
    	{base: '.images/'})
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'));
});

gulp.task('useref', function() {
	return gulp.src('index.html')
	  .pipe(useref())
	  .pipe(gulpif('*.css', cleanCSS()))
	  .pipe(gulpif('*.js', uglify()))
	  .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.parallel('useref', 'img-compress'));
//gulp.task('default', ['img-compress', 'useref']);