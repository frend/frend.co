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
var fs = require('fs');
var header = require('gulp-header');
//	CSS
var autoprefixer = require('autoprefixer');
var nano = require('gulp-cssnano');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
//	JS
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
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
		initial: {
			project: [
				'./node_modules/fg-loadcss/src/loadCSS.js',
				'./node_modules/fg-loadjs/loadJS.js',
				'./js/modules/webfont-detector.js',
				'./js/modules/feature-detection.js'
			],
			output: 'initial'
		},
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
	},
	includes: './_includes/_assets/'
};
var options = {
	sass: {
		includePaths: ['./css/scss'],
		errLogToConsole: true
	},
	autoprefixer: {
		browsers: ['last 4 versions'],
		flexbox: 'no-2009',
		remove: false
	},
	babelify: {
		presets: ['es2015'],
		plugins: ['add-module-exports']
	}
};
var banner = '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> License | <%= pkg.homepage %> */\n';


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
		.pipe(postcss([
			autoprefixer(options.autoprefixer)
		]))
		.pipe(sourcemaps.write())
		//	save minified output
		.pipe(nano())
		.pipe(rename(src.css.output + '.min.css'))
		.pipe(gulp.dest(src.css.dist));
});
gulp.task('build:js:initial', function () {
	return gulp.src(src.js.initial.project)
		.pipe(concat(src.js.initial.output))
		//	save minified output
		.pipe(uglify())
		.pipe(rename(src.js.initial.output + '.min.js'))
		.pipe(gulp.dest(src.js.dist))
		.pipe(gulp.dest(src.includes));
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
				name = dir.split('/')[0],
				pkg = src.component.path + name + '/package.json';
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
				.pipe(header(banner, {
					pkg : JSON.parse(fs.readFileSync(pkg))
				}))
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
		['build:css', 'build:js:initial', 'build:js:global'],
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