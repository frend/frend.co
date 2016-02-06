'use strict';

// Set Array prototype on NodeList (allows for Array methods on NodeLists)
// https://gist.github.com/paulirish/12fb951a8b893a454b32 (#gistcomment-1487315)
Object.setPrototypeOf(NodeList.prototype, Array.prototype);

/**
 * @param {object} options Object containing configuration overrides
 */
const Fraccordion = function ({
		selector: selector = '.js-fr-accordion',
		headerSelector: headerSelector = '.fr-accordion__header',
		headerIdPrefix: headerIdPrefix = 'accordion-header',
		panelSelector: panelSelector = '.fr-accordion__panel',
		panelIdPrefix: panelIdPrefix = 'accordion-panel',
		firstPanelsOpenByDefault: firstPanelsOpenByDefault = true, 
		multiselectable: multiselectable = true, 
		readyClass: readyClass = 'has-fr-accordion'
	} = {}) {


	// CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;


	// SUPPORTS
	if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


	// SETUP
	// set accordion element NodeLists
	let accordionContainers = doc.querySelectorAll(selector);
	let accordionHeaders = doc.querySelectorAll(headerSelector);
	let accordionPanels = doc.querySelectorAll(panelSelector);


	// UTILS
	// closest: http://clubmate.fi/jquerys-closest-function-and-pure-javascript-alternatives/
	function _closest (el, fn) {
		return el && (fn(el) ? el : _closest(el.parentNode, fn));
	}


	// A11Y
	function _addA11y () {
		// add role="tablist" to containers
		accordionContainers.forEach((accordion) => {
			accordion.setAttribute('role', 'tablist');
			// set multiselectable attribute (define support for multiple panels open at once)
			accordion.setAttribute('aria-multiselectable', multiselectable);			
		});

		// add role="tab" and aria-controls to headers
		accordionHeaders.forEach((accordionHeader) => {
			accordionHeader.setAttribute('role', 'tab');
			accordionHeader.setAttribute('aria-controls', accordionHeader.id.replace(headerIdPrefix, panelIdPrefix));
			// make headers focusable, this is preferred over wrapping contents in native button element
			accordionHeader.setAttribute('tabindex', 0);
		});

		// add role="tabpanel" to panels
		accordionPanels.forEach((accordionPanel) => {
			accordionPanel.setAttribute('role', 'tabpanel');
			accordionPanel.setAttribute('aria-labelledby', accordionPanel.id.replace(panelIdPrefix, headerIdPrefix));
			// make first child of tabpanel focusable if available
			if (accordionPanel.children) {
				accordionPanel.children[0].setAttribute('tabindex', 0);
			}
		});
	}

	function _removeA11y () {
		// remove role="tablist" from containers
		accordionContainers.forEach((accordion) => {
			accordion.removeAttribute('role');
			// remove multiselectable attribute
			accordion.removeAttribute('aria-multiselectable');			
		});

		// remove role="tab" and aria-controls from headers
		accordionHeaders.forEach((accordionHeader) => {
			accordionHeader.removeAttribute('role');
			accordionHeader.removeAttribute('aria-controls');
			accordionHeader.removeAttribute('aria-selected');
			accordionHeader.removeAttribute('aria-expanded');
			// remove headers focusablility
			accordionHeader.removeAttribute('tabindex');
		});

		// remove role="tabpanel" from panels
		accordionPanels.forEach((accordionPanel) => {
			accordionPanel.removeAttribute('role');
			accordionPanel.removeAttribute('aria-labelledby');
			accordionPanel.removeAttribute('aria-hidden');
			// remove first child of tabpanel focusablibility
			if (accordionPanel.children) {
				accordionPanel.children[0].removeAttribute('tabindex');
			}
		});
	}


	// ACTIONS
	function _hideAllPanels (accordionContainer) {
		let siblingHeaders = accordionContainer.querySelectorAll(headerSelector);
		let siblingPanels = accordionContainer.querySelectorAll(panelSelector);

		// set inactives
		siblingHeaders.forEach((header) => {
			header.setAttribute('tabindex', -1);
			header.setAttribute('aria-selected', 'false');
			header.setAttribute('aria-expanded', 'false');
		});
		siblingPanels.forEach((panel) => {
			panel.setAttribute('aria-hidden', 'true');
		});
	}

	function _hidePanel (target) {
		let activePanel = doc.getElementById(target.getAttribute('aria-controls'));

		target.setAttribute('aria-selected', 'false');
		target.setAttribute('aria-expanded', 'false');
		activePanel.setAttribute('aria-hidden', 'true');
	}

	function _showPanel (target) {
		let activePanel = doc.getElementById(target.getAttribute('aria-controls'));

		// set actives
		target.setAttribute('tabindex', 0);
		target.setAttribute('aria-selected', 'true');
		target.setAttribute('aria-expanded', 'true');
		activePanel.setAttribute('aria-hidden', 'false');
	}

	function _togglePanel (target) {
		// close target panel if already active
		if (target.getAttribute('aria-selected') === 'true') {
			_hidePanel(target);
			return;
		}
		// if not multiselectable hide all, then show target
		if (!multiselectable) {
			// get context of accordion container and its children
			let thisContainer = _closest(target, (el) => {
				return el.classList.contains(selector.substring(1));
			});
			_hideAllPanels(thisContainer);
		}
		_showPanel(target);
	}

	function _giveHeaderFocus (headerSet, i) {
		// remove focusability from inactives
		headerSet.forEach((header) => {
			header.setAttribute('tabindex', -1);
		});
		// set active focus
		headerSet[i].setAttribute('tabindex', 0);
		headerSet[i].focus();
	}


	// EVENTS
	function _eventHeaderClick (e) {
		_togglePanel(e.target);
	}

	function _eventHeaderKeydown (e) {
		// collect header targets, and their prev/next
		let currentHeader = e.target;
		// get context of accordion container and its children
		let thisContainer = _closest(currentHeader, (el) => {
			return el.classList.contains(selector.substring(1));
		});
		let theseHeaders = thisContainer.querySelectorAll(headerSelector);
		let currentHeaderIndex = theseHeaders.indexOf(currentHeader);

		// catch enter/space, left/right and up/down arrow key events
		// if new panel show it, if next/prev move focus
		switch (e.keyCode) {
			case 13:
			case 32:
				_togglePanel(currentHeader);
				e.preventDefault();
				break;
			case 37:
			case 38:
				let previousHeaderIndex = (currentHeaderIndex === 0) ? theseHeaders.length - 1 : currentHeaderIndex - 1;
				_giveHeaderFocus(theseHeaders, previousHeaderIndex);
				e.preventDefault();
				break;
			case 39:
			case 40:
				let nextHeaderIndex = (currentHeaderIndex < theseHeaders.length - 1) ? currentHeaderIndex + 1 : 0;
				_giveHeaderFocus(theseHeaders, nextHeaderIndex);
				e.preventDefault();
				break;
			default:
				break;
		}
	}


	// BINDINGS
	function _bindAccordionEvents () {
		// bind all accordion header click and keydown events
		accordionHeaders.forEach((accordionHeader) => {
			accordionHeader.addEventListener('click', _eventHeaderClick);
			accordionHeader.addEventListener('keydown', _eventHeaderKeydown);
		});
	}

	function _unbindAccordionEvents () {
		// unbind all accordion header click and keydown events
		accordionHeaders.forEach((accordionHeader) => {
			accordionHeader.removeEventListener('click', _eventHeaderClick);
			accordionHeader.removeEventListener('keydown', _eventHeaderKeydown);
		});
	}


	// DESTROY
	function destroy () {
		_removeA11y();
		_unbindAccordionEvents();
		docEl.classList.remove(readyClass);
	}


	// INIT
	function init () {
		if (accordionContainers.length) {
			_addA11y();
			_bindAccordionEvents();

			// hide all panels
			accordionContainers.forEach((accordionContainer) => {
				_hideAllPanels(accordionContainer);
			});
			// set all first accordion panels active on init if required (default behaviour)
			// otherwise make sure first accordion header for each is focusable
			if (firstPanelsOpenByDefault) {
				accordionContainers.forEach((accordionContainer) => {
					_togglePanel(accordionContainer.querySelector(headerSelector));
				});
			} else {
				accordionContainers.forEach((accordionContainer) => {
					accordionContainer.querySelector(headerSelector).setAttribute('tabindex', 0);
				});
			}

			docEl.classList.add(readyClass);
		}
	}
	init();


	// REVEAL API
	return {
		init,
		destroy
	}

}


// module exports
export default Fraccordion;
