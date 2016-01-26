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
Contributions to keep components up to date and to better enhance their accessibility are welcomed. We would love to receive feedback from developers and users of these components in the form of issues or pull requests.

Components are stored in the `_components` directory, organised into independent folders.

### Component improvements
If an existing component is buggy or lacks a feature you’d expect it to have, please file an issue. We can tag it to the relevant component, and branch off to fix it.

### Suggest a component
We’re happy to take suggestions on other components that would fit well in the Frend family. File an issue and discuss how we might best implement it in the future.

### New components
If you’d like to build a component that doesn’t yet exist, even better! We don’t ask much of you, other than you follow the coding conventions already in place across other components. As the repo that stores our code runs the website, it’s important that the new component is built in a separate branch.

The source for each component contains four files:

* **component-name.md**: This markdown file contains the frontmatter and full documentation for the component.
* **component-name.html**: This HTML file contains only the raw markup for the component.
* **component-name.css**: Any CSS that is related to the function of the component can be included in this file. Also helpful to include empty selectors as a reference.
* **component-name.js**: JavaScript should be written in the ES2015 module syntax, and exported for use in larger applications.

Reference existing components if you are unsure of how to name or organise your files.

## Feedback
If you have feedback or suggestions on how to make Frend better, please [email us](mailto:hello@frend.co) or [Tweet us](http://www.twitter.com/frendco).