
'use strict';

import gameObjectFactory from './core/factory/';

const color = 'rgba(0,0,0,0.7)';

export default {
  create: function(x, y, r){
    return gameObjectFactory.create(x, y, r, color);
  }
};
