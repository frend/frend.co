---
filename: offcanvas
title: Off Canvas
description: Off Canvas blurb. This will pulled into both homepage and component page.
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

A common interface pattern for navigation on small viewports, the off-canvas component consists of a hidden panel and button toggling its visibility.

Aria-roles play an important role, `aria-hidden` is toggled when the panel is opened or closed to preserve consistency between the DOM & the accessibility tree, `aria-controls` are used to link the relevant buttons and panels.

No assumption is made about the panel containing navigation hence the lack of an `aria-role=”navigation”`, the component is simply defined as a collapsible section of the document. If navigation is contained within the panel, you can define a `<nav>` element for correct interpretation by the browser.

Keyboard navigation is enabled by default, the `ESC` key will close the panel and focusable elements within the panel aren't accessible if closed. Focus is applied to the panel when open to maintain the correct tab order.