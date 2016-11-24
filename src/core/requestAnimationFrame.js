// Based on:
// https://gist.github.com/paulirish/1579671

'use strict';

(function() {
  let lastTime = 0;
  let vendors = ['ms', 'moz', 'webkit', 'o'];
  for (let x = 0; x < vendors.length && ! window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
      || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (! window.requestAnimationFrame){
    window.requestAnimationFrame = function(callback) {
      let currTime = new Date().getTime();
      let dt = Math.max(0, 16 - (currTime - lastTime));
      let id = window.setTimeout(() => callback(currTime + dt), dt);
      lastTime = currTime + dt;
      return id;
    };
  }

  if (! window.cancelAnimationFrame){
    window.cancelAnimationFrame = function(id){ clearTimeout(id); };
  }
}());

export default window.requestAnimationFrame;
