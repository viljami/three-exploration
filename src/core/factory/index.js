
'use strict';

import GameObject from './GameObject';

export default {
  objects: [],

  setData: function(data){
    this.data = data;
    this.types = Object.keys(data)
    .reduce((a, b) => (a[b.toUpperCase()] = b) && a, {});
  },

  create: function(x, y, r, type){
    const gameObjectData = this.data[type];
    if (! gameObjectData) throw new Error('No such GameObject type: ', type);
    const o = new GameObject(x, y, r, gameObjectData);
    o.type = type;
    this.objects.push(o);
    return o;
  },

  remove: function(gameObject){

    if (isFinite(gameObject)){ // Number
      this.objects[gameObject]._destroy();
      return this.objects.splice(gameObject, 1);
    }

    gameObject._destroy();

    for (let i = 0; i < this.objects.length; i++){
      if (this.objects[i] === gameObject){
        return this.objects.splice(i, 1);
      }
    }
  }
};
