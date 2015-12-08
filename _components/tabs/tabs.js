'use strict';

//
let options = {};


class Frtabs {

	constructor (selector = '.js-fr-tabs', {
		containerClassName: containerClassName = 'fr-tabs',
		linkEl: linkEl = 'button'
	} = {}) {

		options = {
			containerClassName,
			linkEl
		}

		init();
	}


	// public methods
	destroy () {
		console.log('destroy');
	}

}


// private methods
function addA11y (selector, options) {
	console.log('a11y');
}

function init () {
	console.log(options);
}


// module exports
export default Frtabs;