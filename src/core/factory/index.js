
'use strict';

import GameObject from './GameObject';

export default {
  objects: [],
  create: function(x, y, r, color){
    const o = new GameObject(x, y, r, color);
    this.objects.push(o);
    return o;
  }
};
