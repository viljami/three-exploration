
'use strict';

import Vec from '../Vec';

let id = 0;
const getId = () => ++id;

export default function Body(x, y, r, isStatic = false){
  this.id = getId();
  this.position = new Vec(x, y);
  this.velocity = new Vec(0, 0);
  this.r = r;
  this.collisions = [];
  this.isStatic = isStatic;
}
