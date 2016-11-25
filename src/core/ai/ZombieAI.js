
'use strict';

import randomControl from '../controls/random';
import homingControl from '../controls/homing';

// const states = {
//   roam: {control: randomControl},
//   attack: {control: homingControl}
// };

export default function ZombieAI(gameObject) {
  this.gameObject = gameObject;
}

const isRoaming = state => state === 'roam';

ZombieAI.prototype.update = function(){
  const sensor = this.gameObject.sensor;

  if (sensor.collisions.length){
    const body = sensor.collisions[0].other;

    if (isRoaming(this.state) || ! this.state){
      this.state = 'attack';
        console.log(this.state);
      randomControl.remove(this.gameObject);
      homingControl.add([this.gameObject, body]);
    }
  } else {
    if (! isRoaming(this.state) || ! this.state){
      this.state = 'roam';
      console.log(this.state);
      homingControl.remove(this.gameObject);
      randomControl.add(this.gameObject);
    }
  }
};
