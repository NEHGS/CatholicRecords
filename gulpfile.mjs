import { src, dest, series, parallel } from 'gulp';
import cleanCSS from 'gulp-cleaner-css';
import gulpif from 'gulp-if'
import uglify from 'gulp-uglify';
import useref from 'gulp-useref';
import imagemin from 'gulp-imagemin';

import browserSyncLib from 'browser-sync';
import { deleteAsync } from 'del';

const browserSync = browserSyncLib.create();

// Paths
const paths = {
  html: {
    src: "*.html",
    dest: "dist/",
  },
  styles: {
    src: "css/**/*.scss",
    dest: "dist/css/",
  },
  scripts: {
    src: "js/**/*.js",
    dest: "dist/js/",
  },
  images: {
    src: "images/**/*.{jpg,jpeg,png,svg}",
    dest: "dist/images/",
  },
};

export function clean() {
	return deleteAsync(['dist/**', "!dist"]);
}

export function images() {
    return src('images/**',
    	{base: './images/', encoding: false})
      .pipe(imagemin())
      .pipe(dest('dist/images'));
}

export function useRef() {
	return src('index.html')
	  .pipe(useref())
	  .pipe(gulpif('*.css', cleanCSS()))
	  .pipe(gulpif('*.js', uglify()))
	  .pipe(dest('dist'));
};

export function fonts() {
	return src('fonts/**')
	  .pipe(dest('dist/fonts'));
};

export function json() {
	return src('json/**')
	  .pipe(dest('dist/json'))
};

export function serve() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
}

export const build = series(
	clean,
	parallel(useRef, fonts, json, images)
);

export default series(build, serve);