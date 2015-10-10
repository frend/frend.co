var Collapsible = {

	toggleSelector: document.querySelectorAll('[data-collapsible-toggle]'),
	accordionAttr: 'data-accordion',
	toggleTextAttr: 'data-collapsible-text',
	prefix: 'collapsible-',

	init: function() {
		// check for querySelector and addEventListener support
		if ('querySelector' in document && 'addEventListener' in window) {
			// call to build if collapsibles on page
			if (Collapsible.toggleSelector.length) {
				Collapsible.buildAll();
			}
		}
	},

	// children height helper
	findChildHeight: function($this) {
		var totalHeight = 0;
		for (var i = 0; i < $this.children.length; i++) {
			totalHeight += Utilities.getOuterHeight($this.children[i]);
		}
		return totalHeight;
	},

	buildAll: function() {
		// loop through collapsibles
		for (var i = 0; i < Collapsible.toggleSelector.length; i++) {
			// store element
			var $this = Collapsible.toggleSelector[i],
				$thisContent = Utilities.getNextSibling($this);

			// add aria to content
			Collapsible.addAria($thisContent, i);
			// create buttons and callback to bind clicks
			Collapsible.createButton($this, i, Collapsible.bindClickEvents);
		}
	},

	createButton: function($this, i, callback) {
		// build button element with appropriate aria attrs
		var buttonElement = document.createElement('button');
		buttonElement.innerHTML = $this.innerHTML;
		buttonElement.setAttribute('aria-expanded', false);
		buttonElement.setAttribute('aria-controls', Collapsible.prefix + i);
		// append in place of text
		$this.innerHTML = '';
		$this.appendChild(buttonElement);
		// run callback
		callback(buttonElement);
	},

	addAria: function($this, i) {
		// attach id and aria to content
		$this.id = Collapsible.prefix + i;
		$this.setAttribute('aria-hidden', true);
	},

	bindClickEvents: function($this) {
		// add click event listener
		Utilities.addEventListener($this, 'click', function() {
			Collapsible.toggleEvent($this);
		});
	},

	toggleEvent: function($this) {
		// work out if state is open or closed
		// test accordion attribute and store parent element
		var state = ($this.getAttribute('aria-expanded') === 'false') ? true : false,
			$parentAccordion = Utilities.parentElementWithAttribute($this, Collapsible.accordionAttr),
			isAccordion = !!$parentAccordion;

		// check if stateful and accordion
		if (state && isAccordion) {
			// find open siblings
			var $openToggle = $parentAccordion.querySelector('[aria-expanded="true"]');
			// if there are, close them
			if (!!$openToggle) {
				Collapsible.toggleState($openToggle, !state);
			}
		}
		// toggle state of clicked item to open
		Collapsible.toggleState($this, state);
	},

	toggleState: function($this, state) {
		// store respective content element and content height
		var $thisParent = $this.parentNode,
			$thisContent = Utilities.getNextSibling($this.parentNode),
			contentHeight = (state) ? Collapsible.findChildHeight($thisContent) : 0,
			buttonText = $this.innerHTML,
			newButtonText = $thisParent.getAttribute(Collapsible.toggleTextAttr);

		// set aria states, styles to toggle content
		$this.setAttribute('aria-expanded', state);
		$thisContent.setAttribute('aria-hidden', !state);
		// swap button text if required
		if (newButtonText) {
			$this.innerHTML = newButtonText;
			$thisParent.setAttribute(Collapsible.toggleTextAttr, buttonText);
		}
		// run animation (think about wrapping in rAF if supported?)
		$thisContent.style.height = contentHeight + 'px';
	}

};

var Utilities = {

	addEventListener: function(el, eventName, handler) {
		if (el.addEventListener) {
			el.addEventListener(eventName, handler);
		} else {
			el.attachEvent('on' + eventName, function() {
				handler.call(el);
			});
		}
	},

	// some browsers treat empty white-spaces or new lines as text nodes
	getNextSibling: function(el) {
		var nextSiblingElement = el.nextSibling;
		// loop over nextSiblings until non-text node (1) found
		while (nextSiblingElement.nodeType !== 1) {
			nextSiblingElement = nextSiblingElement.nextSibling;
		}
		return nextSiblingElement;
	},

	// offsetHeight won't include margins - use this as $(el).outerHeight(true) equivalent
	getOuterHeight: function(el) {
		// store height and style object
		var height = el.offsetHeight;
		var style = el.currentStyle || getComputedStyle(el);
		// increase element height with vertical margins
		height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
		return height;
	},

	parentElementWithAttribute: function(el, attr) {
		// set up loop to test if element has parent with attribute
		// recursive, returns boolean
		var parent = el.parentNode;
		while (parent !== document.body) {
			if (parent.hasAttribute(attr)) {
				return parent;
			} else {
				parent = parent.parentNode;
			}
		}
		return null;
	}

};

// called from doc.ready()
Collapsible.init();
