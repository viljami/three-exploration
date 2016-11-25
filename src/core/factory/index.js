
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
    this.objects.push(o);
    return o;
  }
};
