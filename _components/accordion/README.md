---
permalink: /components/accordion/
filename: accordion
title: Accordion
alpha: false
sources:
  - title: HTML
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/accordion/accordion.html
  - title: CSS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/accordion/accordion.css
  - title: JS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/accordion/accordion.js
links:
  - title: WAI ARIA Authoring Practices - Accordion
    url: https://www.w3.org/TR/wai-aria-practices/#accordion
  - title: Open Ajax Alliance - Tab Panel Accordion
    url: http://www.oaa-accessibility.org/examplep/accordian1/
---

Accordions leverage a lot of similar conventions to tab interfaces, in that they progressively disclose portions of content to the user.

Accordion components themselves can be considered `tablist`s, and declared so on their parent container. Depending on whether multiple or single panels can be expanded at one time, we can set the container's `aria-multiselectable` attribute to true or false.

To effectively progressively enhance sections of content into an accordion widget, we can start out with pairs of headings and content containers. As headings themselves aren't interactive and can't receive focus, we have the option of programatically nesting a button element within them, or managing focus and roles ourselves. This component chooses to do the latter using `tabindex` and `aria-controls` attributes, with the help of common `id`s on headers and panels. The script that supports the interactions, should also manage header `aria-selected` and `aria-expanded` states.

Panels that are inactive can be hidden using `tabindex="-1"` and `aria-hidden="true"`. This ensures only the active content is focusable at any given time.

Arrow keys can be used to navigate between header items, and Spacebar or Enter keypresses will toggle active `tabpanel`s. If `aria-multiselectable="false"` is set, then sibling panels should close and be hidden appropriately.

There is more work to do on this particular component to manage alternative keybindings (Home, End, PageUp/Down), as per the WAI-ARIA spec.

## Install

Fraccordion is available to install with `npm`. Run with the `--save` flag to add the component your project dependencies.

~~~
npm install fr-accordion --save
~~~

The component will then be available to `import`.

~~~ js
import Fraccordion from 'fr-accordion';
~~~

Functional styles for the accordion ([accordion.css](https://raw.githubusercontent.com/frend/frend.co/gh-pages/_components/accordion/accordion.css)) that are required to display the component states correctly should be referenced via a `<link>` in the `<head>` of your document, or can be integrated into your existing stylesheet.

You can read more about installing Frend components on our [About page](https://frend.co/about/), including details on the functional CSS and JavaScript structure.

## Usage

Accordions rely on header and panel pairs, wrapped in a single container.

~~~ html
<div class="fr-accordion js-fr-accordion">
	<h2 id="accordion-header-1" class="fr-accordion__header js-fr-accordion__header">...</h2>
	<div id="accordion-panel-1" class="fr-accordion__panel js-fr-accordion__panel">
		...
	</div>
	<h2 id="accordion-header-2" class="fr-accordion__header js-fr-accordion__header">...</h2>
	<div id="accordion-panel-2" class="fr-accordion__panel js-fr-accordion__panel">
		...
	</div>
	<h2 id="accordion-header-3" class="fr-accordion__header js-fr-accordion__header">...</h2>
	<div id="accordion-panel-3" class="fr-accordion__panel js-fr-accordion__panel">
		...
	</div>
</div>
~~~

Assign the function invocation to a variable.

~~~ js
var myAccordion = Fraccordion();
~~~

### Methods

~~~ js
// remove all bindings and attributes when no longer needed
myAccordion.destroy();

// re-initialise as needed
myAccordion.init();
~~~

### Options

~~~ js
var myAccordion = Fraccordion({
	// String - Outer container selector, hook for JS init() method
	selector: '.js-fr-accordion',

	// String - Accordion header elements converted to focusable, togglable elements
	headerSelector: '.js-fr-accordion__header',

	// String - Use header id on element to tie each accordion panel to its header - see panelIdPrefix
	headerIdPrefix: 'accordion-header',

	// String - Accordion panel elements to expand/collapse
	panelSelector: '.js-fr-accordion__panel',

	// String - Use panel id on element to tie each accordion header to its panel - see headerIdPrefix
	panelIdPrefix: 'accordion-panel',

	// Boolean - If set to false, all accordion panels will be closed on init()
	firstPanelsOpenByDefault: true,

	// Boolean - If set to false, each accordion instance will only allow a single panel to be open at a time
	multiselectable: true,

	// String - Class name that will be added to the selector when the component has been initialised
	readyClass: 'fr-accordion--is-ready',
	
	// Integer - Duration (in milliseconds) of CSS transition when opening/closing accordion panels
	transitionLength: 250
});
~~~
