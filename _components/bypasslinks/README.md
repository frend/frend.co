---
permalink: /components/bypasslinks/
filename: bypasslinks
title: Bypass links
description: Bypass links blurb. This will pulled into both homepage and component page.
alpha: false
sources:
  - title: HTML
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/bypasslinks/bypasslinks.html
  - title: CSS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/bypasslinks/bypasslinks.css
  - title: JS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/bypasslinks/bypasslinks.js
links:
  - title: WebAIM - "Skip Navigation" Links
    url: http://webaim.org/techniques/skipnav/
  - title: Nicholas C. Zakas - Fixing “Skip to content” links
    url: https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
  - title: Penn State Accessibility - Skip Navigation
    url: http://accessibility.psu.edu/skipnav/
  - title: W3C - Bypass blocks
    url: https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-skip.html
  - title: W3C - Using ARIA landmarks to identify regions of a page
    url: https://www.w3.org/WAI/GL/wiki/Using_ARIA_landmarks_to_identify_regions_of_a_page
---

Having a simple set of bypass links available, provides users the ability to bypass blocks of content that are repeated over multiple web pages. Useful for screen-readers and keyboard users, bypass links are visibly hidden until focused via the `tab` key, when they appear at the top of the viewport. These can be used in conjunction with proper ARIA landmarks, as a keyboard-friendly option.

We can smooth out browser inconsistency in shifting focus to target elements (see _[Fixing “Skip to content” links](https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/)_) by adding `tabindex="-1"` to non-focusable targets. This has recently been [fixed in Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=454172#c22), but Safari and older versions of Internet Explorer will require the additional attributes.

The JavaScript part of this component is optional as the important functionality can be achieved with the correct HTML & CSS. The usability of the links can be improved however, removing the `tabindex` once the user has tabbed past the target element will not allow the user to unintentionally apply focus to a target element e.g. on click or tabbing through the document.

## Install

Frbypasslinks is available to install with `npm`. Run with the `--save` flag to add the component your project dependencies.

~~~
npm install fr-bypasslinks --save
~~~

The component will then be available to `import`.

~~~ js
import Frbypasslinks from 'fr-bypasslinks';
~~~

Functional styles for the bypass links ([bypasslinks.css](https://raw.githubusercontent.com/frend/frend.co/gh-pages/_components/bypasslinks/bypasslinks.css)) that are required to display the component states correctly should be referenced via a `<link>` in the `<head>` of your document, or can be integrated into your existing stylesheet.

You can read more about installing Frend components on our [About page](http://frend.co/about/), including details on the functional CSS and JavaScript structure.

## Usage

~~~ html
<ul class="js-fr-bypasslinks">
	<li>
		<a href="#main-content">Skip to main content</a>
	</li>
</ul>
<main id="main-content" tabindex="-1">
	...
</main>
~~~

Assign the function invocation to a variable.

~~~ js
var myBypasslinks = Frbypasslinks();
~~~

### Methods

~~~ js
// remove all bindings and attributes when no longer needed
myBypasslinks.destroy();

// re-initialise as needed
myBypasslinks.init();
~~~

### Options

~~~ js
var myBypasslinks = Frbypasslinks({
	// String - Container selector, hook for JS init() method
	selector: '.js-fr-bypasslinks'
});
~~~
