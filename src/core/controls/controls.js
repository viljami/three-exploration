
'use strict';

const control = {
  start: function(){
    if (this.isRunning) return;
    this.isRunning = true;
    Object.keys(control).forEach(a => {
      if (typeof control[a] === 'object') control[a].start();
    });
  },

  stop: function(){
    if (! this.isRunning) return;
    this.isRunning = false;
    Object.keys(control).forEach(a => {
      if (typeof control[a] === 'object') control[a].stop();
    });
  }
};

const keyDown = e => control.keyboard.keys[e.keyCode] = true;
const keyUp = e => control.keyboard.keys[e.keyCode] = false;

control.keyboard = {
  keys: [],
  start: function(){
    document.body.addEventListener('keydown', keyDown);
    document.body.addEventListener('keyup', keyUp);
  },

  stop: function(){
    document.body.removeEventListener('keydown', keyDown);
    document.body.removeEventListener('keyup', keyUp);
  }
};

const mouseDown = e => {
  control.mouse.startX = e.clientX;
  control.mouse.startY = e.clientY;
  control.mouse.isDown = true;
  control.mouse.startTime = Date.now();
};

const mouseUp = e => {
  control.mouse.endX = e.clientX;
  control.mouse.endY = e.clientY;
  control.mouse.isDown = false;
  control.mouse.endTime = Date.now();
};

control.mouse = {
  startX: undefined,
  startY: undefined,
  endX: undefined,
  endY: undefined,
  isDown: false,
  startTime: undefined,
  endTime: undefined,
  start: function(){
    document.body.addEventListener('mousedown', mouseDown);
    document.body.addEventListener('mouseup', mouseUp);
  },

  stop: function(){
    document.body.removeEventListener('mousedown', mouseDown);
    document.body.removeEventListener('mouseup', mouseUp);
  }
};

export default control;
