
'use strict';

let id = 0;
const getId = () => --id;
const color = 'rgba(0,255,0,0.5)';

export default function GraphicsObject(x, y, r, c = color, layerIndex = 0){
  this.id = getId();
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = c;
  this.layerIndex = layerIndex;
}

GraphicsObject.prototype.update = function(x, y, r, c){
  this.x = x;
  this.y = y;
  this.r = r;
  if (c) this.c = c;
};
