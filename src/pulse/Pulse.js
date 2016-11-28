
'use strict';

import core from './core/';

const Vec = core.Vec;

export default function Pulse(x, y, r, color){
  this.position = new Vec(x, y);
  this.maxR = r;
  this.currentR = 1;
  this.speed = 1;
}

Pulse.prototype.update = function(){
  this.currentR += this.speed;
};
