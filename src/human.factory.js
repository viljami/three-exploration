
'use strict';

import physics from './physics';

export default {
  create: function(x, y, r){

    const o = {
      body: physics.create(x, y, r),
      health: 100,
      armor: 10,
      weapons: [
        {type:'fists', damage: 10, isPiercing: false, isSpread: false}
      ],
      activeWeaponIndex: 0
    };

    return o;
  }
};
