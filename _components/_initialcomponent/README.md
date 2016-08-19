---
permalink: /components/_initialcomponent/
filename: initial
title: Initial
sources:
  - title: HTML
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/_initialcomponent/src/index.html
  - title: CSS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/_initialcomponent/src/style.css
  - title: JS
    url: https://github.com/frend/frend.co/blob/gh-pages/_components/_initialcomponent/src/index.js
links:
  - title: Title
    url: Link
---

Main copy here

## Install

Frinitial is available to install with `npm`. Run with the `--save` flag to add the component your project dependencies.

~~~
npm install fr-initial --save
~~~

The component will then be available to `import`.

~~~ js
import frinitial from 'fr-initial';
~~~

Functional styles for the component ([style.css](https://raw.githubusercontent.com/frend/frend.co/gh-pages/_components/_initialcomponent/src/style.css)) that are required to display the component states correctly should be referenced via a `<link>` in the `<head>` of your document, or can be integrated into your existing stylesheet.

You can read more about installing Frend components on our [About page](https://frend.co/about/), including details on the functional CSS and JavaScript structure.

## Usage

~~~ html
<div class="fr-initial js-fr-initial">
</div>
~~~

Assign the function invocation to a variable.

~~~ js
const initialComponent = frinitial();
~~~

### Methods

~~~ js
// remove all bindings and attributes when no longer needed
initialComponent.destroy();

// re-initialise as needed
initialComponent.init();
~~~

### Options

~~~ js
const initialComponent = frinitial({
  // String - Outer container selector, hook for JS init() method
  selector: '.js-fr-initial',

  // String - Class name that will be added to the selector when the component has been initialised
  readyClass: 'fr-initial--is-ready'
});
~~~
