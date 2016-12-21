
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
const hash = {};

function getMtl (url){
  if (hash[url]) return hash[url];
  hash[url] = new Promise(function(resolve, reject){
    mtlLoader.load(url, function(mtl){
      mtl.preload();
      resolve(mtl);
    }, noop, reject);
  });

  return hash[url];
}

function getObj (url){
  if (hash[url]) return hash[url];
  hash[url] = new Promise(function(resolve, reject){
    loader.load(url, function (data){
      data.rotation.x = Math.PI / 2;
      resolve(data);
    }, noop, reject);
  });
  return hash[url];
}

export default {
  load: function(url){
    return getMtl(url.replace('.obj', '.mtl'))
    .then(mtl => {
      loader.setMaterials(mtl);
      // load: function ( url, onLoad, onProgress, onError )
      return getObj(url);
    })
    .then(obj => {
      return obj.clone();
    });
  }
};
