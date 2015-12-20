/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _componentEmbed = __webpack_require__(1);

	var _componentEmbed2 = _interopRequireDefault(_componentEmbed);

	var _webFonts = __webpack_require__(2);

	var _webFonts2 = _interopRequireDefault(_webFonts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//	Run
	/**
	 * Global scripts
	 */

	(0, _webFonts2.default)();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ComponentEmbed = 'Test';

	exports.default = ComponentEmbed;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Web font loader
	 */

	var fonts = {
		google: {
			families: ['Merriweather:400,700:latin', 'Montserrat']
		}
	};
	var webfontLocation = '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';

	//	Main
	function WebFonts() {
		//	set webfont.js config options and async load the library
		window.WebFontConfig = fonts;
		loadJS(webfontLocation);
	}

	//	module exports
	exports.default = WebFonts;
	module.exports = exports['default'];

/***/ }
/******/ ]);