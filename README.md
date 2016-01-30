#About Frend

A collection of accessible, modern front-end components.

Frend components are modest and dependency-free. They are built with web standards as a priority and aim to avoid assumptions about tooling or environment. Care has been taken to make sure each component is compliant, keyboard navigable and properly interpreted by assistive technologies.

The purpose of Frend is to offer ready-to-use components for projects. These also provide specifics on how they’ve utilised ARIA attributes and event bindings, based on global recommendations, in order to make them more predictable and usable for all.

The goal is to work on these components collaboratively. This allows us to share our implementation experiences, approaches to supporting different environments, and any bugs we’ve come across along the way.

## Standards
Appropriate, semantic elements are at the core of each Frend component. This ensures that a useable baseline for the content or interaction is in place before we introduce enhancements using CSS or JavaScript. Enhancements are based upon available features, so components won’t necessarily function the same in every browser. 

### CSS
CSS included with each component is purely functional. We include the relevant selectors in our stylesheets, but what you do within them is entirely up to you. We favour a BEM syntax when defining selectors, however these are all configurable in the component options if you’d like to use a different convention.

Styling hooks are added to the document when each component is initialised, so we have the ability to apply styles to their static state, before we style them in their fully-functioning state. 


### JavaScript
JavaScript is written using ES2015 module syntax. Modules export themselves, so they’re available to `import` into your existing project where and when they are needed. If this doesn’t suit your workflow, we also transpile modules to ES5 and bundle them using UMD, so they can be utilised directly in the browser, or by other module loaders. You can find these files in the `dist` directory.

A simple API is exposed for each component, which usually contains `init()` and `destroy()` methods. More information about invoking components and any additional methods can be found on each of their respective pages.

## Platform
Frend is powered by [Jekyll](http://jekyllrb.com) and served directly from the [frend/frend.co Github repository](https://github.com/frend/frend.co) thanks to [Github Pages](https://pages.github.com/).

## Contributing
Please refer to our [contributing guidelines](https://github.com/frend/frend.co/blob/gh-pages/CONTRIBUTING.md).

## Feedback
If you have feedback or suggestions on how to make Frend better, please [email us](mailto:hello@frend.co) or [Tweet us](http://www.twitter.com/frendco).