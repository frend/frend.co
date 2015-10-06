//----------------------------------------------------------------------
//	FREND
//	Gulp tasks
//----------------------------------------------------------------------

//	All
//-----------------------------------
var gulp = require('gulp');
var pkg = require('./package.json');
var cache = require('gulp-cached');
var rename = require('gulp-rename');

//	CSS
//-----------------------------------
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var cmq = require('gulp-combine-media-queries');
var sourcemaps = require('gulp-sourcemaps');

//	Images
//-----------------------------------
var svgmin = require('gulp-svgmin');




//----------------------------------------------------------------------
//	CSS
//
//----------------------------------------------------------------------

gulp.task('css', function () {

	// get all .scss files
	return gulp.src([
		'css/master.scss'
	])

	// compile sass to css and save as global.css
	.pipe(sourcemaps.init())
	.pipe(sass({
		errLogToConsole: true
	}))
	.pipe(rename('global.css'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('css/dist/'))

	// add vendor prefixes and combine media queries
	.pipe(autoprefixer({
		browsers: ['last 2 versions', 'ie 10']
	}))
	//.pipe(cmq())

	// minify css and save as global.min.css
	.pipe(minifyCSS())
	.pipe(rename('global.min.css'))
	.pipe(gulp.dest('css/dist/'));
});




//----------------------------------------------------------------------
//	Images
//
//----------------------------------------------------------------------


//	SVG
//-----------------------------------
gulp.task('svg', function () {
	return gulp.src([
		'images/svg/*.svg'
	])
		.pipe(svgmin())
		.pipe(rename(function (path) {
			path.basename += '.min';
		}))
		.pipe(gulp.dest('images/svgmin/'));
});





//----------------------------------------------------------------------
//	Utils
//
//----------------------------------------------------------------------


//	Default
//-----------------------------------
gulp.task('default', ['css']);


//	Watch
//-----------------------------------
gulp.task('watch', function () {
	gulp.watch(['css/**/*.*', '!css/dist/*.css'], ['css']);
});
