'use strict';


let elemSelector = {};
let elemToggle = {};
const namespace = 'froffcanvas';


var Froffcanvas = function(selector = '.js-fr-offcanvas', toggle = '.js-fr-offcanvas-toggle') {


	elemSelector = document.querySelector(selector);
	elemToggle = document.querySelector(toggle);


	function init() {
		bindPointer();
		bindDocumentKey();
	}


	//	Event bindings
	function bindPointer() {
		elemToggle.addEventListener('click', eventPointer);
	}
	function bindDocumentKey() {
		document.addEventListener('keyup', eventDocumentKey);
	}


	//	Event handlers
	function eventPointer() {
		if (elemSelector.getAttribute('aria-hidden') == 'false') {
			hideOffcanvas();
		} else {
			showOffcanvas();
		}
	}
	function eventDocumentKey(e) {
		//	esc key
		if (e.keyCode === 27) hideOffcanvas();
	}


	//	Toggle component
	function showOffcanvas() {
		elemSelector.setAttribute('aria-hidden', false);
		elemSelector.setAttribute('tabindex', 0);
		elemSelector.focus();
	}
	function hideOffcanvas() {
		elemSelector.setAttribute('aria-hidden', true);
		elemSelector.setAttribute('tabindex', -1);
		elemSelector.blur();
	}


	//	Run
	if (elemSelector) init();
}


// module exports
export default Froffcanvas;
