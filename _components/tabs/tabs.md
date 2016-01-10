---
filename: tabs
title: Tabs
description: Tabs blurb. This will pulled into both homepage and component page.
alpha: false
links:
  - title: Heydon Pickering - Practical ARIA Examples
    url: http://heydonworks.com/practical_aria_examples/#tab-interface
  - title: Athena Technologies - Tab panel
    url: http://accessibility.athena-ict.com/aria/examples/tabpanel2.shtml
  - title: 24 Ways - How Tabs Should Work
    url: https://24ways.org/2015/how-tabs-should-work/
---

The full explanation content can go here. This supports multiple paragraphs.

This is pretty forgiving when it comes to whitespace, so shouldn't matter if we add newlines between paras/headings. It also transforms characters like &rsquos from within content, which is pretty cool.

## Usage

### HTML
This one should be pretty easy. Just a little preformatted block of HTML? Make sure there's a line break here, otherwise it thinks it's part of the paragraph.

	<div class="the-component">
		<div class="something"></div>
	</div>

Or you can get syntax highlighing for free with fenced code blocks, using triple-graves:

``` html
<div class="the-component">
	<div class="something"></div>
</div>
```

We should even be able to directly include entire files by using a relative include (single source of truth!) inside of a fenced block:

``` html
{% include_relative tabs.html %}
```

### JS
Inline code can be included, by wrapping it in graves, like `this = _that;`

For preformatted multiline code blocks, indent the markup with a tab:

	var myComponent = frTabs();

Or again, fenced code blocks, where syntax highlighting is required:

``` js
var myComponent = frTabs();
```