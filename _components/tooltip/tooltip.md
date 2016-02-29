---
filename: tooltip
title: Tooltip
alpha: false
sources:
  - title: HTML
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/tooltip/tooltip.html
  - title: CSS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/tooltip/tooltip.css
  - title: JS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/tooltip/tooltip.js
links:
  - title: Simple standalone toggltip widget pattern
    url: https://www.paciellogroup.com/blog/2016/01/simple-standalone-toggletip-widget-pattern/
  - title: WAI ARIA Authoring Practices - Tooltip
    url: https://www.w3.org/TR/wai-aria-practices/#tooltip
  - title: WAI ARIA Roles - Tooltip
    url: https://www.w3.org/TR/wai-aria/roles#tooltip
---

A simple tooltip component usually consists of a button and a tooltip, with the button toggling the visible state of the tooltip when hovered or clicked on. By utilising a few relevant attributes we can improve the accessibility of the button and the tooltip.

`role="tooltip"` and `aria-describedby` are the key attributes to be added to the elements. The `role` applies to the tooltip and describes “a contextual popup that displays a description for an element”, its counterpart `aria-describedby` defines the element that *describes* the button, which in this case is the tooltip.

The `ESC` key will close any open tooltips and clicking off either element will do the same. Tooltips are hidden using the `aria-hidden` attribute to keep the accessibility tree and the DOM in sync.

The `button` is initially rendered as a `span` in the HTML, this enables us to progressively enhance the component and introduce the relevant element when JavaScript is available.

## Usage

Tooltips rely on a pair of `<span>`s defining both the toggle element and the tooltip.

~~~ html
<span class="fr-tooltip js-fr-tooltip">
  <span class="js-fr-tooltip-toggle">ipsam</span>
  <span role="tooltip">Tooltip describing ipsam</span>
</span>
~~~

Assign the function invocation to a variable.

~~~ js
var myTooltip = Frtooltip();
~~~

### Methods

~~~ js
// remove all bindings and attributes when no longer needed
myTooltip.destroy();

// re-initialise as needed
myTooltip.init();
~~~

### Options

~~~ js
var myTooltip = Frtooltip({
	selector: '.js-fr-tooltip',
	// outer container selector, hook for JS init() method

	toggleSelector: toggleSelector = '.js-fr-tooltip-toggle',
	// selector to define the toggle element controlling the tooltip

	tooltipIdPrefix: tooltipIdPrefix = 'tooltip',
	// prefix for id applied to each tooltip as identifier for button

	readyClass: readyClass = 'has-fr-tooltip'
	// class name that will be added to <html> as tooltip is initialised

});
~~~