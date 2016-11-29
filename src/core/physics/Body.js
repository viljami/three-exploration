
'use strict';

import Vec from '../Vec';

let id = 0;
const getId = () => ++id;

export default function Body(x, y, r, isStatic = false, isSensor = false){
  this.id = getId();
  this.position = new Vec(x, y);
  this.velocity = new Vec(0, 0);
  this.r = r;
  this.collisions = [];
  this.isStatic = isStatic;
  this.isSensor = isSensor;
  this.groups = [];
  this.userData = {};
}

Body.prototype.addGroup = function(group){
  this.groups.push(group);
};

Body.prototype.removeGroup = function(group){
  this.groups.splice(this.groups.findIndex(s => s === group), 1);
};

Body.prototype.hasGroup = function(group){
  return this.groups.indexOf(group) !== -1;
};

