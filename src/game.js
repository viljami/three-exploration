
'use strict';

import manualControl from './core/controls/manual';
import humanFactory from './human.factory';
import zombieFactory from './zombie.factory';

import graphics from './core/graphics/';
import physics from './core/physics/';

export default function Game(){}

Game.prototype.start = function(){
  graphics.createLayer();

  const human = humanFactory.create(260, 360, 10);
  manualControl.enable(human);
  zombieFactory.create(200, 300, 50);

  this.step = this.step.bind(this);
  this.stepInterval = setInterval(this.step, 1000 / 10);

  graphics.setCameraTarget(human.graphics);
  graphics.start();
  manualControl.start();
};

Game.prototype.step = function(){
  manualControl.step();
  physics.step();
};
