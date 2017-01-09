var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', function() {
    return gulp.src('css/*.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist'));
});