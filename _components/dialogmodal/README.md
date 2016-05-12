---
permalink: /components/dialogmodal/
filename: dialogmodal
title: Dialog Modal
alpha: false
sources:
  - title: HTML
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/dialogmodal/dialogmodal.html
  - title: CSS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/dialogmodal/dialogmodal.css
  - title: JS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/dialogmodal/dialogmodal.js
links:
  - title: WAI ARIA Authoring Practices - Dialog Modal
    url: https://www.w3.org/TR/wai-aria-practices/#dialog_modal
  - title: Edenspiekermann A11y Dialog
    url: http://edenspiekermann.github.io/a11y-dialog/
---



## Install

Frdialogmodal is available to install with `npm`. Run with the `--save` flag to add the component your project dependencies.

~~~
npm install fr-dialogmodal --save
~~~

The component will then be available to `import`.

~~~ js
import Frdialogmodal from 'fr-dialogmodal';
~~~

Functional styles for the modal ([dialogmodal.css](https://raw.githubusercontent.com/frend/frend.co/gh-pages/_components/dialogmodal/dialogmodal.css)) that are required to display the component states correctly should be referenced via a `<link>` in the `<head>` of your document, or can be integrated into your existing stylesheet.

You can read more about installing Frend components on our [About page](http://frend.co/about/), including details on the functional CSS and JavaScript structure.

## Usage

~~~ html
<button class="js-fr-dialogmodal-open" aria-controls="modal-1">
  Open
</button>
<div class="js-fr-dialogmodal" id="modal-1">
  <div class="js-fr-dialogmodal-modal">
    ...
    <button class="js-fr-dialogmodal-close">Close</button>
  </div>
</div>
~~~

Assign the function invocation to a variable.

~~~ js
var myModal = Frdialogmodal();
~~~

### Methods

~~~ js
// remove all bindings and attributes when no longer needed
myModal.destroy();

// re-initialise as needed
myModal.init();
~~~

### Options

~~~ js
var myModal = Frdialogmodal({
  // String - Outer container selector, hook for JS init() method
  selector: '.js-fr-dialogmodal',

  // String - Modal selector, the element that represents the modal
  modalSelector: '.js-fr-dialogmodal-modal',

  // String - Selector for the open button
  openSelector: '.js-fr-dialogmodal-open',

  // String - Selector for the close button
  closeSelector: '.js-fr-dialogmodal-close',

  // Boolean - Switches the dialog role to alertdialog, only use this when representing an alert, error or warning
  isAlert: 'false',

  // String - Class name that will be added to the selector when the component has been initialised
  readyClass: 'fr-dialogmodal--is-ready',

  // String - Class name that will be added to the selector when the component is active
  activeClass: 'fr-dialogmodal--is-active'
});
~~~