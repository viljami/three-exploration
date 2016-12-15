
'use strict';

import GameObject from './GameObject';
import config from '../config';

const gameObjects = config.gameObjects;
const isNumber = isFinite;

const factory = {
  objects: [],

  create: function(x, y, type){
    const gameObjectData = gameObjects[type];
    if (! gameObjectData) throw new Error('No such GameObject type: ', type);
    const o = new GameObject(x, y, gameObjectData);
    o.type = type;
    this.objects.push(o);
    return o;
  },

  remove: function(o){
    if (isNumber(o)){
      this.objects[o]._destroy();
      return this.objects.splice(o, 1);
    }

    o._destroy();

    for (let i = 0; i < this.objects.length; i++){
      if (this.objects[i] === o){
        return this.objects.splice(i, 1);
      }
    }
  }
};

factory.types = Object.keys(gameObjects)
.reduce((a, b) => (a[b.toUpperCase()] = b) && a, {});

export default factory;
