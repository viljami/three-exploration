
'use strict';


import manualControl from './core/controls/manual';

import core from './core/';
import {rand} from './core/math';
import factory from './core/factory/';
import zFactory from './zombie.factory';

export default function Game(){}

Game.prototype.start = function(){
  const human = factory.create(100, 560, 10, 'human');
  manualControl.enable(human);
  human.addComponent(manualControl);

  let x = 100;
  let y = 100;
  for (let i = 0; i < 10; i++){
      x += 15 + rand(100);
    for (let j = 0; j < 10; j++){
      y += 15 + rand(100);
      zFactory.create(x + rand(20), y, 'zombie');
    }
    y = 100;
  }

  for (let i = 0; i < 10; i++){
    factory.create(100 + i * 50, 500 +i * 60, 10, 'wall', true);
  }

  core.start(human);
};
