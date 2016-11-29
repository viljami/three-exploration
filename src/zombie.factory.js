
'use strict';

import ZAI from './core/ai/ZombieAI';
import factory from './core/factory/';

export default {
  create: function(x, y, type){
    const z = factory.create(x, y, 5, type);
    z.sensor.addGroup('zombie');
    z.addComponent(new ZAI(z));
  },

  remove: function (z){
    factory.remove(z);
  }
};
