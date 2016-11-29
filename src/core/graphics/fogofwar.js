
'use strict';

export default function FogOfWar(r){
  this.r = r;
  this.createMask(r);
}

FogOfWar.prototype.createMask = function(r){
  if (! this.image) this.image = document.createElement('canvas');
  let context = this.image.getContext('2d');
  const W = window.innerWidth;
  const H = window.innerHeight;
  this.image.width = W;
  this.image.height = H;

  const gradient = context
  .createRadialGradient(W / 2, H / 2, r || this.r, W / 2, H / 2, 0);
  gradient.addColorStop(0, 'rgba(10,10,10,1)');
  gradient.addColorStop(1, 'rgba(20,20,20,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, W, H);

  return this.image;
};

FogOfWar.prototype.draw = function(context){
  context.drawImage(this.image, 0, 0);
};
