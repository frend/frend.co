(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.frtabs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function frtabs(selector) {
	var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	console.log(selector, options);

	var something = true;

	function build() {}
}

// not importing this module anywhere, so module.exports instead of named default
// export default frtabs;
module.exports = frtabs;

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJfY29tcG9uZW50cy90YWJzL3RhYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsU0FBUyxNQUFNLENBQUMsUUFBUSxFQUFnQjtLQUFkLE9BQU8seURBQUcsRUFBRTs7QUFFckMsUUFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRS9CLEtBQUksU0FBUyxHQUFHLElBQUksQ0FBQzs7QUFFckIsVUFBUyxLQUFLLEdBQUksRUFDakI7Q0FFRDs7OztBQUFBLEFBSUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBmcnRhYnMoc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuXG5cdGNvbnNvbGUubG9nKHNlbGVjdG9yLCBvcHRpb25zKTtcblxuXHRsZXQgc29tZXRoaW5nID0gdHJ1ZTtcblxuXHRmdW5jdGlvbiBidWlsZCAoKSB7XG5cdH1cblxufVxuXG4vLyBub3QgaW1wb3J0aW5nIHRoaXMgbW9kdWxlIGFueXdoZXJlLCBzbyBtb2R1bGUuZXhwb3J0cyBpbnN0ZWFkIG9mIG5hbWVkIGRlZmF1bHRcbi8vIGV4cG9ydCBkZWZhdWx0IGZydGFicztcbm1vZHVsZS5leHBvcnRzID0gZnJ0YWJzOyJdfQ==
