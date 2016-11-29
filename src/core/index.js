
'use strict';

import manualControl from './controls/manual';
import homingControl from './controls/homing';
import randomControl from './controls/random';

import physics from './physics/';
import graphics from './graphics/';

import factory from './factory/';

import Vec from './Vec';


function update(){
  manualControl.step();
  homingControl.step();
  randomControl.step();

  physics.step();

  for (let i = 0; i < factory.objects.length; i++){
    if (factory.objects[i].isAlive()) factory.objects[i].update();
    else factory.remove(i);
  }
}

export default {
  Vec,

  start: function(human){
    graphics.createLayer();
    graphics.addFog(100);
    graphics.setCameraTarget(human.graphics);
    graphics.start();
    manualControl.start();

    this.updateInterval = setInterval(update, 1000 / 60);
  }
};
