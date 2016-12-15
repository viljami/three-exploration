
'use strict';

import controls from './controls';

const mouse = controls.keyboard;
const keyboard = controls.keyboard;
const keys = keyboard.keys;

function createMoveCommand(x, y, gameObjects){
  return {
    execute: function(){
      gameObjects.forEach(a => a.move(x, y));
    }
  };
}

function createAttackCommand(gameObjects, direction){
  return {
    execute: function(){
      gameObjects.forEach(a => a.attack(direction));
    }
  };
}

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
    if (keys[38]) y += 1;
    if (keys[39]) x += 1;
    if (keys[40]) y += -1;
    if (x || y) commands.push(createMoveCommand(x, y, this.targets));

    if (keys[32]){
      commands.push(createAttackCommand(this.targets, mouse));
    }

    commands.forEach(c => c.execute());
  },

  start: function(){
    controls.start();
  },

  remove: function(gameObject){
    for (let i = 0; i < this.targets.length; i++){
      if (this.targets[i].id === gameObject.id){
        this.targets.splice(i, 1);
        break;
      }
    }
  },

  update: function(){},

  _destroy: function(gameObject){
    this.remove(gameObject);
  }
};

export default manual;
