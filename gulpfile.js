import gulp from 'gulp';
import cleanCSS from 'gulp-cleaner-css';
import useref from 'gulp-useref';
import gulpif from 'gulp-if'
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';

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

gulp.task('fonts', function() {
	return gulp.src('fonts/**')
	  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('json', function() {
	return gulp.src('json/**')
	  .pipe(gulp.dest('dist/json'))
});

gulp.task('default', gulp.parallel('useref', 'fonts', 'json', 'img-compress'));