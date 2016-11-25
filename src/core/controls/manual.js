
'use strict';

import controls from './controls';

const keyboard = controls.keyboard;
const keys = keyboard.keys;

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

const manual = {
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
    commands.forEach(c => c.execute());
  },

  start: function(){
    controls.start();
  }
};

export default manual;
