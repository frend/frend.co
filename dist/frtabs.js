(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Frtabs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

//
;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var options = {};

var Frtabs = (function () {
	function Frtabs() {
		var selector = arguments.length <= 0 || arguments[0] === undefined ? '.js-fr-tabs' : arguments[0];

		var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		var _ref$containerClassNa = _ref.containerClassName;
		var containerClassName = _ref$containerClassNa === undefined ? 'fr-tabs' : _ref$containerClassNa;
		var _ref$linkEl = _ref.linkEl;
		var linkEl = _ref$linkEl === undefined ? 'button' : _ref$linkEl;

		_classCallCheck(this, Frtabs);

		options = {
			containerClassName: containerClassName,
			linkEl: linkEl
		};

		init();
	}

	// public methods

	_createClass(Frtabs, [{
		key: 'destroy',
		value: function destroy() {
			console.log('destroy');
		}
	}]);

	return Frtabs;
})();

// private methods

function addA11y(selector, options) {
	console.log('a11y');
}

function init() {
	console.log(options);
}

// module exports
exports.default = Frtabs;
module.exports = exports['default'];

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfY29tcG9uZW50c1xcdGFic1xcdGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7QUFBWSxDQUFDOzs7Ozs7Ozs7O0FBR2IsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDOztJQUdYLE1BQU07QUFFWCxVQUZLLE1BQU0sR0FLSDtNQUhLLFFBQVEseURBQUcsYUFBYTs7bUVBR2pDLEVBQUU7O21DQUZMLGtCQUFrQjtNQUFFLGtCQUFrQix5Q0FBRyxTQUFTO3lCQUNsRCxNQUFNO01BQUUsTUFBTSwrQkFBRyxRQUFROzt3QkFKckIsTUFBTTs7QUFPVixTQUFPLEdBQUc7QUFDVCxxQkFBa0IsRUFBbEIsa0JBQWtCO0FBQ2xCLFNBQU0sRUFBTixNQUFNO0dBQ04sQ0FBQTs7QUFFRCxNQUFJLEVBQUUsQ0FBQztFQUNQOzs7QUFBQTtjQWJJLE1BQU07OzRCQWlCQTtBQUNWLFVBQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7R0FDdkI7OztRQW5CSSxNQUFNOzs7OztBQXlCWixTQUFTLE9BQU8sQ0FBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO0FBQ3BDLFFBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDcEI7O0FBRUQsU0FBUyxJQUFJLEdBQUk7QUFDaEIsUUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUNyQjs7O0FBQUEsa0JBSWMsTUFBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vL1xyXG5sZXQgb3B0aW9ucyA9IHt9O1xyXG5cclxuXHJcbmNsYXNzIEZydGFicyB7XHJcblxyXG5cdGNvbnN0cnVjdG9yIChzZWxlY3RvciA9ICcuanMtZnItdGFicycsIHtcclxuXHRcdGNvbnRhaW5lckNsYXNzTmFtZTogY29udGFpbmVyQ2xhc3NOYW1lID0gJ2ZyLXRhYnMnLFxyXG5cdFx0bGlua0VsOiBsaW5rRWwgPSAnYnV0dG9uJ1xyXG5cdH0gPSB7fSkge1xyXG5cclxuXHRcdG9wdGlvbnMgPSB7XHJcblx0XHRcdGNvbnRhaW5lckNsYXNzTmFtZSxcclxuXHRcdFx0bGlua0VsXHJcblx0XHR9XHJcblxyXG5cdFx0aW5pdCgpO1xyXG5cdH1cclxuXHJcblxyXG5cdC8vIHB1YmxpYyBtZXRob2RzXHJcblx0ZGVzdHJveSAoKSB7XHJcblx0XHRjb25zb2xlLmxvZygnZGVzdHJveScpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcblxyXG4vLyBwcml2YXRlIG1ldGhvZHNcclxuZnVuY3Rpb24gYWRkQTExeSAoc2VsZWN0b3IsIG9wdGlvbnMpIHtcclxuXHRjb25zb2xlLmxvZygnYTExeScpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0ICgpIHtcclxuXHRjb25zb2xlLmxvZyhvcHRpb25zKTtcclxufVxyXG5cclxuXHJcbi8vIG1vZHVsZSBleHBvcnRzXHJcbmV4cG9ydCBkZWZhdWx0IEZydGFiczsiXX0=
