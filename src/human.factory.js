
'use strict';

import gameObjectFactory from './core/factory';

const color = 'rgba(0,255,0,0.5)';

export default {
  create: function(x, y, r){
    return gameObjectFactory.create(x, y, r, color);
  }
};
