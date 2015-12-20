'use strict';


let elemContent = {};
let elemToggle = {};
const prefix = 'fraccordion-';


let Fraccordion = function(content = '.js-fr-accordion-content', toggle = '.js-fr-accordion-toggle') {


	elemContent = document.querySelector(content);
	elemToggle = document.querySelector(toggle);


	function init() {
		setAria();
		createButton();
		bindPointer();
	}


	function setAria() {
		elemContent.setAttribute('aria-hidden', true);
		elemContent.setAttribute('id', prefix + 0);
	}
	function createButton() {
		// build button element with appropriate aria attrs
		let elemButton = document.createElement('button');
		elemButton.innerHTML = elemToggle.innerHTML;
		elemButton.setAttribute('aria-expanded', false);
		elemButton.setAttribute('aria-controls', prefix + 0);
		// append in place of text
		elemToggle.innerHTML = '';
		elemToggle.appendChild(elemButton);
		elemToggle = elemButton;
	}


	//	Add event bindings
	function bindPointer() {
		elemToggle.addEventListener('click', eventPointer);
	}


	//	Event handlers
	function eventPointer() {
		if (elemContent.getAttribute('aria-hidden') == 'false') {
			closeAccordion();
		} else {
			openAccordion();
		}
	}


	//	Toggle component
	function openAccordion() {
		elemToggle.setAttribute('aria-expanded', true);
		//	undo aria-hidden, add focus
		elemContent.setAttribute('aria-hidden', false);
		elemContent.setAttribute('tabindex', 0);
		elemContent.focus();
	}
	function closeAccordion() {
		elemToggle.setAttribute('aria-expanded', false);
		//	set aria-hidden, remove focus
		elemContent.setAttribute('aria-hidden', true);
		elemContent.setAttribute('tabindex', -1);
		elemToggle.focus();
	}


	//	Run
	if (elemContent) init();
}


// module exports
export default Fraccordion;