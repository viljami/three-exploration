
'use strict';

function createHomingMoveCommand (o, target){
  return {
    execute: () => {
      const v = (target.body ? target.body : target).position
      .clone()
      .subtract(o.body.position)
      .normalize();
      o.move(v.x, v.y);
    }
  };
}

const random = {
  targets: [],

  enable: function (pairs){
    this.targets = [].concat(pairs);
  },

  add: function (a, b){
    this.targets.push([a, b]);
  },

  remove: function (gameObject){
    for (let i = 0; i < this.targets.length; i++){
      if (this.targets[i][0].id === gameObject.id){
        this.targets.splice(i, 1);
        break;
      }
    }
  },

  step: function(){
    this.targets.forEach(o => {
      createHomingMoveCommand(o[0], o[1]).execute();
    });
  },

  start: function(){}
};

export default random;
