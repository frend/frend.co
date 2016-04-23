//----------------------------------------------------------------------
//	Modules
//----------------------------------------------------------------------
//	Files
var pkg = require('./package.json');
var config = require('./webpack.config.js');
//	Global
var cache = require('gulp-cached');
var clean = require('gulp-clean');
var gulp = require('gulp');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
//	CSS
var autoprefixer = require('gulp-autoprefixer');
var mergemq = require('gulp-merge-media-queries');
var nano = require('gulp-cssnano');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var sourcemaps = require('gulp-sourcemaps');
//	JS
// var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');
//	Components
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var es = require('event-stream');
var glob = require('glob');
var source = require('vinyl-source-stream');


//----------------------------------------------------------------------
//	Setup
//----------------------------------------------------------------------
var src = {
	css: {
		master: './css/master.scss',
		project: [
			'./css/**/*.scss',
			'./css/master.scss',
			'!./css/site/_generic.reset.scss',
			'!./css/site/_components.syntax.scss',
			'!./css/site/_tools.mq.scss'
		],
		output: 'global',
		dist: './css/dist/'
	},
	js: {
		global: {
			master: './js/master.js',
			project: [
				'./js/master.js',
				'./js/modules/*.js',
				'!./js/_vendor/*.js',
				'!./js/dist/*.js'
			],
			output: 'global'
		},
		dist: './js/dist/'
	},
	component: {
		prefix: 'Fr',
		path: './_components/',
		project: [
			'./_components/**/*.js',
			'!./_components/**/dist/*.js'
		]
	}
};
var options = {
	sass: {
		includePaths: ['./css/scss'],
		errLogToConsole: true
	},
	autoprefix: {
		browsers: ['last 2 versions', 'ie 10', 'ie 9']
	},
	babelify: {
		presets: ['es2015'],
		plugins: ['add-module-exports']
	}
};


//----------------------------------------------------------------------
//	Tasks
//----------------------------------------------------------------------

//	Lint
//----------------------------------------------------------------------
gulp.task('lint:css', function () {
	return gulp.src(src.css.project)
		.pipe(cache('scsslint'))
		.pipe(scsslint())
		.pipe(scsslint.failReporter());
});
gulp.task('lint:js', function () {
	return gulp.src(src.js.global.project)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
gulp.task('lint:component', function () {
	return gulp.src(src.component.project)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

//	Clean
//----------------------------------------------------------------------
gulp.task('clean:css', function () {
	return gulp.src(src.css.dist, { read: false }).pipe(clean());
});
gulp.task('clean:js', function () {
	return gulp.src(src.js.dist, { read: false }).pipe(clean());
});

//	Build
//----------------------------------------------------------------------
gulp.task('build:css', function () {
	return gulp.src(src.css.master)
		//	compile & transform
		.pipe(sass(options.sass))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer(options.autoprefixer))
		.pipe(mergemq())
		.pipe(sourcemaps.write())
		//	save minified output
		.pipe(nano())
		.pipe(rename(src.css.output + '.min.css'))
		.pipe(gulp.dest(src.css.dist));
});
gulp.task('build:js:global', function () {
	return gulp.src(src.js.global.master)
		//	bundle modules
		.pipe(webpack(config))
		//	save minified output
		.pipe(uglify())
		.pipe(rename(src.js.global.output + '.min.js'))
		.pipe(gulp.dest(src.js.dist));
});
gulp.task('build:component', function (done) {
	//	use glob to catch file names/directories
	glob(src.component.path + '*/*.js', function(err, files) {
		//	catch errors
		if (err) done(err);
		//	create task per file
		var tasks = files.map(function (entry) {
			//	get file props
			var dir = entry.split(src.component.path)[1],
				name = dir.split('/')[0];
			//	use this to expose standalone module name
			return browserify({
					entries: [entry],
					debug: true, // includes sourcemaps
					standalone: src.component.prefix + name
				})
				.transform(babelify, options.babelify)
				.bundle()
				.pipe(source(entry))
				.pipe(buffer())
				.pipe(uglify())
				.pipe(rename({
					dirname: '',
					extname: '.min.js',
					prefix: src.component.prefix.toLowerCase()
				}))
				.pipe(gulp.dest(src.component.path + name + '/dist'));
		});
		es.merge(tasks).on('end', done);
	});
});

//	Watch
//----------------------------------------------------------------------
gulp.task('watch', function () {
	gulp.watch(src.css.project, ['lint:css', 'build:css']);
	gulp.watch(src.js.global.project, ['lint:js', 'build:js:global']);
	gulp.watch(src.component.project, ['lint:component', 'build:component']);
});

//	Default tasks
//----------------------------------------------------------------------

//	SITE
//---------------
//	'gulp' - Runs build
gulp.task('default', ['build']);
//	'gulp lint' - Lints CSS/JS project files
gulp.task('lint', ['lint:css', 'lint:js']);
//	'gulp clean' - Cleans CSS/JS dist directories
gulp.task('clean', ['clean:css', 'clean:js']);
//	'gulp build' - Lints, cleans, builds modernizr then builds CSS/JS output files, lint errors halt build
gulp.task('build', function (callback) {
	runSequence(
		['lint'],
		['clean'],
		['build:css', 'build:js:global'],
		callback
	);
});

//	COMPONENTS
//---------------
//	'gulp component' - Lints and builds JS output for components, lint errors halt build
gulp.task('component', function (callback) {
	runSequence(
		['lint:component'],
		['build:component'],
		callback
	);
});