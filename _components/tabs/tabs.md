---
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

ARIA roles can be used to help give clearer meaning about the controls and containers in a tab component. `tablist`, `tab` and `tabpanel` are all ideal for the list, anchor and sectioning elements, respectively. These aid assistive technologies when announcing the component. It's also beneficial to tie each tab to its respective tabpanel, by way of the `aria-controls` and `aria-labelledby` attributes.

Managing focus and tabindex ensures that only the visible content can be accessed when needed. We properly hide content by declaring its `tabindex="-1"` and `aria-hidden="true"` when inactive. When active, the first element in each tabpanel should have the ability to be focused. We can again use `tabindex="0"` to achieve this. An `aria-selected="true"` attribute is needed to correctly set the active tabpanel's state (to do).

Key bindings also give keyboard users more predictable and intuitive ways of navigating the component. All arrow keys can be used to cycle through the tabs. Hitting the tab key will shift focus directly from the focused tab to its active tabpanel content. Additional work should be done to the key bindings for this component to support skipping to first/last content (Ctrl+PageUp/PageDown), as per the WAI-ARIA spec.


## Usage

A simple list of jumplinks to content anchors can form the basis of a tabs component.

~~~ html
<div class="fr-tabs js-fr-tabs">
	<ul class="fr-tabs__tablist">
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
	<section class="fr-tabs__panel" id="tab1">
		...
	</section>
	<section class="fr-tabs__panel" id="tab2">
		...
	</section>
	<section class="fr-tabs__panel" id="tab3">
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
	selector: '.js-fr-tabs',
	// outer container selector, hook for JS init() method

	tablistSelector: '.fr-tabs__tablist',
	// list selector to transform into tablist

	tabpanelSelector: '.fr-tabs__panel',
	// containers which hold content, toggled via tabs

	tabsReadyClass: 'has-fr-tabs'
	// class name that will be added to <html> as accordion is initialised
});
~~~