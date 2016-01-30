# Contributing
Contributions to keep components up to date and to better enhance their accessibility are welcomed. We would love to receive feedback from developers and users of these components in the form of issues or pull requests.

Components are stored in the `_components` directory, organised into independent folders.

## Component improvements
If an existing component is buggy or lacks a feature you’d expect it to have, please file an issue. We can tag it to the relevant component, and branch off to fix it.

## Suggest a component
We’re happy to take suggestions on other components that would fit well in the Frend family. File an issue and discuss how we might best implement it in the future.

## New components
If you’d like to build a component that doesn’t yet exist, even better! We don’t ask much of you, other than you follow the coding conventions already in place across other components. As the repo that stores our code runs the website, it’s important that the new component is built in a separate branch.

The source for each component contains four files:

* **component-name.md**: This markdown file contains the frontmatter and full documentation for the component.
* **component-name.html**: This HTML file contains only the raw markup for the component.
* **component-name.css**: Any CSS that is related to the function of the component can be included in this file. Also helpful to include empty selectors as a reference.
* **component-name.js**: JavaScript should be written in the ES2015 module syntax, and exported for use in larger applications.

Reference existing components if you are unsure of how to name or organise your files.