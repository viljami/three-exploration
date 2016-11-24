
'use strict';

import controls from './controls';

const mouse = controls.mouse;
const keyboard = controls.keyboard;
const keys = keyboard.keys;

function isClick (a){
  return a.isDown || a.endTime - a.startTime < 100;
}

function createMoveCommand(x, y, gameObjects){
  return {
    execute: function(){
      gameObjects.forEach(a => a.move(x, y));
    }
  };
}

// function createMoveToCommand(x, y, gameObjects){
//   return {
//     execute: function(){
//       gameObjects.forEach(a => a.moveTo(x, y));
//     }
//   };
// }

const manualControl = {
  targets: [],
  enable: function (gameObjects){
    this.targets = [].concat(gameObjects);
  },
  step: function(){
    const commands = [];
    let x = 0;
    let y = 0;
    if (keys[37]) x += -1;
    if (keys[38]) y += -1;
    if (keys[39]) x += 1;
    if (keys[40]) y += 1;
    if (x || y) commands.push(createMoveCommand(x, y, this.targets));

    if (isClick(mouse)){
      console.log('mouse click at', mouse.startX, mouse.startY);
    }
  }
};

export default manualControl;
