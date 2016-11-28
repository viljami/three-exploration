
'use strict';

import GraphicsBody from './body';
import requestAnimationFrame from './requestAnimationFrame';

const PI2 = Math.PI * 2;

function getCameraUpperLeftCorner(target){
  return {
    x: target.x + window.innerWidth / 2,
    y: -target.y + window.innerHeight / 2
  };
}

const graphics = {
  layers: [],
  objects: [],
  cameraTarget: undefined,

  createLayer: function(parentElement = document.body){
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    parentElement.appendChild(canvas);
    this.layers.push({canvas, context});
  },

  draw: function(){
    const ctx = this.layers[0].context;
    const W = window.innerWidth;
    const H = window.innerHeight;
    ctx.clearRect(0, 0, W, H);
    const cameraCorner = getCameraUpperLeftCorner(
      this.cameraTarget || {x: 0, y: 0}
    );

    this.objects.forEach(a => {
      // if (isOut(a, cameraCorner)) return;
      ctx.fillStyle = a.color;
      ctx.beginPath();
      ctx.arc(cameraCorner.x - a.x, cameraCorner.y + a.y, a.r, 0, PI2);
      // ctx.arc(a.x, a.y, a.r, 0, PI2);
      ctx.fill();
      ctx.stroke();
    });
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

export default graphics;
