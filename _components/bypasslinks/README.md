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
  - title: WebAIM - Accesskey
    url: http://webaim.org/techniques/keyboard/accesskey
  - title: Penn State Accessibility - Skip Navigation
    url: http://accessibility.psu.edu/skipnav/
  - title: W3C - Bypass blocks
    url: https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-skip.html
---

Having a simple set of bypass links available, provides users the ability to bypass blocks of content that are repeated over multiple web pages. Useful for screen-readers and keyboard users, bypass links are visibly hidden until focused, when they appear at the top of the viewport.

The JavaScript part of this component is optional as the important functionality can be achieved with the correct HTML & CSS. The usability of the links can be improved however, removing the `tabindex` once the user has tabbed past the target element will not allow the user to accidently apply focus to a target element.

## Usage

~~~ html
<ul class="js-fr-bypasslinks">
	<li>
		<a href="#main-content">Skip to main content</a>
	</li>
</ul>
<main id="main-content">
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
