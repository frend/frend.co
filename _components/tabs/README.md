---
permalink: /components/tabs/
filename: tabs
title: Tabs
alpha: false
sources:
  - title: HTML
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/tabs/tabs.html
  - title: CSS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/tabs/tabs.css
  - title: JS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/tabs/tabs.js
links:
  - title: WAI ARIA Authoring Practices - Tab Panel
    url: https://www.w3.org/TR/wai-aria-practices/#tabpanel
  - title: Heydon Pickering - Practical ARIA Examples
    url: http://heydonworks.com/practical_aria_examples/#tab-interface
  - title: Athena Technologies - Tab panel
    url: http://accessibility.athena-ict.com/aria/examples/tabpanel2.shtml
  - title: 24 Ways - How Tabs Should Work
    url: https://24ways.org/2015/how-tabs-should-work/
  - title: Accessible Culture - Accessible ARIA Tabs
    url: http://accessibleculture.org/articles/2010/08/aria-tabs/
---

The concept of a tab interface for the web may seem strikingly straight-forward. However, implementations often draw the line at styling and showing/hiding content.

ARIA roles can be used to help give clearer meaning about the controls and containers in a tab component. `tablist`, `tab` and `tabpanel` are all ideal for the list, anchor and sectioning elements, respectively. These aid assistive technologies when announcing the component. It's also beneficial to tie each tab to its respective tabpanel, by way of the `aria-controls` attributes.

Managing focus and tabindex ensures that only the visible content can be accessed when needed. We properly hide content by declaring its `tabindex="-1"` and `aria-hidden="true"` when inactive. When active, the tabpanel should have the ability to be focused. We can again use `tabindex="0"` to achieve this. An `aria-selected="true"` attribute is needed to correctly set the active tab's state.

Key bindings also give keyboard users more predictable and intuitive ways of navigating the component. All arrow keys can be used to cycle through the tabs. Hitting the tab key will shift focus directly from the focused tab to its active tabpanel content. Additional work should be done to the key bindings for this component to support skipping to first/last content (Ctrl+PageUp/PageDown), as per the WAI-ARIA spec.

## Install

Frtabs is available to install with `npm`. Run with the `--save` flag to add the component your project dependencies.

~~~
npm install fr-tabs --save
~~~

The component will then be available to `import`.

~~~ js
import Frtabs from 'fr-tabs';
~~~

Functional styles for the tabs ([tabs.css](https://raw.githubusercontent.com/frend/frend.co/gh-pages/_components/tabs/tabs.css)) that are required to display the component states correctly should be referenced via a `<link>` in the `<head>` of your document, or can be integrated into your existing stylesheet.

You can read more about installing Frend components on our [About page](http://frend.co/about/), including details on the functional CSS and JavaScript structure.

## Usage

A simple list of jumplinks to content anchors can form the basis of a tabs component.

~~~ html
<div class="fr-tabs js-fr-tabs">
	<ul class="fr-tabs__tablist js-fr-tabs__tablist">
		<li class="fr-tabs__tablist-item">
			<a class="fr-tabs__tab" href="#tab1">...</a>
		</li>
		<li class="fr-tabs__tablist-item">
			<a class="fr-tabs__tab" href="#tab2">...</a>
		</li>
		<li class="fr-tabs__tablist-item">
			<a class="fr-tabs__tab" href="#tab3">...</a>
		</li>
	</ul>
	<section class="fr-tabs__panel js-fr-tabs__panel" id="tab1">
		...
	</section>
	<section class="fr-tabs__panel js-fr-tabs__panel" id="tab2">
		...
	</section>
	<section class="fr-tabs__panel js-fr-tabs__panel" id="tab3">
		...
	</section>
</div>
~~~

Assign the function invocation to a variable.

~~~ js
var myTabs = Frtabs();
~~~

### Methods

~~~ js
// remove all bindings and attributes when no longer needed
myTabs.destroy();

// re-initialise as needed
myTabs.init();
~~~

### Options

~~~ js
var myTabs = Frtabs({
	// String - Outer container selector, hook for JS init() method
	selector: '.js-fr-tabs',

	// String - List selector to transform into tablist
	tablistSelector: '.js-fr-tabs__tablist',

	// String - Containers which hold content, toggled via tabs
	tabpanelSelector: '.js-fr-tabs__panel',

	// String - Class name that will be added to the selector when the component has been initialised
	tabsReadyClass: 'fr-tabs--is-ready'
});
~~~