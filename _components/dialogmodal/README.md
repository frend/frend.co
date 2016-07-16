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
  - title: WAI ARIA Authoring Practices - Alert Dialog
    url: https://www.w3.org/TR/wai-aria-practices/#alertdialog
  - title: Edenspiekermann A11y Dialog
    url: http://edenspiekermann.github.io/a11y-dialog/
  - title: MDN - Using the alertdialog role
    url: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alertdialog_role
  - title: MDN - Using the dialog role
    url: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_dialog_role
---

Dialogs can be utilised to display content over the top of the current context, often as a way of prompting users for a response. While developers wait for the [`dialog`](https://developer.mozilla.org/en/docs/Web/HTML/Element/dialog) element to gain better support, we can make use of existing ARIA roles and attributes to replicate its function. It's becoming a common feature of modern interfaces, and a lot of positive attention has been brought to this pattern recently, thanks to [Hugo Giraudel's A11y Dialog](http://dev.edenspiekermann.com/2016/02/11/introducing-accessible-modal-dialog/).

The underlying markup is kept as simple as possible. `button`s are used to open and close the dialog, while overlay and modal containers hold our content. Assigning `aria-controls` and `id` attributes clarify which triggers are controlling their respective modal content. As the modal isn't visible by default, we add `aria-hidden="true"` to the overlay container as part of its initialisation.

Giving the modal container a `role="dialog"` communicates the function of the component to assistive technologies. If the content represents an alert, error or warning, we can instead use `role="alertdialog"` to ensure we're presenting something that requires an immediate response from the user before continuing. The immediate child node of the modal requires an element with `role="document"`. This allows assistive technologies to switch to document browsing mode, providing complete access to the modal content.

An important consideration that is often overlooked with standard dialog implementations is user focus. When opening, focus is applied to the first focusable item within the modal. At the same time the `Esc` key and overlay/close button click events are bound to allow users to dismiss the dialog. When the dialog is visible, using the `tab` key will retain focus among elements within the modal, as to avoid applying focus to elements in the surrounding page. Lastly, we can return focus to the original trigger when closing the modal to maintain the users' place in the document.

A heading within the modal and a related `aria-labelledby` attribute is required on the modal to clearly define the title of the dialog for assistive technologies.


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

You can read more about installing Frend components on our [About page](https://frend.co/about/), including details on the functional CSS and JavaScript structure.

## Usage

~~~ html
<button class="js-fr-dialogmodal-open" aria-controls="modal">
  Open
</button>
<div class="js-fr-dialogmodal" id="modal">
  <div class="js-fr-dialogmodal-modal" aria-labelledby="modal-title">
    <div role="document">
      <h2 id="modal-title">Title</h2>
      ...
      <button class="js-fr-dialogmodal-close">Close</button>
    </div>
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
  isAlert: false,

  // String - Class name that will be added to the selector when the component has been initialised
  readyClass: 'fr-dialogmodal--is-ready',

  // String - Class name that will be added to the selector when the component is active
  activeClass: 'fr-dialogmodal--is-active'
});
~~~
