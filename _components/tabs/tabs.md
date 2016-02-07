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

Let’s take it further, using JavaScript to add meaningful information and bind helpful keyboard events.

Starting with the tab controls, we add relevant `role` attributes to our list. The initial markup that served as a static list of jumplinks to content, is now announced as a part of tab widget.

~~~ html
<ul role="tablist">
    <li role="presentation">
      <a href="#tab1" role="tab">Tab 1</a>
    </li>
    <li role="presentation">
      <a href="#tab2" role="tab">Tab 2</a>
    </li>
    <li role="presentation">
      <a href="#tab3" role="tab">Tab 3</a>
    </li>
  </ul>
~~~

The tab panels that follow this `tablist` and hold our content get a similar treatment.

~~~ html
<section id=”tab1” role="tabpanel">
</section>
<section id=”tab2” role="tabpanel">
</section>
<section id=”tab3” role="tabpanel">
</section>
~~~