---
filename: offcanvas
title: Off Canvas
description: A simple, accessible off-canvas component with useful keyboard events and meaningful markup.
alpha: false
sources:
  - title: HTML
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/offcanvas/offcanvas.html
  - title: CSS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/offcanvas/offcanvas.css
  - title: JS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/offcanvas/offcanvas.js
links:
  - title: Heydon Pickerings - Practical ARIA Examples
    url: http://heydonworks.com/practical_aria_examples/#hamburger
---

A common interface pattern for navigation on small viewports, the off-canvas component consists of a hidden panel and button toggling its visibility.

Aria-roles play an important role, `aria-hidden` is toggled when the panel is opened or closed to preserve consistency between the DOM & the accessibility tree, `aria-controls` are used to link the relevant buttons and panels.

No assumption is made about the panel containing navigation hence the lack of an `aria-role=”navigation”`, the component is simply defined as a collapsible section of the document. If navigation is contained within the panel, you can define a `<nav>` element for correct interpretation by the browser.

Keyboard navigation is enabled by default, the `ESC` key will close the panel and focusable elements within the panel aren't accessible if closed. Focus is applied to the panel when open to maintain the correct tab order.

##Usage
~~~ js
var offcanvas = Froffcanvas('.c-offcanvas');
~~~

###Options
~~~ js
var options = {
    openSelector: '.js-fr-offcanvas-open',
    closeSelector: '.js-fr-offcanvas-close',
    toggleSelector: '.js-fr-offcanvas-toggle',
    readyClass: 'has-fr-offcanvas',
    activeClass: 'fr-offcanvas-is-active',
    panelActiveClass: 'fr-offcanvas--is-active'
}
~~~

####Defaults
*openSelector*, `string`, CSS selector to target the open button, this button will show the panel on click.
*closeSelector*, `string`, CSS selector to target close button, this button will close the panel on click.
<!-- ###options.openSelector###
`string`
CSS selector to target the open button
###options.closeSelector###
`string`
CSS selector to target the close button
###options.toggleSelector###
`string`
CSS selector to target a toggle button
###options.readyClass###
`string`
Class applied to the `html` element on component load
###options.activeClass###
`string`
Class applied to the `html` element when panel is open
###options.panelActiveClass###
`string`
Class applied to the panel selector when panel is open
###Default options###
~~~ js
{
	openSelector: '.js-fr-offcanvas-open',
	closeSelector: '.js-fr-offcanvas-close',
	toggleSelector: '.js-fr-offcanvas-toggle',
	readyClass: 'has-fr-offcanvas',
	activeClass: 'fr-offcanvas-is-active',
	panelActiveClass: 'fr-offcanvas--is-active'
}
~~~ -->