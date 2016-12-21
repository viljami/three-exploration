
'use strict';

import GraphicsBody from './body';
import requestAnimationFrame from './requestAnimationFrame';
import FogOfWar from './Fogofwar';
import HealthBar from './HealthBar';

const PI2 = Math.PI * 2;
let W = window.innerWidth;
let H = window.innerHeight;

let prevX = 0, prevY = 0, upperCorner = {x: 0, y: 0};
function getCameraUpperLeftCorner(target){
  upperCorner.x = prevX;
  upperCorner.y = prevY;
  prevX = target.x + W / 2;
  prevY = -target.y + H / 2;
  return upperCorner;
}

function Graphics(){
  this.layers = [];
  this.objects = [];
  this.uiComponents = [];
  this.cameraTarget = undefined;
}

Graphics.prototype.addFog = function(radius){
  this.fog = new FogOfWar(radius);
};

Graphics.prototype.createUIComponent = function(type, options){
  const o = new HealthBar(options);
  this.uiComponents.push(o);
  return o;
};

Graphics.prototype.createLayer = function(parentElement = document.body){
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = W;
  canvas.height = H;
  parentElement.appendChild(canvas);
  this.layers.push({canvas, context});
};

Graphics.prototype.draw = function(){
  const ctx = this.layers[0].context;

  ctx.clearRect(0, 0, W, H);
  const cameraCorner = getCameraUpperLeftCorner(
    this.cameraTarget || {x: 0, y: 0}
  );

  const centerX1 = this.cameraTarget.x - this.fog.r;
  const centerX2 = this.cameraTarget.x + this.fog.r;
  const centerY1 = this.cameraTarget.y - this.fog.r;
  const centerY2 = this.cameraTarget.y + this.fog.r;
  this.objects.forEach(a => {
    if ((a.x > centerX1 && a.x < centerX2) &&
      (a.y > centerY1 && a.y < centerY2)){
      ctx.fillStyle = a.color;
      ctx.beginPath();
      ctx.arc(cameraCorner.x - a.x, cameraCorner.y + a.y, a.r, 0, PI2);
      // ctx.arc(a.x, a.y, a.r, 0, PI2);
      ctx.fill();
      ctx.stroke();
    }
  });

  this.uiComponents.forEach(o => o.draw(ctx, cameraCorner));
  this.fog.draw(ctx);
};

Graphics.prototype.setCameraTarget = function(graphicsObject){
  this.cameraTarget = graphicsObject;
};

Graphics.prototype.create = function(x,y,r,c){
  const o = new GraphicsBody(x,y,r,c);
  this.objects.push(o);
  return o;
};

Graphics.prototype.remove = function(graphic){
  for (let i = 0; i < this.objects.length; i++){
    if (this.objects[i] === graphic){
      return this.objects.splice(i, 1);
    }
  }
};

Graphics.prototype.removeUIComponent = function(uiComponent){
  for(let i = 0; i < this.uiComponents.length; i++){
    if (this.uiComponents[i] === uiComponent){
      return this.uiComponents.splice(i, 1);
    }
  }
};

Graphics.prototype.start = function(){
  this.isRunning = true;
  const render = () => {
    if (this.isRunning) requestAnimationFrame(render);
    this.draw();
  };

  this.resize = this.resize.bind(this);
  window.addEventListener('resize', this.resize);

  render();
};

Graphics.prototype.stop = function(){
  this.isRunning = false;
  window.removeEventListener('resize', this.resize);
};

Graphics.prototype.resize = function (){
  W = window.innerWidth;
  H = window.innerHeight;
  this.fog.createMask(this.fog.r);
  this.layers.forEach(o => {
    o.canvas.width = W;
    o.canvas.height = H;
  });
};

export default Graphics;
