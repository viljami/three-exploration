
'use strict';

import manualControl from './core/controls/manual';
import homingControl from './core/controls/homing';
import randomControl from './core/controls/random';
import factory from './core/factory/';
import ZombieAI from './core/ai/ZombieAI';

import graphics from './core/graphics/';
import physics from './core/physics/';

export default function Game(){}

let ais = [];

Game.prototype.start = function(){
  graphics.createLayer();

  const human = factory.create(100, 560, 10, 'human');
  manualControl.enable(human);

  for (let i = 0; i < 10; i++){
    for (let j = 0; j < 10; j++){
      const zombie = factory.create(100 + i * 60, 200 + j * 30, 5, 'zombie');
      zombie.sensor.addGroup('zombie');
      ais.push(new ZombieAI(zombie));
    }
  }

  for (let i = 0; i < 10; i++){
    factory.create(100 + i * 50, 500 +i * 60, 10, 'wall', true);
  }

  this.step = this.step.bind(this);
  this.stepInterval = setInterval(this.step, 1000 / 60);

  graphics.addFog(200);
  graphics.setCameraTarget(human.graphics);
  graphics.start();
  manualControl.start();
};

Game.prototype.step = function(){
  ais.forEach(ai => ai.update());
  manualControl.step();
  homingControl.step();
  randomControl.step();
  physics.step();

  for (let i = 0; i < factory.objects.length; i++){
    if (factory.objects[i].isAlive()) factory.objects[i].update();
    else factory.remove(i);
  }
};
