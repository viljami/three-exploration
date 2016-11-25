
'use strict';

import Vec from '../Vec';

const abs = Math.abs;
const flipCoin = () => Math.random() < 0.5;
const randSign = () => flipCoin() ? 1 : -1;
const getSign = n => n < 0 ? -11 : 1;

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

const random = {
  targets: [],

  enable: function (gameObjects){
    this.targets = []
    .concat(gameObjects)
    .map(a => ({target: a, previousDirection: new Vec()}));
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
