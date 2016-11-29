
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
  prevX = target.x + window.innerWidth / 2;
  prevY = -target.y + window.innerHeight / 2;

  return upperCorner;
}

const graphics = {
  layers: [],
  objects: [],
  uiComponents: [],
  cameraTarget: undefined,

  addFog: function(radius){
    this.fog = new FogOfWar(radius);
  },

  createUIComponent: function(type, options){
    const o = new HealthBar(options);
    this.uiComponents.push(o);
    return o;
  },

  createLayer: function(parentElement = document.body){
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = W;
    canvas.height = H;
    parentElement.appendChild(canvas);
    this.layers.push({canvas, context});
  },

  draw: function(){
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
  },

  setCameraTarget: function(graphicsObject){
    this.cameraTarget = graphicsObject;
  },

  create: function(x,y,r,c){
    const o = new GraphicsBody(x,y,r,c);
    this.objects.push(o);
    return o;
  },

  remove: function(graphic){
    for (let i = 0; i < this.objects.length; i++){
      if (this.objects[i] === graphic){
        return this.objects.splice(i, 1);
      }
    }
  },

  removeUIComponent: function(uiComponent){
    for(let i = 0; i < this.uiComponents.length; i++){
      if (this.uiComponents[i] === uiComponent){
        return this.uiComponents.splice(i, 1);
      }
    }
  },

  start: function(){
    this.isRunning = true;
    const frame = () => {
      if (this.isRunning) requestAnimationFrame(frame);
      graphics.draw();
    };
    frame();
  },

  stop: function(){ this.isRunning = false; }
};

window.addEventListener('resize', function resize(){
  W = window.innerWidth;
  H = window.innerHeight;
  graphics.fog.createMask(graphics.fog.r);
  graphics.layers.forEach(o => {
    o.canvas.width = W;
    o.canvas.height = H;
  });
});

export default graphics;
