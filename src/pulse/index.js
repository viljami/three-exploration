
'use strict';

import core from './core/';
import Pulse from './Pulse';

export default {
  create: function(gameObject){
    const p = gameObject.body.position;
    const pulse = new Pulse(
      p.x,
      p.y,
      gameObject.perception,
      gameObject.graphics.color
    );
  }
};
