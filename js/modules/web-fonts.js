/**
 * Web font loader
 */

const fonts = {
	google: {
		families: [
			'Merriweather:400,700:latin',
			'Montserrat'
		]
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