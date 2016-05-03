---
permalink: /components/tooltip/
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

`role="tooltip"` and `aria-describedby` are the key attributes to be added to the elements. The `role` applies to the tooltip and describes “a contextual popup that displays a description for an element”. Its counterpart `aria-describedby` defines the element that *describes* the relevant text (button), which in this case is the tooltip.

The `ESC` key will close any open tooltips and clicking off either element will do the same. Tooltips are hidden using the `aria-hidden` attribute to keep the accessibility tree and the DOM in sync.

The `button` is initially rendered as a `span` in the HTML, this enables us to progressively enhance the component and introduce the relevant element when JavaScript is available.

## Install

Frtooltip is available to install with `npm`. Run with the `--save` flag to add the component your project dependencies.

~~~
npm install fr-tooltip --save
~~~

The component will then be available to `import`.

~~~ js
import Frtooltip from 'fr-tooltip';
~~~

Functional styles for the tooltip ([tooltip.css](https://raw.githubusercontent.com/frend/frend.co/gh-pages/_components/tooltip/tooltip.css)) that are required to display the component states correctly should be referenced via a `<link>` in the `<head>` of your document, or can be integrated into your existing stylesheet.

You can read more about installing Frend components on our [About page](http://frend.co/about/), including details on the functional CSS and JavaScript structure.

## Usage

Tooltips rely on a pair of `<span>`s defining both the toggle element and the tooltip.

~~~ html
<span class="js-fr-tooltip">
	<span class="js-fr-tooltip-toggle">ipsam</span>
	<span class="js-fr-tooltip-tooltip">Tooltip describing ipsam</span>
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
	// String - Container selector, hook for JS init() method
	selector: '.js-fr-tooltip',

	// String - Selector to define the tooltip element
	tooltipSelector: '.js-fr-tooltip-tooltip',

	// String - Selector to define the toggle element controlling the tooltip
	toggleSelector: '.js-fr-tooltip-toggle',

	// String - Prefix for the id applied to each tooltip as a reference for the toggle
	tooltipIdPrefix: 'tooltip',

	// String - Class name that will be added to the selector when the component has been initialised
	readyClass: 'fr-tooltip--is-ready'
});
~~~