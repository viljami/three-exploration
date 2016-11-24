
'use strict';

import manualControl from './core/manual.control';
import humanFactory from './human.factory';
import zombieFactory from './zombie.factory';

export default function Game(){}

Game.prototype.start = function(){
  controls.start();

  this.step = this.step.bind(this);
  this.stepInterval = setInterval(this.step, 1000 / 60);

  const human = humanFactory.create(500, 500, 1);
  manualControl.enable(human);

  zombieFactory.create(490, 500, 1);
};

Game.prototype.step = function(){
  this.physics.step();
};

Game.prototype.draw = function(){
  this.graphics.draw();
};
