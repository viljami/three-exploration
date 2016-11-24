
'use strict';

import Victor from 'victor';
console.log(Victor);

let id = 0;
function getId (){ return ++id; }

function Body(x, y, r){
  this.id = getId();
  this.position = {x: x, y: y};
  this.velocity = {x: 0, y: 0};
  this.r = r;
  this.collisions = [];
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
    this.objects.forEach(a => a.collisions = []);
    this.objects.forEach((a, i) => {
      let b, dr;
      for (let k = i + 1; k < this.objects.length; k ++){
        b = this.objects[k];
        dr = a.r + b.r;
        if (Math.abs(a.position.x - b.position.x < dr) &&
          Math.abs(a.position.y - b.position.y < dr)){
          a.collisions.push(b);
          b.collisions.push(a);


        }
      }
    });
  }
};

export default physics;
