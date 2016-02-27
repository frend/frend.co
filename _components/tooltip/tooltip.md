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
---

Tooltip blurb required.


## Usage

Tooltips rely on toggle and content pairs.

~~~ html
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, inventore consequatur veniam non quam, debitis dolore eius officiis a nihil aliquam! Maxime asperiores ut, veniam reiciendis, error quisquam quod reprehenderit!</p>
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
});
~~~