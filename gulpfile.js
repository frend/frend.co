//----------------------------------------------------------------------
//	FREND
//	Gulp tasks
//----------------------------------------------------------------------

//	All
var gulp = require('gulp');
var pkg = require('./package.json');
var rename = require('gulp-rename');

//	CSS
var sass = require('gulp-sass');
var nano = require('gulp-cssnano');
var mergemq = require('gulp-merge-media-queries');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

//	JS
var glob = require('glob');
var browserify = require('browserify');
var babelify = require('babelify');
// require("babel-polyfill");
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var es = require('event-stream');
var buffer = require('vinyl-buffer');
var eslint = require('gulp-eslint');

//	Project
var modulePrefix = 'Fr';
var path = {
	components: './_components/',
	css: './css/'
};


//	CSS
//----------------------------------------------------------------------
//	Site build
gulp.task('css', function () {

	// get all .scss files
	return gulp.src([
			path.css + 'master.scss'
		])
		.pipe(sourcemaps.init())
		// compile sass to css
		.pipe(sass({
			includePaths: [path.css + 'scss'],
			errLogToConsole: true
		}))
		// add vendor prefixes
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 10']
		}))
		.pipe(sourcemaps.write())
		// merge media queries
		.pipe(mergemq())
		// output file
		.pipe(rename('global.css'))
		.pipe(gulp.dest(path.css + 'dist/'))
		// minify css
		.pipe(nano())
		// output file
		.pipe(rename('global.min.css'))
		.pipe(gulp.dest(path.css + 'dist/'));
});


//	JS
//----------------------------------------------------------------------
//	Default
gulp.task('component', ['component-lint', 'component-build']);
//	Component lint
gulp.task('component-lint', function (done) {
	return gulp.src(path.components + '*/*.js')
		.pipe(eslint())
		.pipe(eslint.format());
});
//	Component build
gulp.task('component-build', function (done) {

	//	use glob to catch file names/directories
	glob(path.components + '*/*.js', function(err, files) {

		//	catch errors
		if (err) done(err);

		//	create task per file
		var tasks = files.map(function (entry) {
			//	get file props
			var dir = entry.split(path.components)[1],
				name = dir.split('/')[0];
			//	use this to expose standalone module name
			return browserify({
					entries: [entry],
					debug: true, // includes sourcemaps
					standalone: modulePrefix + name
				})
				.transform(babelify, { presets: ['es2015'], plugins: ['add-module-exports'] }) // transpile to ES5
				.bundle()
				.pipe(source(entry))
				.pipe(buffer())
				.pipe(uglify())
				.pipe(rename({
					dirname: '',
					extname: '.min.js',
					prefix: modulePrefix.toLowerCase()
				}))
				.pipe(gulp.dest(path.components + name + '/dist'));
		});

		es.merge(tasks).on('end', done);
	});
});


//	Utils
//----------------------------------------------------------------------
//	Default
gulp.task('default', ['css', 'js']);
//	Watch
gulp.task('watch', function () {
	gulp.watch([path.css + '**/*.scss'], ['css']);
	gulp.watch([path.components + '*/*.js'], ['component']);
});
