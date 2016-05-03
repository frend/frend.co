---
permalink: /components/offcanvas/
filename: offcanvas
title: Off Canvas
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

A common interface pattern for navigation on narrow viewports, the off-canvas component consists of a hidden panel and a button to toggle its visibility.

`aria-controls` is used to associate the button with its panel and `aria-hidden` is toggled when the panel is opened or closed, this preserves consistency between the DOM and the accessibility tree.

To retain the correct taborder, focus is applied to the panel when opening and returned to the button when closed.

A few handy extra events are bound, keyboard navigation is enabled with the `ESC` key closing the panel and any interactions outside of the panel similarly closing it.

It’s important to note that no assumption is made about the panel containing navigation, hence the lack of a `role="navigation"`; the component is simply defined as a collapsible section of the document. Navigation can of course be contained within the panel, in which case it’s recommended to use a `<nav>` element for correct interpretation by the browser.

Initialising the component responsively is possible, call `init()` when the required breakpoint is met and `destroy()` when outside of that breakpoint.

## Install

Froffcanvas is available to install with `npm`. Run with the `--save` flag to add the component your project dependencies.

~~~
npm install fr-offcanvas --save
~~~

The component will then be available to `import`.

~~~ js
import Froffcanvas from 'fr-offcanvas';
~~~

Functional styles for the off-canvas ([offcanvas.css](https://raw.githubusercontent.com/frend/frend.co/gh-pages/_components/offcanvas/offcanvas.css)) that are required to display the component states correctly should be referenced via a `<link>` in the `<head>` of your document, or can be integrated into your existing stylesheet.

You can read more about installing Frend components on our [About page](http://frend.co/about/), including details on the functional CSS and JavaScript structure.

## Usage

Offcanvas relies on a paired panel and button, with a single close button living within the panel.

~~~ html
<button class="js-fr-offcanvas-open" aria-controls="offcanvas-1">
	Open
</button>
<section class="js-fr-offcanvas" id="offcanvas-1">
	...
	<button class="js-fr-offcanvas-close">
		Close
	</button>
</section>
~~~

Assign the function invocation to a variable.

~~~ js
var myOffcanvas = Froffcanvas();
~~~

### Methods

~~~ js
// remove all bindings and attributes when no longer needed
myOffcanvas.destroy();

// re-initialise as needed
myOffcanvas.init();
~~~

### Options

~~~ js
var myOffcanvas = Froffcanvas({
	// String - Panel selector, hook for JS init() method
	selector: '.fr-offcanvas-panel',

	// String - Selector for the open button(s)
	openSelector: '.js-fr-offcanvas-open',

	// String - Selector for the close button
	closeSelector: '.js-fr-offcanvas-close',

	// String - Class name that will be added to the selector when the component has been initialised
	readyClass: 'fr-offcanvas--is-ready',

	// String - Class name that will be added to the selector when the panel is visible
	activeClass: 'fr-offcanvas--is-active'
});
~~~
