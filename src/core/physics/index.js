
'use strict';

import Vec from '../Vec';
import Body from './Body';

const abs = Math.abs;

function move(vec, direction, distance){
  const v = direction.clone();
  v.x *= distance;
  v.y *= distance;
  return vec.clone().add(v);
}

const physics = {
  objects: [],

  create: function(x, y, r){
    const b = new Body(x, y, r);
    this.objects.push(b);
    return b;
  },

  remove: function(id){
    return this.objects.splive(id, 1);
  },

  step: function(){
    // const timeStep = dt ? dt / 1000 : 1;
    this.objects.forEach(a => a.collisions = []);
    this.objects.forEach((a, i) => {
      let b, dr, v = new Vec();
      if (a.velocity.x || a.velocity.y){
        a.position.add(a.velocity);
        a.velocity.x = 0;
        a.velocity.y = 0;
      }
      for (let k = i + 1; k < this.objects.length; k ++){
        b = this.objects[k];
        dr = a.r + b.r - 1;
        v.copy(a.position).subtract(b.position);
        if (abs(v.x) < dr && abs(v.y) < dr){
          v.normalize();
          if (a.r <= b.r) a.position = move(b.position, v, dr);
          else b.position = move(a.position, v, dr);
          a.collisions.push({direction: v.clone(), other: b});
          b.collisions.push({direction: v.clone(), other: a});
          break;
        }
      }
    });
  }
};

export default physics;
