
'use strict';

import THREE from './three.service';
// import objLoader from
  // '../../../node_modules/three/examples/js/loaders/OBJLoader.js';

import objLoader from '../../../../node_modules/three-obj-loader/dist/index.js';

objLoader(THREE);
const loader = new THREE.OBJLoader();
const noop = function(){};
const hash = {};


export default {
  load: function(url, onProgress){
    if (hash[url]) return hash[url];

    return new Promise(function(resolve, reject){
    //  load: function ( url, onLoad, onProgress, onError )
      loader.load(url, function (data){
        hash[url] = data;
        data.rotation.x = Math.PI / 2;
        resolve(data);
      }, onProgress || noop, reject);
    });
  }
};
