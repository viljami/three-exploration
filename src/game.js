
'use strict';

import manualControl from './core/controls/manual';
import randomControl from './core/controls/random';
import factory from './core/factory/';

import graphics from './core/graphics/';
import physics from './core/physics/';

export default function Game(){}

Game.prototype.start = function(){
  graphics.createLayer();

  const human = factory.create(260, 360, 10, 'human');
  manualControl.enable(human);
  randomControl.enable(factory.create(200, 300, 50, 'zombie'));

  this.step = this.step.bind(this);
  this.stepInterval = setInterval(this.step, 1000 / 60);

  graphics.setCameraTarget(human.graphics);
  graphics.start();
  manualControl.start();
};

Game.prototype.step = function(){
  manualControl.step();
  randomControl.step();
  physics.step();
};
