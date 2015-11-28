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
var path = require('path');

//	CSS
//-----------------------------------
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var cmq = require('gulp-combine-media-queries');
var sourcemaps = require('gulp-sourcemaps');

//	JS
//-----------------------------------
var glob = require('glob');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var es = require('event-stream');

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
		includePaths: ['css/scss'],
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
//	JS
//
//----------------------------------------------------------------------

gulp.task('js-component', function (done) {

	// glob the component files
	glob('./_components/**/*.js', function(err, files) {
        if(err) done(err);
	    
	    // map them to our stream function
	    var tasks = files.map(function(entry) {
	    	// wrangle the plugin exports name from the entry param
	    	var moduleDir = entry.split('./_components/')[1],
	    		moduleName = 'fr' + moduleDir.split('/')[0];
	    	// use this to expose standalone module name
	        return browserify({ 
	        		entries: [entry],
	        		debug: true, // includes sourcemaps
	        		standalone: moduleName
	        	})
	        	.transform(babelify)
	            .bundle()
	            .pipe(source(entry))
	            .pipe(rename({
					dirname: '',
					prefix: 'fr'
				}))
	            .pipe(gulp.dest('./dist'));
	        });
	    // create a merged stream
	    es.merge(tasks).on('end', done);
	});

});

// call build synchronously
gulp.task('js-component-build', ['js-component'], function () {
	return gulp.src([
		'dist/**/*.js',
		'!dist/**/*.min.js'
	])
	.pipe(uglify())
	.pipe(rename({
		dirname: '',
        extname: '.min.js'
    }))
	.pipe(gulp.dest('./dist'));
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
gulp.task('default', ['css', 'js']);


//	Watch
//-----------------------------------
gulp.task('watch', function () {
	gulp.watch(['css/**/*.*', '!css/dist/*.css'], ['css']);
	//gulp.watch(['js/**/*.*', '!js/dist/*.js'], ['js']);
	gulp.watch(['_components/**/*.js'], ['js-component', 'js-component-build']);
});
