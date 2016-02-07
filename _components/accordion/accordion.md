---
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


##Usage

Accordions rely on header and panel pairs, wrapped in a single container.

~~~ html
<div class="fr-accordion js-fr-accordion">
	<h2 id="accordion-header-1" class="fr-accordion__header">...</h2>	
	<div id="accordion-panel-1" class="fr-accordion__panel">
		...
	</div>
	<h2 id="accordion-header-2" class="fr-accordion__header">...</h2>	
	<div id="accordion-panel-2" class="fr-accordion__panel">
		...
	</div>
	<h2 id="accordion-header-3" class="fr-accordion__header">...</h2>	
	<div id="accordion-panel-3" class="fr-accordion__panel">
		...
	</div>
</div>
~~~

Assign the function invocation to a variable.

~~~ js
var myAccordion = Fraccordion();
~~~

###Methods

~~~ js
// remove all bindings and attributes when no longer needed
myAccordion.destroy();

// re-initialise as needed
myAccordion.init();
~~~

###Options

~~~ js
var myAccordion = Fraccordion({
	selector: '.js-fr-accordion',
	// outer container selector, hook for JS init() method
	
	headerSelector: '.fr-accordion__header',
	// accordion header elements converted to focusable, togglable elements

	headerIdPrefix: 'accordion-header',
	// use header id on element to tie each accordion panel to its header
	// see panelIdPrefix

	panelSelector: '.fr-accordion__panel',
	// accordion panel elements to expand/collapse
	
	panelIdPrefix: 'accordion-panel',
	// use panel id on element to tie each accordion header to its panel
	// see headerIdPrefix
	
	firstPanelsOpenByDefault: true, 
	// if set to false, all accordion panels will be closed on init()
	
	multiselectable: true, 
	// if set to false, each accordion instance will only allow a single panel to be open at a time
	
	readyClass: 'has-fr-accordion'
	// class name that will be added to <html> as accordion is initialised
	
});
~~~