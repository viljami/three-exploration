
'use strict';

import Vec from '../Vec';
import Body from './Body';

const abs = Math.abs;

function setOrbit(vec, direction, distance){
  const v = direction.clone();
  v.x *= distance;
  v.y *= distance;
  return vec.clone().add(v);
}

function move(body){
  if (! body.velocity.x && ! body.velocity.y) return;
  body.position.add(body.velocity);
  body.velocity.x = 0;
  body.velocity.y = 0;
}

function isSameGroup(a, b){
  return a.group && b.group && a.group === b.group;
}

const physics = {
  objects: [],

  create: function(x, y, r, isStatic = false, isSensor = false){
    const b = new Body(x, y, r, isStatic, isSensor);
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
      move(a);

      for (let k = i + 1; k < this.objects.length; k ++){
        b = this.objects[k];
        if (! isSameGroup(a, b)){
          dr = a.r + b.r - 1;
          v.copy(a.position).subtract(b.position);

          if (abs(v.x) < dr && abs(v.y) < dr){
            v.normalize();
            if (! a.isSensor && ! b.isSensor){
              if (a.r <= b.r) a.position = setOrbit(b.position, v, dr);
              else b.position = setOrbit(a.position, v, dr);
              a.collisions.push({direction: v.clone(), other: b});
              b.collisions.push({direction: v.clone(), other: a});
            } else if (a.isSensor && ! b.isSensor){
              a.collisions.push({direction: v.clone(), other: b});
            } else if (! a.isSensor && b.isSensor){
              b.collisions.push({direction: v.clone(), other: a});
            } else {
              // sensor collision don't do anything
            }
            break;
          }
        }
      }
    });
  }
};

export default physics;
