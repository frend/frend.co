'use strict';


let elemSelector = {};
let elemToggle = {};
const namespace = 'froffcanvas';


let Froffcanvas = function(selector = '.js-fr-offcanvas', toggle = '.js-fr-offcanvas-toggle') {


	elemSelector = document.querySelector(selector);
	elemToggle = document.querySelector(toggle);


	function init() {
		bindPointer();
	}


	//	Add event bindings
	function bindPointer() {
		elemToggle.addEventListener('click', eventPointer);
	}
	function bindDocumentKey() {
		document.addEventListener('keyup', eventDocumentKey);
	}
	function bindDocumentClick() {
		document.addEventListener('click', eventDocumentClick);
	}


	//	Remove event bindings
	function unbindDocumentKey() {
		document.removeEventListener('keyup', eventDocumentKey);
	}
	function unbindDocumentClick() {
		document.removeEventListener('click', eventDocumentClick);
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
	function eventDocumentClick(e) {
		//	check if target is offcanvas or child of
		let isOffcanvas = e.target == elemSelector;
		let childOfOffcanvas = checkParent(e.target, elemSelector);
		if (!isOffcanvas && !childOfOffcanvas) hideOffcanvas();
	}


	//	Toggle component
	function showOffcanvas() {
		//	undo aria-hidden, add focus
		elemSelector.setAttribute('aria-hidden', false);
		elemSelector.setAttribute('tabindex', 0);
		elemSelector.focus();
		//	bind document close events
		//	wrapped in setTimeout to delay binding until previous rendering has completed
		setTimeout(bindDocumentKey, 0); // this isn't working for enter, works for space though. WTF.
		setTimeout(bindDocumentClick, 0);
	}
	function hideOffcanvas() {
		//	set aria-hidden, remove focus
		elemSelector.setAttribute('aria-hidden', true);
		elemSelector.setAttribute('tabindex', -1);
		elemSelector.blur();
		//	unbind document close events
		unbindDocumentKey();
		unbindDocumentClick();
	}


	//	DOM utils
	function checkParent(elem, parent) {
		let parentNode = elem.parentNode;
		while (parentNode != null) {
			if (parentNode == parent) return true;
			parentNode = parentNode.parentNode;
		}
		return false;
	}


	//	Run
	if (elemSelector) init();
}


// module exports
export default Froffcanvas;
