
'use strict';

import THREE from './three.service';
// import objLoader from
  // '../../../node_modules/three/examples/js/loaders/OBJLoader.js';

import objLoader from '../../../../node_modules/three-obj-loader/dist/index.js';

objLoader(THREE);
const loader = new THREE.OBJLoader();
const noop = function(){};

export default {
  load: function(url, onProgress){
    return new Promise(function(resolve, reject){
      // load: function ( url, onLoad, onProgress, onError )
      loader.load(url, function (data){
        data.rotation.x = Math.PI / 2;
        resolve(data);
      }, onProgress || noop, reject);
    });
  }
};
