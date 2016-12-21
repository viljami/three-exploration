
'use strict';

import Vec from '../Vec';
import Body from './Body';

const FRICTION = 0.5;

const abs = Math.abs;
function setOrbit(pos1, pos2, direction, distance){
  const v = direction.clone();
  v.x *= distance;
  v.y *= distance;
  if (pos1.x < pos2.x) pos1.x = pos2.x - abs(v.x);
  else pos1.x = pos2.x + abs(v.x);
  if (pos1.y < pos2.y) pos1.y = pos2.y - abs(v.y);
  else pos1.y = pos2.y + abs(v.y);
  return pos1;
}

function move(body){
  if (! body.velocity.x && ! body.velocity.y) return;
  body.position.add(body.velocity);
  body.velocity.x *= FRICTION;
  body.velocity.y *= FRICTION;
}

const isSameGroup = (a, b) => {
  return !! a.groups.find(b.hasGroup.bind(b));
};

const is = (o, b) => o.other === b;
const haveCollided = (a, b) => {
  return ! a.collisions.find(is.bind(null, b)) &&
    ! b.collisions.find(is.bind(null, a));
};

const physics = {
  objects: [],

  create: function(x, y, r, isStatic = false, isSensor = false){
    const b = new Body(x, y, r, isStatic, isSensor);
    this.objects.push(b);
    return b;
  },

  remove: function(body){
    for (let i = 0; i < this.objects.length; i++){
      if (this.objects[i] === body){
        return this.objects.splice(i, 1);
      }
    }
  },

  step: function(){
    this.objects.forEach(a => a.collisions = []);
    this.objects.forEach((a, i) => {
      let b, dr = 0, v = new Vec(), l = 0;
      move(a);

      for (let k = 0; k < this.objects.length; k ++){
        if (k === i && ++k >= this.objects.length) break;

        b = this.objects[k];
        if (! isSameGroup(a, b)){
          dr = a.r + b.r - 1;
          v.copy(a.position).subtract(b.position);
          l = v.length();
          if (l < dr){
            v.x /= l;
            v.y /= l;
            if (! a.isSensor && ! b.isSensor){
              if (haveCollided(a, b)){
                if (! a.isStatic && b.isStatic){
                  setOrbit(a.position, b.position, v, dr);
                } else if (a.isStatic && ! b.isStatic) {
                  setOrbit(b.position, a.position, v, dr);
                } else {
                  if (a.r <= b.r) setOrbit(a.position, b.position, v, dr);
                  else setOrbit(b.position, a.position, v, dr);
                  a.collisions.push({other: b});
                  b.collisions.push({other: a});
                }
              }
            } else if (a.isSensor && ! b.isSensor && ! b.isStatic){
              a.collisions.push({other: b});
            } else if (! a.isSensor && b.isSensor && ! a.isStatic){
              b.collisions.push({other: a});
            }
          }
        }
      }
    });
  }
};

export default physics;
