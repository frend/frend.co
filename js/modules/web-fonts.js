/**
 * Web font loader
 */

const fonts = {
	custom: {
		families: ['Benton Sans Cond Medium', 'Freight Text'],
		urls: ['//cloud.webtype.com/css/d0f727b8-b89e-413f-ad8a-085ca4d7de47.css']
	}
};
const webfontLocation = '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';


//	Main
function WebFonts() {
	//	set webfont.js config options and async load the library
	window.WebFontConfig = fonts;
	loadJS(webfontLocation);
}


//	module exports
export default WebFonts;