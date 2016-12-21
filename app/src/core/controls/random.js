
'use strict';

import Vec from '../Vec';
import * as m from '../math';

const abs = m.abs;
const getSign = m.getSign;
const randSign = m.randSign;
const flipCoin = m.flipCoin;

function createRandomMoveCommand (x, y, o){
  return {
    execute: () => {
      const v = o.previousDirection;
      if (abs(v.x) <= 0.9) x *= 0.1;
      if (abs(v.x) <= 0.9) y *= 0.1;
      v.x += x;
      v.y += y;
      if (abs(v.x) > 2) v.x = getSign(v.x) * 2;
      if (abs(v.y) > 2) v.y = getSign(v.y) * 2;
      o.target.move(v.x, v.y);
    }
  };
}

const wrap = gameObject => ({target: gameObject, previousDirection: new Vec()});

const random = {
  targets: [],

  add: function (gameObjects){
    gameObjects = [].concat(gameObjects);
    this.targets = this.targets.concat(gameObjects.map(wrap));
  },

  remove: function (gameObject){
    for (let i = 0; i < this.targets.length; i++){
      if (this.targets[i].target.id === gameObject.id){
        this.targets.splice(i, 1);
        break;
      }
    }
  },

  enable: function (gameObjects){
    this.targets = []
    .concat(gameObjects)
    .map(wrap);
  },

  step: function(){
    this.targets.forEach(o => {
      const x = flipCoin() ? randSign() : 0;
      const y = flipCoin() ? randSign() : 0;
      createRandomMoveCommand(x, y, o).execute();
    });
  },

  start: function(){}
};

export default random;
