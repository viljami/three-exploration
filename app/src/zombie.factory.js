
'use strict';

import ZAI from './core/ai/ZombieAI';
import factory from './core/factory/';

export default {
  create: function(x, y, type){
    return factory.create(x, y, type)
    .then(z => {
      z.sensor.addGroup('zombie');
      z.addComponent(new ZAI(z));
      return z;
    });
  },

  remove: function (z){
    factory.remove(z);
  }
};
