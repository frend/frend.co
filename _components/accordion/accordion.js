'use strict';

/**
 * @param {object} options Object containing configuration overrides
 */
const Fraccordion = function ({
		selector: selector = '.js-fr-accordion',
		headerSelector: headerSelector = '.js-fr-accordion__header',
		headerIdPrefix: headerIdPrefix = 'accordion-header',
		panelSelector: panelSelector = '.js-fr-accordion__panel',
		panelIdPrefix: panelIdPrefix = 'accordion-panel',
		firstPanelsOpenByDefault: firstPanelsOpenByDefault = true,
		multiselectable: multiselectable = true,
		readyClass: readyClass = 'fr-accordion--is-ready',
		transitionLength: transitionLength = 250,
		onReady,
		onDestroy,
		onOpen,
		onClose
	} = {}) {


	// CONSTANTS
	const doc = document;
	const docEl = doc.documentElement;
	const _q = (el, ctx = doc) => [].slice.call(ctx.querySelectorAll(el));
	const _cb = fn => typeof fn === typeof(Function) && fn();


	// SUPPORTS
	if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


	// SETUP
	// set accordion element NodeLists
	let accordionContainers = _q(selector);


	//	UTILS
	function _getPanelHeight (panel) {
		//	set auto height and read offsetHeight
		panel.style.height = 'auto';
		let height = panel.offsetHeight;
		//	remove style
		panel.style.height = '';
		return height;
	}
	function _setPanelHeight (panel) {
		//	get panel height
		let panelHeight = _getPanelHeight(panel);
		//	recalc style and layout
		panel.getBoundingClientRect();
		//	set height on panel, reset to 'auto' on transition complete
		panel.style.height = panelHeight + 'px';
		setTimeout(() => {
			panel.style.transition = 'none';
			panel.style.height = 'auto'
			//	recalc style and layout
			panel.getBoundingClientRect();
			panel.style.transition = '';
		}, transitionLength);
	}
	function _unsetPanelHeight (panel) {
		//	get panel height
		let panelHeight = _getPanelHeight(panel);
		//	set panel height from 'auto' to px
		panel.style.height = panelHeight + 'px';
		//	recalc style and layout
		panel.getBoundingClientRect();
		//	reset height
		panel.style.height = 0;
	}


	// A11Y
	function _addA11y (accordionContainer) {
		//	get accordion elements
		const accordionHeaders = _q(headerSelector, accordionContainer);
		const accordionPanels = _q(panelSelector, accordionContainer);
		//	add relevant roles and properties to the container
		accordionContainer.setAttribute('role', 'tablist');
		accordionContainer.setAttribute('aria-multiselectable', multiselectable);
		//	loop through each accordion header
		accordionHeaders.forEach((accordionHeader) => {
			accordionHeader.setAttribute('role', 'tab');
			accordionHeader.setAttribute('aria-controls', accordionHeader.id.replace(headerIdPrefix, panelIdPrefix));
			// make headers focusable, this is preferred over wrapping contents in native button element
			accordionHeader.setAttribute('tabindex', 0);
		});
		//	and through each panel
		accordionPanels.forEach((accordionPanel) => {
			accordionPanel.setAttribute('role', 'tabpanel');
			accordionPanel.setAttribute('aria-labelledby', accordionPanel.id.replace(panelIdPrefix, headerIdPrefix));
			// make tabpanel focusable
			accordionPanel.setAttribute('tabindex', 0);
		});
	}
	function _removeA11y (accordionContainer) {
		// get accordion elements
		const accordionHeaders = _q(headerSelector, accordionContainer);
		const accordionPanels = _q(panelSelector, accordionContainer);
		// remove roles and properties
		accordionContainer.removeAttribute('role');
		accordionContainer.removeAttribute('aria-multiselectable');
		//	loop through each accordion header
		accordionHeaders.forEach((accordionHeader) => {
			accordionHeader.removeAttribute('role');
			accordionHeader.removeAttribute('aria-controls');
			accordionHeader.removeAttribute('aria-selected');
			accordionHeader.removeAttribute('aria-expanded');
			// remove headers focusablility
			accordionHeader.removeAttribute('tabindex');
		});
		//	and through each panel
		accordionPanels.forEach((accordionPanel) => {
			accordionPanel.removeAttribute('role');
			accordionPanel.removeAttribute('aria-labelledby');
			accordionPanel.removeAttribute('aria-hidden');
			// remove tabpanel focusablibility
			accordionPanel.removeAttribute('tabindex');
		});
	}


	// ACTIONS
	function _hideAllPanels (accordionContainer) {
		// get accordion elements
		const siblingHeaders = _q(headerSelector, accordionContainer);
		const siblingPanels = _q(panelSelector, accordionContainer);
		// set inactives
		siblingHeaders.forEach((header) => {
			header.setAttribute('tabindex', -1);
			header.setAttribute('aria-selected', 'false');
			header.setAttribute('aria-expanded', 'false');
		});
		siblingPanels.forEach((panel) => {
			if (panel.getAttribute('aria-hidden') === 'false') _unsetPanelHeight(panel);
			//	toggle aria-hidden
			panel.setAttribute('aria-hidden', 'true');
		});
	}
	function _hidePanel (target) {
		//	get panel
		let activePanel = doc.getElementById(target.getAttribute('aria-controls'));
		target.setAttribute('aria-selected', 'false');
		target.setAttribute('aria-expanded', 'false');
		//	toggle aria-hidden
		_unsetPanelHeight(activePanel);
		activePanel.setAttribute('aria-hidden', 'true');
		//	run callback
		_cb(onClose);
	}
	function _showPanel (target, runCb) {
		//	get panel
		let activePanel = doc.getElementById(target.getAttribute('aria-controls'));
		//	set attributes on header
		target.setAttribute('tabindex', 0);
		target.setAttribute('aria-selected', 'true');
		target.setAttribute('aria-expanded', 'true');
		//	toggle aria-hidden and set height on panel
		_setPanelHeight(activePanel);
		activePanel.setAttribute('aria-hidden', 'false');
		setTimeout(() => _bindAccordionEvents(target.parentNode), transitionLength);
		//	run callback
		if (runCb) _cb(onOpen);
	}
	function _togglePanel (target, runCb = true) {
		// get context of accordion container and its children
		let thisContainer = target.parentNode;
		// close target panel if already active
		if (target.getAttribute('aria-selected') === 'true') {
			_hidePanel(target);
			return;
		}
		// if not multiselectable hide all, then show target
		if (!multiselectable) _hideAllPanels(thisContainer);
		_showPanel(target, runCb);
		if (transitionLength > 0) _unbindAccordionEvents(thisContainer);
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


	//	EVENTS
	function _eventHeaderClick (e) {
		_togglePanel(e.target);
	}
	function _eventHeaderKeydown (e) {
		// collect header targets, and their prev/next
		let currentHeader = e.target;
		// get context of accordion container and its children
		let thisContainer = currentHeader.parentNode;
		let theseHeaders = _q(headerSelector, thisContainer);
		let currentHeaderIndex = [].indexOf.call(theseHeaders, currentHeader);
		let previousHeaderIndex = (currentHeaderIndex === 0) ? theseHeaders.length - 1 : currentHeaderIndex - 1;
		let nextHeaderIndex = (currentHeaderIndex < theseHeaders.length - 1) ? currentHeaderIndex + 1 : 0;
		// don't catch key events when ⌘ or Alt modifier is present
		if (e.metaKey || e.altKey) return;
		// catch enter/space, left/right and up/down arrow key events
		// if new panel show it, if next/prev move focus
		switch (e.keyCode) {
			case 13:
			case 32:
				_togglePanel(currentHeader);
				e.preventDefault();
				break;
			case 37:
			case 38: {
				_giveHeaderFocus(theseHeaders, previousHeaderIndex);
				e.preventDefault();
				break;
			}
			case 39:
			case 40: {
				_giveHeaderFocus(theseHeaders, nextHeaderIndex);
				e.preventDefault();
				break;
			}
			default:
				break;
		}
	}


	//	BIND EVENTS
	function _bindAccordionEvents (accordionContainer) {
		const accordionHeaders = _q(headerSelector, accordionContainer);
		// bind all accordion header click and keydown events
		accordionHeaders.forEach((accordionHeader) => {
			accordionHeader.addEventListener('click', _eventHeaderClick);
			accordionHeader.addEventListener('keydown', _eventHeaderKeydown);
		});
	}


	//	UNBIND EVENTS
	function _unbindAccordionEvents (accordionContainer) {
		const accordionHeaders = _q(headerSelector, accordionContainer);
		// unbind all accordion header click and keydown events
		accordionHeaders.forEach((accordionHeader) => {
			accordionHeader.removeEventListener('click', _eventHeaderClick);
			accordionHeader.removeEventListener('keydown', _eventHeaderKeydown);
		});
	}


	// DESTROY
	function destroy () {
		accordionContainers.forEach((accordionContainer) => {
			const accordionPanel = _q(panelSelector, accordionContainer);
			_removeA11y(accordionContainer);
			_unbindAccordionEvents(accordionContainer);
			accordionContainer.classList.remove(readyClass);
			accordionPanel.forEach(panel => panel.style.height = '');
		});
		//	run callback
		_cb(onDestroy);
	}


	// INIT
	function init () {
		if (!accordionContainers.length) return;
		accordionContainers.forEach((accordionContainer) => {
			_addA11y(accordionContainer);
			_bindAccordionEvents(accordionContainer);
			_hideAllPanels(accordionContainer);
			// set all first accordion panels active on init if required (default behaviour)
			// otherwise make sure first accordion header for each is focusable
			if (firstPanelsOpenByDefault) {
				_togglePanel(accordionContainer.querySelector(headerSelector), false);
			} else {
				accordionContainer.querySelector(headerSelector).setAttribute('tabindex', 0);
			}
			// set ready style hook
			accordionContainer.classList.add(readyClass);
		});
		//	run callback
		_cb(onReady);
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