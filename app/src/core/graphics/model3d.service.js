
'use strict';

import THREE from './three.service';
// import objLoader from
  // '../../../node_modules/three/examples/js/loaders/OBJLoader.js';

import mtlLoaderFactory
  from '../../../../node_modules/three-mtl-loader/index.js';
import objLoaderFactory
  from '../../../../node_modules/jser-three-obj-loader/index.js';

mtlLoaderFactory(THREE);
objLoaderFactory(THREE);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('./');

const loader = new THREE.OBJLoader();
const noop = function(){};
const mtlHash = {};

function getMtl (url){
  return new Promise(function(resolve, reject){
    mtlLoader.load(url, function(mtl){
      mtl.preload();
      resolve(mtl);
    }, noop, reject);
  });
}

export default {
  load: function(url, onProgress){
    return new Promise(function(resolve, reject){
      const mtlUrl = url.replace('.obj', '.mtl');
      if (! mtlHash[mtlUrl]) mtlHash[mtlUrl] = getMtl(mtlUrl);
      console.log('mtl 1', mtlHash);

      mtlHash[mtlUrl]
      .then(mtl => {
        loader.setMaterials(mtl);
        console.log('mtl 2');
        // load: function ( url, onLoad, onProgress, onError )
        loader.load(url, function (data){
          data.rotation.x = Math.PI / 2;
          resolve(data);
        }, onProgress || noop, reject);
      });
    });
  }
};
