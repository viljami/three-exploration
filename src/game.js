
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

  const human = factory.create(100, 360, 10, 'human');
  manualControl.enable(human);

  for (let i = 0; i < 5; i++){
    for (let j = 0; j < 5; j++){
      const zombie = factory.create(100 + i * 30, 200 + j * 30, 5, 'zombie');
      zombie.sensor.addGroup('zombie');
      zombie.body.userData = zombie;
      ais.push(new ZombieAI(zombie));
    }
  }

  this.step = this.step.bind(this);
  this.stepInterval = setInterval(this.step, 1000 / 60);

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
  factory.objects.forEach(o => o.update());
};
