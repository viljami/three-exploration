// Based on:
// https://gist.github.com/paulirish/1579671

'use strict';

(function() {
  const vendors = ['ms', 'moz', 'webkit', 'o'];
  let lastTime = 0;

  for (let x = 0; x < vendors.length && ! window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
      || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (! window.requestAnimationFrame){
    window.requestAnimationFrame = function(callback) {
      const currTime = Date.now();
      const dt = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(() => callback(currTime + dt), dt);
      lastTime = currTime + dt;
      return id;
    };
  }

  if (! window.cancelAnimationFrame){
    window.cancelAnimationFrame = function(id){ clearTimeout(id); };
  }
}());

export default window.requestAnimationFrame;
