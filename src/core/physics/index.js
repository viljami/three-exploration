
'use strict';

import Vec from '../Vec';
import Body from './Body';

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
  body.velocity.x = 0;
  body.velocity.y = 0;
}

const isSameGroup = (a, b) => {
  return !! a.groups.filter(g => b.hasGroup(g)).length;
};

const is = (o, b) => o.other === b;

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
      let b, dr, v = new Vec();
      move(a);

      for (let k = 0; k < this.objects.length; k ++){
        if (k === i && ++k >= this.objects.length) break;

        b = this.objects[k];
        if (! isSameGroup(a, b)){
          dr = a.r + b.r - 1;
          v.copy(a.position).subtract(b.position);

          if (v.length() < dr){
            v.normalize();
            if (! a.isSensor && ! b.isSensor){
              if (! a.collisions.find(is.bind(null, b)) && !
                b.collisions.find(is.bind(null, a))) {
                if (a.r <= b.r) a.position = setOrbit(a.position, b.position, v, dr);
                else b.position = setOrbit(b.position, a.position, v, dr);
                a.collisions.push({direction: v.clone(), other: b});
                b.collisions.push({direction: v.clone(), other: a});
              }
            } else if (a.isSensor && ! b.isSensor){
              a.collisions.push({direction: v.clone(), other: b});
            } else if (! a.isSensor && b.isSensor){
              b.collisions.push({direction: v.clone(), other: a});
            }
          }
        }
      }
    });
  }
};

export default physics;
