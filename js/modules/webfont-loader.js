'use strict';

import 'promis';
import FontFaceObserver from 'fontfaceobserver';


const WebFontLoader = function() {


  //  CONSTANTS
  const doc = document;
  const docEl = doc.documentElement;


  //  SUPPORTS
  if (!('querySelector' in doc) || !('addEventListener' in window) || !docEl.classList) return;


  //  SETUP
  const storageId = 'FontsLoaded';
  const classLoaded = 'fonts-loaded';
  const fonts = [
    (new FontFaceObserver('Freight Text', {
      weight: 400
    })).check(),
    (new FontFaceObserver('Freight Text', {
      weight: 400,
      style: 'italic'
    })).check(),
    (new FontFaceObserver('Benton Sans Cond Medium', {
      weight: 400
    })).check()
  ];


  //  EVENTS
  function eventFontsLoaded () {
    docEl.classList.add(classLoaded);
    sessionStorage[storageId] = true;
  }


  //  INIT
  function init () {
    Promise.all(fonts).then(eventFontsLoaded);
  }
  init();
}


// module exports
export default WebFontLoader;
