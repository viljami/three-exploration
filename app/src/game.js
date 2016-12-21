
'use strict';

import manualControl from './core/controls/manual';

import core from './core/';
import {rand} from './core/math';
import factory from './core/factory/';
import zFactory from './zombie.factory';

export default function Game(){}

Game.prototype.start = function(){
  return core.preLoadResoureces()
  .then(function(){
    const gameObjects = [
      factory.create(100, 560, 'human')
    ];

    let x = 100;
    let y = 100;
    for (let i = 0; i < 10; i++){
        x += 15 + rand(100);
      for (let j = 0; j < 10; j++){
        y += 15 + rand(100);
        gameObjects.push(zFactory.create(x + rand(20), y, 'zombie'));
      }
      y = 100;
    }

    return Promise.all(gameObjects)
    .then(results => {
      const human = results[0];
      manualControl.enable(human);
      human.addComponent(manualControl);
      core.start(human);
    });

    // should be on map
    // for (let i = 0; i < 10; i++){
    //   factory.create(100 + i * 50, 500 +i * 60, 'wall', true);
    // }
  });
};
