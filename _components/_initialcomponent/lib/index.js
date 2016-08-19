'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FrInitial;

var _frendUtils = require('frend-utils');

function FrInitial() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$selector = _ref.selector;
  var selector = _ref$selector === undefined ? '' : _ref$selector;
  var _ref$readyClass = _ref.readyClass;
  var readyClass = _ref$readyClass === undefined ? '' : _ref$readyClass;


  // aliases
  var doc = document;
  var docEl = doc.documentElement;

  // supports
  if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;

  // element
  var el = (0, _frendUtils.q)(selector);

  // public functions
  function destroy() {
    el.classList.remove(readyClass);
  }
  function init() {
    if (!el.length) return;
    el.classList.add(readyClass);
  }
  init();

  // expose public functions
  return { init: init, destroy: destroy };
}
module.exports = exports['default'];